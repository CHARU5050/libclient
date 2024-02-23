import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [cp, setCP] = useState(1);
  const recordpage = 5;
  const lindex = cp * recordpage;
  const findex = lindex - recordpage;
  const record = books.slice(findex, lindex);

  const npage = Math.ceil(books.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    getBooks();
  }, [search]);

  const getBooks = () => {
    axios
      .get("/books")
      .then((response) => {
        let filteredBooks = response.data;
        if (search) {
          filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase())|| book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.date.includes(search) || book.subject.includes(search.toLowerCase())
          );
        }
        setBooks(filteredBooks);
        setCP(1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function prePage() {
    if (cp !== findex) {
      setCP(cp - 1);
    }
  }

  function nextPage() {
    if (cp !== lindex) {
      setCP(cp + 1);
    }
  }

  function changeCP(id) {
    setCP(id);
  }

  return (
    <>
      <div className="show">
        <Link to="/">
          <button>Add books</button>
        </Link>
      </div>
      <h1 className="heading">List of Books</h1>
      <div className="search">
        <div className="total">
          Total Number of books:
          <span>{books.length}</span>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="search .."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {record.map((val, key) => {
              const formattedDate = moment(val.date).format("YYYY-MM-DD");
              return (
                <tr key={key}>
                  <td>{val.title}</td>
                  <td>{val.author}</td>
                  <td>{val.subject}</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item${cp === n ? " active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCP(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Books;
