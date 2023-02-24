import { FiEye, FiTrash } from "react-icons/fi";

interface Header {
  value: string;
  id: number;
  key: string;
}

interface TableProps {
  loading: Boolean;
  header: Array<Header>;
  body: Array<any>;
  remove?: (event: any) => void;
  show?: (event: any) => void;
  sortable?: (event: any) => void;
}

const Table = (props: TableProps) => {
  return props.loading ? (
    <div>Loading...</div>
  ) : (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {props.header.map((item) => (
            <th
              scope="col"
              key={item.id}
              onClick={() => props.sortable?.(item.key)}
              style={{ cursor: "pointer" }}
            >
              {item.value}
            </th>
          ))}
          {(props.remove || props.show) && <th scope="col">Options</th>}
        </tr>
      </thead>
      <tbody>
        {props.body.map((item) => (
          <tr key={item.id}>
            {props.header.map((t) => (
              <td scope="row" key={item?.[t.key]}>
                {item?.[t.key]}
              </td>
            ))}

            {(props.remove || props.show) && (
              <td>
                {props.remove && (
                  <button
                    onClick={() => props.remove?.(item)}
                    key={"remove-btn"}
                    className="btn"
                  >
                    <FiTrash />
                  </button>
                )}{" "}
                {props.show && (
                  <button
                    onClick={() => props.show?.(item)}
                    key={"show-btn"}
                    className="btn"
                  >
                    <FiEye />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
