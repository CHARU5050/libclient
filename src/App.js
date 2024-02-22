import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./Main";
import axios from 'axios';
import Books from './Books';
axios.defaults.baseURL = "https://804e-51-20-85-206.ngrok-free.app/";
axios.defaults.headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "69420"
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes >
      <Route path="/books" element={<Books/>}></Route>
        <Route path="/" element={<Main/>}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
