import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sessions from "express-session";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const oneDay = 100; //1000 * 60 * 60 * 24;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(
  sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

export default app;
