import { Pool, QueryResult } from "pg";
import * as dotenv from "dotenv";
import { ReturnDB } from "./db.interface";

dotenv.config();

const credentials = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DATABASE_DB,
  password: process.env.PASSWORD_DB,
  port: 5432,
};

class Connection {
  public pool: Pool;

  constructor() {
    this.pool = new Pool(credentials);
  }

  createPool = async (callback: any) => {
    this.reConnect(callback);
  };

  execute = async (
    sql: string,
    binds: Array<String | Number | Date | null>
  ) => {
    const query = await this.pool.query(sql, binds);

    if (query) {
      return this.successMessage(query, sql, binds);
    } else {
      return this.errorMessage(query, sql, binds);
    }
  };

  errorMessage = (
    value: QueryResult<any>,
    sql: string,
    binds: Array<String | Number | Date | null>
  ) => {
    let msg: ReturnDB = {
      type: "error",
      code: 404,
      title: "Error!",
      sql: sql,
      binds: binds,
      command: value.command,
      length: value.rowCount,
      results: value.rows,
    };

    return msg;
  };

  successMessage = (
    value: QueryResult<any>,
    sql: string,
    binds: Array<String | Number | Date | null>
  ) => {
    let msg: ReturnDB = {
      type: "success",
      code: 200,
      title: "Success!",
      sql: sql,
      binds: binds,
      command: value.command,
      length: value.rowCount,
      results: value.rows,
    };
    return msg;
  };

  reConnect = (callback: any) => {
    try {
      this.pool.connect(function (err, client, done) {
        if (err) {
          setTimeout(() => {
            console.error("RECONNECTING DATABASE FOR", err);
            this.reConnect(callback);
          }, 15000);
        } else {
          callback(client);
          done();
        }
      });
    } catch (err) {
      setTimeout(() => {
        console.error("RECONNECTING DATABASE FOR", err);
        this.reConnect(callback);
      }, 15000);
    }
  };
}

export default Connection;
