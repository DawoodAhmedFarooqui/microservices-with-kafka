const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:9092"], // Update with your Kafka broker
});

const consumer = kafka.consumer({ groupId: "payment-group" });

const processPayment = async (message) => {
  const order = JSON.parse(message.value.toString());
  console.log(
    `Processing payment for Order ID: ${order.orderId}, Amount: ${order.amount}`
  );
  // Simulate payment logic here
};

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message from ${topic}:`, message.value.toString());
      await processPayment(message);
    },
  });
};

startConsumer().catch((err) => console.error("Error starting consumer:", err));
