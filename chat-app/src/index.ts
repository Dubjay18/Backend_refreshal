import express, { Application } from "express";

const app: Application = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, (): void => {
  console.log("Server is up on port " + PORT);
});
