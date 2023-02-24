import app from "./main/app";
import { loginRoutes, orderRoutes, categoryRoutes } from "./api";
import Connection from "./main/configs/db/db";
import http from "http";

const sqlHelper = new Connection();

const route_path_admin = "/v1/admin";

sqlHelper.createPool((myPool: any) => {
  if (typeof myPool != typeof undefined) {
    console.log("==>  connected to database successfully!");

    // INITIALIZE SERVER IN THE CONFIG PORT
    let server = http.createServer(app);
    server.listen(process.env.PORT);
  }
});

app.use(route_path_admin, loginRoutes);
app.use(route_path_admin, orderRoutes);
app.use(route_path_admin, categoryRoutes);
