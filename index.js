// index.js file
import { config } from "dotenv";
import express from "express";


import { connection_db } from "./DB/connection.js";
import { globaleResponse } from "./src/Middlewares/error-handling.middleware.js";
import familyRouter from "./src/Modules/Family/family.routes.js";

const app = express();
config();
const port = process.env.PORT;
connection_db()
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome Job App"));
app.use("/family", familyRouter);

app.use(globaleResponse)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

