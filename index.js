import express from "express";
import { start } from "./src/app.js";

const app = express();

start(app, express);
