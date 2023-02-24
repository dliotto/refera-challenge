import Connection from "../../../main/configs/db/db";
import { Category } from "../types/category.interface";

const sqlHelper = new Connection();
const table = "refera.category";

class Module {
  findAll = async (): Promise<Array<Category>> => {
    const sql = `SELECT *
                   FROM ${table}
                   WHERE dt_deleted IS NULL`;
    const binds = [];
    const categories = await sqlHelper.execute(sql, binds);
    return categories.results;
  };

  find = async (id: string): Promise<Category> => {
    const sql = `SELECT * 
                      , (CASE WHEN dt_deleted IS NULL
                        THEN 'Ativo'
                        ELSE 'Inativo'
                        END ) status
                   FROM ${table}
                  WHERE id = $1`;
    const binds = [id];
    const category = await sqlHelper.execute(sql, binds);
    return category.results[0];
  };

  create = async (newItem: Category): Promise<Category> => {
    const sql = `INSERT INTO ${table}
                        ( name
                        , user_created
                        , dt_created
                        )
                        VALUES 
                        ( $1
                        , $2
                        , NOW()
                        )
                        RETURNING id`;
    const binds = [newItem.name, newItem.user_created];

    const category = await sqlHelper.execute(sql, binds);
    return category.results[0];
  };

  update = async (itemUpdate: Category): Promise<Category | null> => {
    const sql = `UPDATE ${table} SET
                        name = $2,
                        user_updated = $3,
                        dt_updated = NOW()
                        WHERE id = $1
                        RETURNING id`;
    const binds = [itemUpdate.id, itemUpdate.name, itemUpdate.user_updated];

    const category = await sqlHelper.execute(sql, binds);
    return category.results[0];
  };

  delete = async (itemDelete: Category): Promise<Category | null> => {
    const sql = `UPDATE ${table} SET
                          dt_deleted = NOW()
                        , user_deleted = $2
                        WHERE id = $1
                        RETURNING id`;
    const binds = [itemDelete.id, itemDelete.user_deleted];

    const category = await sqlHelper.execute(sql, binds);
    return category.results[0];
  };

  undelete = async (itemDelete: Category): Promise<Category | null> => {
    const sql = `UPDATE ${table} SET
                          dt_deleted = NULL
                        , user_deleted = NULL
                        , dt_updated = NOW()
                        , user_updated = $2
                        WHERE id = $1
                        RETURNING id`;
    const binds = [itemDelete.id, itemDelete.user_updated];

    const category = await sqlHelper.execute(sql, binds);
    return category.results[0];
  };
}

export default Module;
