import Connection from "../../../main/configs/db/db";
import { Order } from "../types/order.interface";

const sqlHelper = new Connection();
const table = "refera.order";

class Module {
  findAll = async (): Promise<Array<Order>> => {
    const sql = `SELECT ${table}.*
                      , category.name as category
                   FROM ${table}
                   INNER JOIN refera.category on refera.category.id = refera.order.id_category
                   WHERE refera.order.dt_deleted IS NULL ORDER BY refera.order.id`;
    const binds = [];
    const order = await sqlHelper.execute(sql, binds);
    return order.results;
  };

  find = async (id: string): Promise<Order> => {
    const sql = `SELECT * 
                   FROM ${table}
                  WHERE id = $1`;
    const binds = [id];
    const order = await sqlHelper.execute(sql, binds);
    return order.results[0];
  };

  create = async (newItem: Order): Promise<Order> => {
    const sql = `INSERT INTO ${table}
                        ( name
                        , cellphone
                        , agency
                        , company
                        , description
                        , id_category
                        , dt_deadline
                        , user_created
                        , dt_created
                        )
                        VALUES 
                        ( $1
                        , $2
                        , $3
                        , $4
                        , $5
                        , $6
                        , $7
                        , $8
                        , NOW()
                        )
                        RETURNING id`;
    const binds = [
      newItem.name,
      newItem.cellphone,
      newItem.agency,
      newItem.company,
      newItem.description,
      newItem.id_category,
      newItem.dt_deadline,
      newItem.user_created,
    ];

    const order = await sqlHelper.execute(sql, binds);
    return order.results[0];
  };

  update = async (itemUpdate: Order): Promise<Order | null> => {
    const sql = `UPDATE ${table} SET
                        name = $2,
                        cellphone = $3,
                        agency = $4,
                        company = $5,
                        description = $6,
                        id_category = $7,
                        dt_deadline = $8,
                        user_updated = $9,
                        dt_updated = NOW()
                        WHERE id = $1
                        RETURNING id`;
    const binds = [
      itemUpdate.id,
      itemUpdate.name,
      itemUpdate.cellphone,
      itemUpdate.agency,
      itemUpdate.company,
      itemUpdate.description,
      itemUpdate.id_category,
      itemUpdate.dt_deadline,
      itemUpdate.user_updated,
    ];

    const order = await sqlHelper.execute(sql, binds);
    return order.results[0];
  };

  delete = async (itemDelete: Order): Promise<Order | null> => {
    const sql = `UPDATE ${table} SET
                          dt_deleted = NOW()
                        , user_deleted = $2
                        WHERE id = $1
                        RETURNING id`;
    const binds = [itemDelete.id, itemDelete.user_deleted];

    const order = await sqlHelper.execute(sql, binds);
    return order.results[0];
  };

  undelete = async (itemDelete: Order): Promise<Order | null> => {
    const sql = `UPDATE ${table} SET
                          dt_deleted = NULL
                        , user_deleted = NULL
                        , dt_updated = NOW()
                        , user_updated = $2
                        WHERE id = $1
                        RETURNING id`;
    const binds = [itemDelete.id, itemDelete.user_updated];

    const order = await sqlHelper.execute(sql, binds);
    return order.results[0];
  };
}

export default Module;
