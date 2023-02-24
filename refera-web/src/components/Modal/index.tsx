import { PropsWithChildren } from "react";
import "./modal.css";

interface SortProps {
  loading?: boolean;
  handleClose?: () => void;
  handleSave?: () => void;
  show?: boolean;
}

const Modal = (props: PropsWithChildren<SortProps>) => {
  const showHideClassName = props.show
    ? "modal-show display-block"
    : "modal-show display-none";

  return props.loading ? (
    <div>Loading...</div>
  ) : (
    <div className={showHideClassName}>
      <section className="modal-show-main">
        {props.children}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
            marginLeft: "40px",
          }}
        >
          {props.handleClose && (
            <button type="button" onClick={props.handleClose}>
              Close
            </button>
          )}

          {props.handleSave && (
            <button
              type="button"
              style={{ backgroundColor: "green", marginLeft: "10px" }}
              onClick={props.handleSave}
            >
              Save
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Modal;
