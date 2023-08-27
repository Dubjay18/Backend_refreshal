import express, { type Application } from "express";
import path from "path";

export const app: Application = express();
// app.use(express.json());
const publicDirectoryPath: string = path.join(
  __dirname,
  "../public"
);
app.use(express.static(publicDirectoryPath));
