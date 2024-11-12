import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBookForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    author: "",
    publication_date: "",
    isbn_no: "",
    series: "",
    image_url: "",
    plot: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    author: Yup.string().required("Author is Required"),
    publication_date: Yup.date()
      .required("Publication date is required")
      .max(new Date(), "Publication date cannot be in the future"),
    isbn_no: Yup.string()
      .required("ISBN number is required")
      .matches(/^\d{3}-\d{10}$/, "Invalid ISBN format")
      .max(17, "ISBN number must be 17 characters long"),
    series: Yup.string(),
    plot: Yup.string().required("Plot is required"),
    image_url: Yup.string().url("Invalid URL format"),
  });
  const handleSubmit = async (values, { resetForm }) => {
    values.series = values.series === "" ? "N/A" : values.series;
    values.image_url =
      values.image_url === ""
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmPhMs-FfVZBYh3nwv-2fgQ8tGVyryZYA4g&usqp=CAU"
        : values.image_url;

    console.log(values);

    try {
      const response = await axios.post(
        "https://65eed58eead08fa78a4f025d.mockapi.io/Books",
        values,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      resetForm();
      alert(`New Book Data Added Successfully !`);
      navigate("/modify-books");
    } catch (error) {
      console.error("Error:", error);
      alert(`Network Error, while Adding book data, kindly refresh again!`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="bg-info my-3 py-3 px-5">
              <h1 className="text-center">Add Book Form</h1>
              <div className="row">
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Title/Name of the Book : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter Book Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Author Name : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="author"
                    placeholder="Enter Author Name"
                  />
                  <ErrorMessage
                    name="author"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Publication Date : </b>
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    name="publication_date"
                  />
                  <ErrorMessage
                    name="publication_date"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>ISBN Number : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="isbn_no"
                    placeholder="e.g 213-5839954933"
                  />
                  <ErrorMessage
                    name="isbn_no"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Series : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="series"
                    placeholder="Enter Series"
                  />
                  <ErrorMessage
                    name="series"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Book Cover Image URL : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="image_url"
                    placeholder="Enter Book Cover Image URL"
                  />
                  <ErrorMessage
                    name="image_url"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-12">
                  <label className="form-label">
                    <b>Plot : </b>
                  </label>
                  <Field
                    as="textarea"
                    className="form-control"
                    name="plot"
                    placeholder="The Book's Plot"
                  />
                  <ErrorMessage
                    name="plot"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-success w-50 mx-2">
                    Add Book
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
          <div className="d-flex justify-content-center">
            <button
              className="btn text-center btn-warning w-50 w-lg-25 my-3"
              onClick={() => navigate("/")}
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookForm;
