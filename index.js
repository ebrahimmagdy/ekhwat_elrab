// index.js file
import { config } from "dotenv";
import express from "express";


import { connection_db } from "./DB/connection.js";

const app = express();
config();
const port = process.env.PORT;
connection_db()
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome Job App"));




app.listen(port, () => console.log(`Example app listening on port ${port}!`));

