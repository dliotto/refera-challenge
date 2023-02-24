import { useState, useEffect } from "react";
import axios from "axios";
import { OrderType, CategoryType } from "../types";

const baseURL = "http://localhost:3003/v1/admin";

const ShowForm = (props: {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  order: OrderType;
}) => {
  const [categories, setCategories] = useState(Array<CategoryType>);

  useEffect(() => {
    handleRenderAllCategories();
  }, []);

  const handleRenderAllCategories = () => {
    axios.get(`${baseURL}/categories`).then((response) => {
      if (response.data) {
        setCategories(response.data);
      }
    });
  };

  return (
    <fieldset style={{ padding: "40px" }}>
      <legend style={{ marginBottom: "40px" }}>New Order</legend>
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-4" style={{ textAlign: "initial" }}>
          <label className="form-label">Contact Name</label>
          <input
            key="name"
            type="input"
            className="form-control"
            placeholder="Name"
            id="name"
            onChange={props.handleChange}
            value={props.order.name}
          />
        </div>
        <div className="col-4" style={{ textAlign: "initial" }}>
          <label className="form-label">Contact Phone</label>
          <input
            key="cellphone"
            type="input"
            className="form-control"
            placeholder="(99) 9999-9999"
            id="cellphone"
            onChange={props.handleChange}
            value={props.order.cellphone}
          />
        </div>
        <div className="col-4" style={{ textAlign: "initial" }}>
          <label className="form-label">Real State Agency</label>
          <input
            key="agency"
            id="agency"
            type="input"
            className="form-control"
            placeholder=""
            onChange={props.handleChange}
            value={props.order.agency}
          />
        </div>
      </div>
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-8" style={{ textAlign: "initial" }}>
          <label className="form-label">Description</label>
          <textarea
            key="description"
            id="description"
            className="form-control"
            rows={3}
            onChange={props.handleChange}
            value={props.order.description}
          ></textarea>
        </div>
        <div className="col-4" style={{ textAlign: "initial" }}>
          <label className="form-label">Company</label>
          <input
            key="company"
            id="company"
            type="input"
            className="form-control"
            placeholder=""
            onChange={props.handleChange}
            value={props.order.company}
          />
        </div>
      </div>

      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-8" style={{ textAlign: "initial" }}>
          <label className="form-label">Select order Category</label>
          <select
            key="id_category"
            id="id_category"
            className="form-select"
            aria-label="Default select example"
            onChange={props.handleChange}
            value={props.order.id_category}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-4" style={{ textAlign: "initial" }}>
          <label className="form-label">Deadline</label>
          <input
            key="dt_deadline"
            id="dt_deadline"
            type="date"
            className="form-control"
            placeholder=""
            onChange={props.handleChange}
            value={props.order.dt_deadline}
          />
        </div>
      </div>
    </fieldset>
  );
};

export default ShowForm;
