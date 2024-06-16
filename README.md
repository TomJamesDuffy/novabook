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
Observability is implemented through logging (Winston) and metrics collection (Prometheus).

Logging: Logs are generated for each request and database change. Logs are saved to a text file in the /logs folder and output to the console. Logging occurs only in the development environment.

Metrics: Metrics are collected every 15 seconds via the /metrics endpoint. You can view these metrics on port 9090 with Prometheus.

### Scale

Some scalability considerations are implemented. For tax calculation, a map based on invoiceId + itemId is used to reduce calculation time.

With large datasets, storing a key made of invoiceId + itemId and the item quantity can improve performance. This approach trades off more processing during transaction creation for faster calculations.

### Tests

To run the tests `npm run test`.

Integration tests cover all endpoints and run on a separate database defined in the Docker image. I've also included an example of a unit test.

Given more time I would increase the code coverage, write more unit tests and cover more non-optimal inputs and paths.

### Other thoughts

The /sales endpoint should be a POST request as it creates a sales amendment, but it was kept consistent with the brief.

An event-driven architecture was considered but not implemented. Financial data suits a tabular format, and querying nested payloads for sales events is less efficient. With three different endpoints, an event-driven approach didn't seem appropriate.
