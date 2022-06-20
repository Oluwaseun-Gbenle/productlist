import axios from "axios";
import "./Product.css";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Formik, Field } from "formik";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState("");
  const [toUpdate, setToUpdate] = useState({});
  const [add, setAdd] = useState(false);

  useEffect(() => {
    axios
      .get("https://product-database-project.glitch.me/api/reorder")
      .then((res) => {
        setProducts(res.data);
        console.log(products);
      })
      .catch((err) => err);
    axios
      .post(
        "https://product-database-project.glitch.me/api/reorder/update",
        toUpdate
      )
      .then((res) => {
        console.log("update", toUpdate);
      })
      .catch((err) => err);
  }, []);

  return (
    <>
      <Row className="main-container">
        <Col className="container1">
          <div className="topbar">
            <img
              id="topimg"
              src="https://image.freepik.com/free-vector/purple-logo-with-arrows-shape_1043-46.jpg"
              alt="logo"
            />
          </div>
          <ul>
            <li>
              <a href="#home">Dashboard</a>
            </li>
            <li>
              <a href="#news">Analytics</a>
            </li>
            <li>
              <a className="active" href="#contact">
                Products
              </a>
            </li>
            <li>
              <a href="#about">Logout</a>
            </li>
          </ul>
        </Col>
        <Col className="container2">
          <div className="d-flex justify-content-between subhead">
            <div>All Products</div>
            <button
              onClick={() => {
                setAdd(!add);
                window.scrollTo(0, 20000);
              }}
              className="btn2"
            >
              Add New Product
            </button>
          </div>
          <Formik
            initialValues={{
              id: "",
              image: "",
              name: "",
              category: "",
              barcode: "",
              unit_cost_price: "",
              unit_selling_price: "",
              expiry_date: "",
              created_at: "",
            }}
            validationSchema=""
            enableReinitialize={true}
            onSubmit={(values) => {
              // values._id =
              setToUpdate(values);
            }}
          >
            {({ handleSubmit, values, touched, errors, setFieldValue }) => (
              <Table hover responsive className="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Barcode</th>
                    <th>Actions</th>
                    <th>Price</th>
                    <th>Expiry date</th>
                    <th>Created</th>
                  </tr>
                </thead>

                {products?.map((product, idx) => (
                  <tbody>
                    <tr key={idx}>
                      <td className="adj2">
                        {idx + 1}
                        <Field type="hidden" name="id" value={product._id} />
                      </td>
                      <td className="adj">
                        <img
                          className="imgfit"
                          src={product.image}
                          alt="product"
                        />
                        {!edit ? (
                          <div>{product.name}</div>
                        ) : index == idx ? (
                          <div>
                            Image
                            <input
                              type="text"
                              name="image"
                              defaultValue={product.image}
                              onChange={(e) => {
                                setFieldValue("image", e.target.value);
                              }}
                            />
                            Name
                            <input
                              type="text"
                              name="name"
                              defaultValue={product.name}
                              onChange={(e) => {
                                setFieldValue("name", e.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          <div>{product.name}</div>
                        )}
                      </td>
                      <td className="adj">FOOD AND BEVERAGE</td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.barcode}</div>
                        ) : index == idx ? (
                          <input
                            type="text"
                            name="barcode"
                            defaultValue={product.barcode}
                            onChange={(e) => {
                              setFieldValue("barcode", e.target.value);
                            }}
                          />
                        ) : (
                          <div>{product.barcode}</div>
                        )}
                      </td>

                      <td className="adj">
                        <button
                          onClick={() => {
                            setEdit(!edit);
                            setIndex(idx);
                          }}
                          className="btn1"
                        >
                          Edit
                        </button>
                        <button onClick={() => {}} className="btn1">
                          Delete
                        </button>
                      </td>

                      <td className="adj">
                        {!edit ? (
                          <div>
                            <p className="h6">Cost</p> {product.unit_cost_price}
                            <p className="h6 price">Selling</p>
                            {product.unit_selling_price}
                          </div>
                        ) : index == idx ? (
                          <div>
                            <p className="h6">Cost</p>
                            <input
                              type="text"
                              name="unit_cost_price"
                              defaultValue={product.unit_cost_price}
                              onChange={(e) => {
                                setFieldValue(
                                  "unit_cost_price",
                                  e.target.value
                                );
                              }}
                            />
                            <p className="h6 price">Selling</p>
                            <input
                              type="text"
                              name="unit_selling_price"
                              defaultValue={product.unit_selling_price}
                              onChange={(e) => {
                                setFieldValue(
                                  "unit_selling_price",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="h6">Cost</p> {product.unit_cost_price}
                            <p className="h6 price">Selling</p>
                            {product.unit_selling_price}
                          </div>
                        )}
                      </td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.expiry_date}</div>
                        ) : index == idx ? (
                          <input
                            type="text"
                            name="expiry_date"
                            defaultValue={product.expiry_date}
                            onChange={(e) => {
                              setFieldValue("expiry_date", e.target.value);
                            }}
                          />
                        ) : (
                          <div>{product.expiry_date}</div>
                        )}
                      </td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.created_at}</div>
                        ) : index == idx ? (
                          <input
                            type="text"
                            name="created_at"
                            defaultValue={product.created_at}
                            onChange={(e) => {
                              setFieldValue("created_at", e.target.value);
                            }}
                          />
                        ) : (
                          <div>{product.created_at}</div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
                {add && (
                  <tbody>
                    <tr>
                      <td>*</td>
                      <td>
                        <Field type="text" name="name" />
                      </td>
                      <td className="adj">FOOD AND BEVERAGE</td>
                      <td>
                        <Field type="text" name="barcode" />
                      </td>
                      <td>
                        <button onClick={() => {}} className="btn2">
                          Save
                        </button>
                      </td>
                      <td>
                        <p className="h6">Cost</p>
                        <Field type="text" name="unit_cost_price" />
                        <p className="h6 price">Selling</p>
                        <Field type="text" name="unit_selling_price" />
                      </td>
                      <td>
                        <Field type="text" name="expiry_date" />
                      </td>
                      <td>
                        <input type="text" name="created_at" />
                      </td>
                    </tr>
                  </tbody>
                )}
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="btn3"
                >
                  Save
                </button>
              </Table>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default Product;
