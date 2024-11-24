const express = require("express");
const { Kafka } = require("kafkajs");

const app = express();
app.use(express.json());

// Kafka configuration
const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["kafka:9092"], // Update with your Kafka broker
});

const producer = kafka.producer();

app.post("/order", async (req, res) => {
  const order = {
    orderId: Math.floor(Math.random() * 1000),
    userId: req.body.userId,
    amount: req.body.amount,
  };

  try {
    await producer.connect();
    await producer.send({
      topic: "order-topic",
      messages: [{ value: JSON.stringify(order) }],
    });
    await producer.disconnect();
    res.status(200).send({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error sending order:", error);
    res.status(500).send({ error: "Failed to place order" });
  }
});

app.listen(3001, () => {
  console.log("Order Service is running on port 3001");
});
