import express from "express"
import cors from "cors"
import Adminrouter from "./routes/adminroute";
import userRouter from "./routes/user";
const app = express();

app.use(express.json())
app.use("/api/user", userRouter);
app.use("/api/admin", Adminrouter)

app.listen(3000);