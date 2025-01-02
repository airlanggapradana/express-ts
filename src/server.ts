import express from "express";
import cors from "cors";
import products from "./routes/products";
import users from "./routes/users";
import login from "./routes/login";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", products);
app.use("/users", users);
app.use("/login", login);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
