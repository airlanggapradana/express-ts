import express from "express";
import cors from "cors";
import users from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());

app.use("/users", users);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
