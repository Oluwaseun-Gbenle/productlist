import axios from "axios";
import "./Product.css";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Formik, Field } from "formik";
import { fetchData, updateProduct, createProduct, deleteProduct } from "./async-function";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState("");
  const [getId, setId] = useState("");
  const [add, setAdd] = useState(false);
  const defaultProduct = products.find((product) => product._id === getId);

  useEffect(() => {
    fetchData({ axios, setProducts });
  }, [products]);

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
                setEdit(false)
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
              id: defaultProduct?._id,
              image: defaultProduct?.image,
              name: defaultProduct?.name,
              category: defaultProduct?.category,
              barcode: defaultProduct?.barcode,
              unit_cost_price: defaultProduct?.unit_cost_price,
              unit_selling_price: defaultProduct?.unit_selling_price,
              expiry_date: defaultProduct?.expiry_date,
              created_at: defaultProduct?.created_at,
            }}
            validationSchema=""
            enableReinitialize={true}
            onSubmit={(values) => {
              setEdit(false);
              setAdd(false)
              if (add) {
                createProduct({ axios, values });
              } else {
                updateProduct({ axios, values });
              }
            }}
          >
            {({ handleSubmit, values, setFieldValue }) => (
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
                      <td className="adj2">{idx + 1}</td>
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
                            <Field type="text" name="image" />
                            Name
                            <Field type="text" name="name" className="text-uppercase" />
                          </div>
                        ) : (
                          <div>{product.name}</div>
                        )}
                      </td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.category}</div>
                        ) : index == idx ? (
                          <Field type="text" name="category" />
                        ) : (
                          <div>{product.category}</div>
                        )}
                      </td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.barcode}</div>
                        ) : index == idx ? (
                          <Field type="number" name="barcode" />
                        ) : (
                          <div>{product.barcode}</div>
                        )}
                      </td>

                      <td className="adj">
                        {!edit ? (
                          <button
                            onClick={() => {
                              setAdd(false);
                              setEdit(!edit);
                              setIndex(idx);
                              setId(product._id);
                            }}
                            className="btn1"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleSubmit();
                            }}
                            className="btn1"
                          >
                            Save
                          </button>
                        )}
                        <button onClick={() => {deleteProduct(axios, product._id)}} className="btn1">
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
                            <Field type="number" name="unit_cost_price" />
                            <p className="h6 price">Selling</p>
                            <Field type="number" name="unit_selling_price" />
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
                          <Field type="text" name="expiry_date" />
                        ) : (
                          <div>{product.expiry_date}</div>
                        )}
                      </td>
                      <td className="adj">
                        {!edit ? (
                          <div>{product.created_at}</div>
                        ) : index == idx ? (
                          <Field type="text" name="created_at" />
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
                        Image
                        <input
                          type="text"
                          name="image"
                          onChange={(e) =>
                            setFieldValue("image", e.target.value)
                          }
                        />
                        Name
                        <Field
                          type="text"
                          name="name"
                          className="text-uppercase"
                        />
                      </td>
                      <td className="adj">
                        <input
                          type="text"
                          name="category"
                          onChange={(e) =>
                            setFieldValue("category", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="barcode"
                          onChange={(e) =>
                            setFieldValue("barcode", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleSubmit();
                          }}
                          className="btn2 mx-4"
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <p className="h6">Cost</p>
                        <input
                          type="text"
                          name="unit_cost_price"
                          onChange={(e) =>
                            setFieldValue("unit_cost_price", e.target.value)
                          }
                        />
                        <p className="h6 price">Selling</p>
                        <input
                          type="text"
                          name="unit_selling_price"
                          onChange={(e) =>
                            setFieldValue("unit_selling_price", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="expiry_date"
                          onChange={(e) =>
                            setFieldValue("expiry_date", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="created_at"
                          onChange={(e) =>
                            setFieldValue("created_at", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                )}
              </Table>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default Product;
