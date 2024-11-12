import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BooksList from "./Components/Book_Components/BooksList";
import AuthorsList from "./Components/Author_Components/AuthorsList";
import AddBookForm from "./Components/Book_Components/AddBookForm";
import ModifyBooks from "./Components/Book_Components/ModifyBooks";
import EditBookForm from "./Components/Book_Components/EditBookForm";
import AddAuthorForm from "./Components/Author_Components/AddAuthorForm";
import ModifyAuthors from "./Components/Author_Components/ModifyAuthors";
import EditAuthorForm from "./Components/Author_Components/EditAuthorForm";
import Navbar from "./Components/Basic_Components/Navbar";
import Footer from "./Components/Basic_Components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <h1 className="py-2 main-head text-center text-white">Library Management System</h1>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/add-book-form" element={<AddBookForm />} />
          <Route path="/modify-books" element={<ModifyBooks />} />
          <Route path="/edit-book-form/:id" element={<EditBookForm />} />
          <Route path="/authors" element={<AuthorsList />} />
          <Route path="/add-author-form" element={<AddAuthorForm />} />
          <Route path="/modify-authors" element={<ModifyAuthors />} />
          <Route path="/edit-author-form/:id" element={<EditAuthorForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
