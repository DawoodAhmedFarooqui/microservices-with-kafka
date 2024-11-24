Steps to Run

Install Dependencies:
In both order-service and payment-service directories, run:

npm install kafkajs express

Start Services: Run the following command in the root directory containing docker-compose.yml:

docker-compose up --build

curl to send a POST request to the Order Service:

curl -X POST http://localhost:3001/order -H "Content-Type: application/json" -d '{"userId": "123", "amount": 500}'

Observe the Payment Service logs, where it processes the received order.
