require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const googleAuth = require("./routes/googleAuth");
const productRouter = require("./routes/product");
const filmRouter = require("./routes/film");
const orderRoute = require("./routes/order");
const categoryRoute = require("./routes/category");
const addressRoute = require("./routes/address");
const reviewRouter = require("./routes/review");

// NB : Place AdminJS Before any other middleware
// adminJS packages
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");
import { adminOptions } from "./common/admin";
// ISSUE: Importing Router from routes/admin.ts does not work
// probably because of the register mongoose adapter that should be
// done from here
// TODO: Uninstall AdminBro
AdminJS.registerAdapter(AdminJSMongoose); // register mongoose adapter
const adminJs = new AdminJS(adminOptions);
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);
// End of AdminJS

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());

// Cors Settings
var allowedOrigins = [
  "http://localhost:3000",
  "https://leo-films.herokuapp.com",
];
app.use(
  cors({
    credentials: true,
    origin: function (origin: string, callback: Function) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
//End Cors
app.use(xss());

app.get("/", (req: any, res: any) => {
  res.send("<h1>Leo Film API</h1>");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/googleAuth", googleAuth);
app.use("/api/product", productRouter);
app.use("/api/film", filmRouter);
app.use("/api/order", orderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/address", addressRoute);
app.use("/api/review", reviewRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
