import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Left from '../img/화살표.png'
import Right from '../img/화살표2.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Memory from '../pages/Memory'
import './LandingPage.css'
import Flower from '../img/flowericon.png'


const LandingPage = function(props){

    const [todo, setTodos] = useState([])
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
 
    useEffect(() => {
        console.log("초기화!")
        axios.get(`/recentTodo?page=1`).then(function(response){
            const totalPageCount = Math.ceil(response.data.todo.length / 11)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setTodos(response.data.todo)
        })
    }, [])
    return(
        <div className="LandingPage">
            <div className="header"><Header/></div>
            <div className="contents_background">
            <div className="test">
            <div className="cleared">Clear</div>
            <div>
            {todo.slice((currentPage-1)*11,(currentPage)*11).map(function(todos){
                return(
                   <div className="todo">
                    <div className="todo_img_posts"><img src={todos.todo_url} className="todo_img"/></div>
                    <div className="todo_posts">
                        <div className="todo_memo">
                        <div className="todo_seq">{todos.seq}</div>
                        <div className="todo_date">Date: {todos.todo_date}</div>
                       <div className="todo_memo_small">{todos.todo_memo}</div>
                       </div>
                       <div className="clear"><img src={Flower}/>인증완료</div>
                    </div>
                  </div>
                )
            })}
            <div className="memo_page">
            {pages.map(function(page){
                return (
                    <div onClick={() => { setCurrentPage(page) }}/>
                )
            })}
            <div className="memo_choice">
                {currentPage !==1 &&
                 <div onClick={() => {
                    setCurrentPage(currentPage - 1)
                }} className="memo_click">
                    <div><img src={Left}/></div>
                    </div>}
                    
                {currentPage !== pages.length&&
                <div onClick={() => {
                    setCurrentPage(currentPage + 1)
                }} className="memo_click">
                    <div><img src={Right}/></div>
                    </div>}
               
            </div>
            </div>
           </div>
            </div>
            <div className="contents_two"><Memory location={props.location}/></div>
            </div>
            <div className="footer"><Footer/></div>
        </div>
    )
}


export default LandingPage