import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});


fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB(),
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();