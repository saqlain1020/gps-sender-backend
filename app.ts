import express from "express";
import rateLimit from "express-rate-limit"; //for brute force attack
import mongoSanitize from "express-mongo-sanitize"; //for noSql query injections
import helmet from "helmet"; //Protects from various attacks eg xss etc
import cors from "cors";
import morgan from "morgan";
import busRouter from "./routes/busRouter";
import locationRouter from "./routes/locationRouter";
import deviceRouter from "./routes/devicesRouter";

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "you've exceed the number of requests",
});

const app = express();

//implementing cors
app.use(cors({ origin: true, credentials: true }));
//serving static content
// app.use(express.static("public"));
// app.use("/uploads", express.static("uploads"));

//middlewares
app.use(limiter);

app.use(express.json());

app.use(mongoSanitize());
app.use(helmet());
app.use(morgan("dev"));

//routers
app.use("/api/v1/bus", busRouter);
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/device", deviceRouter);


app.use("/ping", (req, res) => {
  res.status(200).json({ status: true });
});

app.use("/", (req,res)=>{
  res.status(200).send("Welcome.");
});


// app.use((req, res, next) => {
//   res.sendFile(__dirname + "/public/" + "index.html");
// });

// module.exports = app;

export default app;
