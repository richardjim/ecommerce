import express, { Express, json, Request, Response } from "express";
import { PORT } from "../secret";
import rootRouter from "./routers";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
app.use(express.json());

app.use("/api/v1", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(PORT, () => {
  console.log("Working");
});
