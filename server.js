"use strict"
import express, { json, urlencoded } from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const router = await import("./src/routes/index.js");
import connectDB from "./db/dbconnect.js";
const dotenv = await import("dotenv");
dotenv.config();

const port = process.env.PORT || 5001;
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "public")));
app.use("/api", router.default);

app.listen(port, () => {
  console.log("→ Port : Server is running on port", port);
});