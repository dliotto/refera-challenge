import { OrderType } from "../types";

const ShowDetails = (props: { info: OrderType }) => {
  return (
    <fieldset>
      <legend style={{ marginBottom: "40px" }}>Order Details</legend>
      <div className="container text-center" style={{ margin: "30px" }}>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-4" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Contact Name
            </label>
            <div>{props.info.name}</div>
          </div>
          <div className="col-4" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Contact Phone
            </label>
            <div>{props.info.cellphone}</div>
          </div>
          <div className="col-4" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Real State Agency
            </label>
            <div>{props.info.agency}</div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-8" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Order Description
            </label>
            <div>{props.info.description}</div>
          </div>
          <div className="col-4" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Company
            </label>
            <div>{props.info.company}</div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-8" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Category
            </label>
            <div>{props.info.category}</div>
          </div>
          <div className="col-4" style={{ textAlign: "initial" }}>
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Deadline
            </label>
            <div>{props.info.dt_deadline}</div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default ShowDetails;
