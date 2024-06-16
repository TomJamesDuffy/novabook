#!/bin/bash

curl -X PATCH http://localhost:3001/sale \
     -H "Content-Type: application/json" \
     -d '{
           "date": "2024-02-22T17:29:39Z",
           "invoiceId": "3419027d-960f-4e8f-b8b7-f7b2b4791824",
           "itemId": "02db47b6-fe68-4005-a827-24c6e962f3df",
           "cost": 798,
           "taxRate": 0.15
         }'
