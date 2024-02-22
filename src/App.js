import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Main from "./Main";
import Books from './Books';

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
