# Novabook - Implement a tax service

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Set Up

Here is a video giving a quick introduction to the repository and setting up the working service: [Loom](https://www.loom.com/share/88d3e365b17442feb67ba2350cf115c9)

The fastest way to setup the project is to:

Run `npm run setup`.

The setup command:

1. Builds the docker containers for the test and development environments as well as sets up prometheus.
2. Installs dependencies.
3. Runs migrations that set up the [database structure](./docs/database-structure.png).
4. Runs seeds to populate the database with mock data.
5. Begins the server.

### Folder Structure

**`curl`**

- Curl requests to easily test the endpoints, these are included as scripts in the package.json.

**`docs`**

- Database structure diagram and swagger.

**`src/api`**

- Functionally cohesive folder structure for the endpoints (sale-amendment, tax position and transactions).

### Observability

Observabiliity is implemented in two different ways. Through a logger (winston) and gathering metrics (prometheus).

Logging is performed through the middleware on each request and through the ORM whenever there are changes to the database. Logs are sent to a txt file within the /logs folder and also output to the console. Logs are only created in the development environment and not when tests are run.

Metrics are gathered every 15 seconds through the /metrics endpoint. Viewing these metrics can be done on port 9090 with prometheus.

### Scale

For this technical test some consideration for scale has been implemented. Within the tax calculation a map has been created on invoiceId + itemId which significantly reduces the time it takes for the calculation to take place.

With large datasets, this approach could be improved by storing a key made of the indexed invoiceId + itemId and the quantity of each item. The quantity and any relevant sale amendment could then be calculated off this aggregation.

The tradeoff here would be doing more on transaction creation (incrementing invoiceId + itemId combinations).

### Tests

All endpoints have integration tests. Integration tests are run on a separate database as defined in the docker image.

Unit tests have also been created where appropriate.

Given more time I would increase the code coverage.

```bash
npm run test
```

### Other thoughts

Given my implementation the /sales endpoint should probably be a post request as it creates a sales amendment. I decided it was better to keep the api consistent with the brief.

I considered building the service in a more 'event driven' way where you utilise an event store to persist data. However, I decided not to do this as financial data is particularly suited to a tabular data format and I didn't like the idea of interrogating nested payloads for SALES events. Furthermore as we have three different endpoints, where within an event driven architecture we could get away with one it didn't seem appropriate.
