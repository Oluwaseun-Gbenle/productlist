import axios from "axios";
import "./Product.css";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Formik, Field } from "formik";
import {
  fetchData,
  updateProduct,
  createProduct,
  deleteProduct,
} from "./async-function";
import * as Yup from "yup";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState("");
  const [getId, setId] = useState("");
  const [add, setAdd] = useState(false);
  const [initialValues, setIntialValues] = useState({});
  const defaultProduct = products.find((product) => product._id === getId);

  const validationSchema = Yup.object().shape({
    image: Yup.string().required("Image is required"),
    name: Yup.string().required("Name is required"),
    barcode: Yup.string().required("Barcode is required"),
  });

  useEffect(() => {
    fetchData({ axios, setProducts });
  }, [products]);

  useEffect(() => {
    if (add) {
      setIntialValues({
        id: "",
        image: "",
        name: "",
        category: "",
        barcode: "",
        unit_cost_price: "",
        unit_selling_price: "",
        expiry_date: "",
        created_at: "",
      });
    } else
      setIntialValues({
        id: defaultProduct?._id,
        image: defaultProduct?.image,
        name: defaultProduct?.name,
        category: defaultProduct?.category,
        barcode: defaultProduct?.barcode,
        unit_cost_price: defaultProduct?.unit_cost_price,
        unit_selling_price: defaultProduct?.unit_selling_price,
        expiry_date: defaultProduct?.expiry_date,
        created_at: defaultProduct?.created_at,
      });
  }, [defaultProduct]);

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
                setEdit(false);
                setAdd(!add);
                window.scrollTo(0, 20000);
              }}
              className="btn2"
            >
              Add New Product
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              setEdit(false);
              setAdd(false);
              if (add) {
                createProduct({ axios, values });
              } else {
                updateProduct({ axios, values });
              }
            }}
          >
            {({ handleSubmit, values, touched, errors }) => (
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
                            {touched.image && errors.image && (
                              <div className="text-danger">{errors.image}</div>
                            )}
                            Image
                            <Field type="text" name="image" />
                            {touched.name && errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                            Name
                            <Field
                              type="text"
                              name="name"
                              className="text-uppercase"
                            />
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
                          <div>
                            {touched.barcode && errors.barcode && (
                              <div className="text-danger">
                                {errors.barcode}
                              </div>
                            )}
                            <Field type="number" name="barcode" />
                          </div>
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
                        <button
                          onClick={() => {
                            deleteProduct(axios, product._id);
                          }}
                          className="btn1"
                        >
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
                        {touched.image && errors.image && (
                          <div className="text-danger">{errors.image}</div>
                        )}
                        Image
                        <Field type="text" name="image" />
                        {touched.name && errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                        Name
                        <Field
                          type="text"
                          name="name"
                          className="text-uppercase"
                        />
                      </td>
                      <td className="adj">
                        <Field type="text" name="category" />
                      </td>
                      <td>
                        {touched.barcode && errors.barcode && (
                          <div className="text-danger">{errors.barcode}</div>
                        )}
                        <Field type="text" name="barcode" />
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
                        <Field type="text" name="unit_cost_price" />
                        <p className="h6 price">Selling</p>
                        <Field type="text" name="unit_selling_price" />
                      </td>
                      <td>
                        <Field type="text" name="expiry_date" />
                      </td>
                      <td>
                        <Field type="text" name="created_at" />
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
