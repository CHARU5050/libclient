import React from 'react';
import {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";

function Main(){
    const [title,settitle]=useState("");
    const [author,setauthor]=useState("");
    const [subject,setsubject]=useState("");
    const [date,setdate]=useState("");
    const [msg,setmsg]=useState(false);
    const[msginfo,setinfo]=useState("");
    const submit=()=>{
        console.log('hello');
        axios.post("http://localhost:3001/add",{
            title:title,
            author:author,
            date:date,
            subject:subject
        }).then(()=>{
            console.log('inserted');
            setmsg(true);
            setinfo("Successfully Inserted")
        }).catch((error) => {
            console.error('Error inserting data:', error);
        });
        settitle("");
        setauthor("");
        setsubject("");
        setdate("");
           }

           
  const handleClick = () => {
    setmsg(false);
  };
    return (<div className='App'>
        <h1 className='heading'> ADD BOOKS</h1>
        <div className='show'>
            <Link to="/books">
                <button> Show all the Books</button>
            </Link>
        </div>
        {msg&& (<div className='info'><div>{msginfo}</div><div onClick={handleClick}><RxCross2/></div></div>)}

        <div className='container'>
            <div className='form'>
                <div>
                    <label> Title</label>
                    <input type="text"  value={title} onChange={(e)=>settitle(e.target.value)}></input>
                    <label> Author</label>
                    <input type="text" value={author}onChange={(e)=>setauthor(e.target.value)}></input>
                    <label>Subject</label>
                    <input type="text" value={subject} onChange={(e)=>setsubject(e.target.value)}></input>
                    <label> Date</label>
                    <input type="date" value={date} onChange={(e)=>setdate(e.target.value)}></input>   
                </div>
            </div>
            <button onClick={submit}>Add books</button>
        </div>
    </div>);
}
export default Main;