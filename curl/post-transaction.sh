#!/bin/bash

curl -X POST http://localhost:3001/transactions \
     -H "Content-Type: application/json" \
     -d '{
           "eventType": "SALES",
           "date": "2024-02-22T17:29:39Z",
           "invoiceId": "3419027d-960f-4e8f-b8b7-f7b2b4791824",
           "items": [
             {
               "itemId": "02db47b6-fe68-4005-a827-24c6e962f3df",
               "cost": 1099,
               "taxRate": 0.2
             }
           ]
         }'