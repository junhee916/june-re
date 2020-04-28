import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../store/actionCreators'
import './Start.scss'
import './StartPage.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import select_img from '../img/select img.png'
import select_img2 from '../img/select img2.png'
import '../pages/App.css'


const Start = function(props){
    const [todo, setTodo] = useState([])
    const [books, setBook] = useState([])

    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const [pages2, setPages2] = useState([])
    const [currentPage2, setCurrentPage2] = useState(1)


    useEffect(function(){

        const config = {
            headers : {
                auth: props.secret_token
            }
        }

        axios.get("/recentTodo", config).then(function(response){
            console.log("레스폰스 데이터", response.data)
            const totalPageCount2 = Math.ceil(response.data.todo.length / 2)
            const pages2 = []
            for(let i = 1; i <= totalPageCount2; i++){
                pages2.push(i)
            }
            setPages2(pages2)
            setTodo(response.data.todo)
        })
        axios.get(`/recentBook`, config).then(function(response){
            console.log(response.data)
            const totalPageCount = Math.ceil(response.data.book.length / 7)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setBook(response.data.book)
        })
    },[])


    return(
        <div className="Start_default">
            <div className="header"><Header/></div>
            <div className="contents_default">

        <div className="action_book_list_ctrl">
        
        <div className="actionlist_ctrl">
          <div className="hot_grow">Action List</div>
          <div className="actionlist_posts">
          <div className="book_map">
          {todo.slice((currentPage2-1)*2, (currentPage2)*2).map(function(todos){
                return(
                    <div className="todo_img">
                     <img src={todos.todo_url}/>
                    </div>
                )
                })}
            </div>

          <div className="page">
            <div onClick={() => setCurrentPage2(currentPage2 - 1)}><img src={select_img2} className="btn_select"/></div>
            {pages2.map(function(page2){
                if(page2 === currentPage2) {
                    return (
                        <div onClick={() => { setCurrentPage2(page2) }} className="book_page">{page2}</div>
                    )
                } else {
                    return (
                        <div onClick={() => { setCurrentPage2(page2) }} className="book_page">{page2}</div>
                    )
                }
            })}
            <div onClick={() => setCurrentPage2(currentPage2 + 1)}><img src={select_img} className="btn_select"/></div>
            </div>     
          </div>
         </div> 

         <div className="actionlist_right_ctrl">
         <div className="actionlist_add_ctrl">   
          <div className="hot_grow">Book List</div>
          <div className="book_add_btn_ctrl"><div className="actionlist_add_btn" onClick={function(){props.history.push("/bookreg")}}>Add</div></div>
         </div> 
          <div className="actionlist_posts">
            <div className="book_map">
          {books.slice((currentPage-1)*10, (currentPage)*10).map(function(book){
                return(
                    <div>
                    <div><img src={book.book_url}/></div>
                    </div>
                )
                })}
            </div>

          <div className="page">
            <div onClick={() => setCurrentPage(currentPage - 1)}><img src={select_img2} className="btn_select"/></div>
            {pages.map(function(page){
                if(page === currentPage) {
                    return (
                        <div onClick={() => { setCurrentPage(page) }} className="book_page">{page}</div>
                    )
                } else {
                    return (
                        <div onClick={() => { setCurrentPage(page) }} className="book_page">{page}</div>
                    )
                }
            })}
            <div onClick={() => setCurrentPage(currentPage + 1)}><img src={select_img} className="btn_select"/></div>
            </div>     
          </div>
         </div> 

        </div>


         
        </div>
    
        <div className="footer"><Footer/></div>
        </div>
        
        
    )
}

const connectedStart = connect(function(state){
    return{
        isLogin: state.isLogin,
        nickName: state.nickName,
        book_url : state.book_url,
        secret_token : state.secret_token
    }
}, function(dispatch){
    return {
        logout : () => { dispatch(actionCreators.logout()) },
        updateBookUrl : function(book_url){
            dispatch(actionCreators.update_bookurl(book_url))
        }
    }
})(Start)


export default connectedStart