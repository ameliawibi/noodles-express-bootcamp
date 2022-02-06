import express from "express";
import { router } from "./routes/index.js";

let app = express();

// Set the view engine to ejs
app.set("view engine", "ejs");

app.use("/", router);

// serve static files
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3004);
