import "dotenv/config";
import app from "./app.js";
import DBconnect from "./config/connection.js";

const port = process.env.PORT || 3002;

DBconnect().then(() => {
  app.listen(port, () => console.log("Server started at port:", port));
});
