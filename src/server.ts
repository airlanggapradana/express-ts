import express from "express";
import cors from "cors";
import products from "./routes/products";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());

app.use("/products", products);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
