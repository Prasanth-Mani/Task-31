import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModifyBooks = () => {
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();
  const [deleteBookData, setDeleteBookData] = useState([]);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://65eed58eead08fa78a4f025d.mockapi.io/Books/${id}`
      );
      setDeleteBookData(res.data);
      console.log(deleteBookData);
      alert(`The Book titled ${res.data.title} deleted Successfully !`);
    } catch (error) {
      alert(`Network Error, while deleting book data,try again!`);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [deleteBookData]);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        "https://65eed58eead08fa78a4f025d.mockapi.io/Books"
      );
      console.log(`Books Data fetched successfully!`);
      setBookData(res.data);
    } catch (error) {
      alert(`Network Error, while fetching books data, kindly refresh again!`);
      console.log(error);
    }
  };

  if (loading) {
    return <div className="py-5 text-center text-white">Loading...</div>;
  }
  return (
    <>
      <div className="container">
      <h2 className="text-center my-3 text-info text-decoration-underline">Books List</h2>
        <div className="table-responsive">
          {bookData.length === 0 ? (
            <h3 className="text-white text-center my-5 ">
              There is no book data available.
              <br /> Add new books to see!
            </h3>
          ) : (
            <>
              <table className="table table-hover text-center mt-4">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Author Name</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {bookData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/edit-book-form/${item.id}`)}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="text-center my-4">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/add-book-form")}
                >
                  Add Book
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyBooks;
