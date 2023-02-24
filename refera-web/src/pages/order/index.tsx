import { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Form from "./Form";
import Details from "./Details";
import { OrderType } from "./types";

const baseURL = "http://localhost:3003/v1/admin";

const header = [
  { value: "Id", key: "id", id: 0 },
  { value: "Category", key: "category", id: 1 },
  { value: "Contact", key: "cellphone", id: 2 },
  { value: "Agency", key: "agency", id: 3 },
  { value: "Company", key: "company", id: 4 },
];

const Order = () => {
  const [orders, setOrders] = useState(Array<OrderType>);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState("ascending");
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [itenShow, setItenShow] = useState(Object);

  const [objForm, setObjForm] = useState<OrderType>({
    name: "",
    category: "",
    cellphone: "",
    agency: "",
    company: "",
    description: "",
    id_category: 0,
    dt_deadline: "",
  });

  useEffect(() => {
    handleRenderAll();
  }, []);

  const handleRenderAll = () => {
    axios.get(`${baseURL}/orders`).then((response) => {
      if (response.data) {
        setLoading(false);
        setOrders(response.data);
      }
    });
  };

  const handleRemove = (item: OrderType) => {
    setLoading(true);
    axios.delete(`${baseURL}/order/${item.id}`).then((response) => {
      if (response.data) {
        handleRenderAll();
      }
    });
  };

  const handleShow = (item: OrderType) => {
    setShowInfo(true);
    setItenShow(item);
  };

  const handleSortable = (sortedField: any) => {
    let sortedProducts = [...orders];
    if (sortedField !== null) {
      sortedProducts.sort((a: any, b: any) => {
        if (a[sortedField] < b[sortedField]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setDirection(direction === "ascending" ? "descending" : "ascending");
    setOrders(sortedProducts);
  };

  const handleClose = () => {
    setShow(!show);
  };

  const handleCloseInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setObjForm({ ...objForm, [event.target.id]: event.target.value });
  };

  const handleFormSave = () => {
    axios
      .post(`${baseURL}/order`, objForm)
      .then((response) => {
        if (response.data) {
          alert("Sucess!!!! Order create!");
          handleRenderAll();
          setObjForm({
            name: "",
            category: "",
            cellphone: "",
            agency: "",
            company: "",
            description: "",
            id_category: 0,
            dt_deadline: "",
          });
          setShow(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <>
      <Modal
        key="new_modal"
        show={show}
        handleClose={handleClose}
        handleSave={handleFormSave}
      >
        <Form key="new" handleChange={handleForm} order={objForm} />
      </Modal>

      <Modal key="details_modal" show={showInfo} handleClose={handleCloseInfo}>
        <Details key="details" info={itenShow} />
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "5px",
        }}
      >
        <button type="button" onClick={() => setShow(true)}>
          Open New Order
        </button>
      </div>
      <Table
        loading={loading}
        header={header}
        body={orders}
        remove={handleRemove}
        show={handleShow}
        sortable={handleSortable}
      />
    </>
  );
};

export default Order;
