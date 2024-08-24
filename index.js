// index.js file
import { config } from "dotenv";
import express from "express";


import { connection_db } from "./DB/connection.js";
import { globaleResponse } from "./src/Middlewares/error-handling.middleware.js";
import familyRouter from "./src/Modules/Family/family.routes.js";
import userRouter from "./src/Modules/User/user.routes.js";
import Admin_VolunteersRouter from "./src/Modules/Admin-Volunteers/admin-volunteers.routes.js";
import resourceRouter from "./src/Modules/Resource/resource.routes.js";
const app = express();
config();
const port = process.env.PORT;
connection_db()
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome Job App"));
app.use("/family", familyRouter);
app.use("/user", userRouter);
app.use("/admin-volunteers", Admin_VolunteersRouter);
app.use("/resource", resourceRouter);
app.use(globaleResponse)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

