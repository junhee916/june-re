import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionCreators from '../store/actionCreators'
import './StartPage.css'
import Footer from '../components/Footer'
import hamImg from '../img/ham.png'
import Home from '../img/홈.png'
import Visitor from '../img/방명록.png'
import Messege from '../img/메신저.png'
import Grow from '../img/새싹.png'
import Input from '../img/등록.png'
import axios from 'axios'
import Flower from '../img/flowericon.png'
import select_img from '../img/select img.png'
import select_img2 from '../img/select img2.png'
import flower_choice from '../img/flower_choice.png'
import '../pages/App.css'
import growActions from '../img/growActions.png'
import logo from '../img/growActions logo.jpg'

const Start = function(props){
    const [isOpend, setIsOpend] = useState(true)
    const [isOpend2, setIsOpend2] = useState(false)
    const [todo, setTodos] = useState([])
    const [books, setBook] = useState([])
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const clickHandler = function(){
         setIsOpend(!isOpend)
    }

    const clickHandler2 = function(){
        setIsOpend2(!isOpend2)
   }

   const logout = function(){
        localStorage.clear()
        props.logout()
        console.log(localStorage)
   }

    useEffect(function(){
        axios.get("/recentTodo").then(function(response){
            setTodos(response.data.todo)
        })
        axios.get(`/recentBook?page=1`).then(function(response){
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
        <div className="Start">
        <div className="posts">
            <div className="ham"><img src={hamImg} className="ham2" onClick={clickHandler}/>
            {isOpend&&<div className="menu">
            <Link to="/"><div className="h">
            <div className="home2"><img src={Home}/></div>
           <h1 className="item">홈</h1></div></Link>
           <Link to="/visitors"><div className="v">
           <div className="visi"><img src={Visitor}/></div>
           <h1 className="item">방명록</h1></div></Link>
           <Link to="/live"><div className="l">
           <div className="live"><img src={Messege} className="l2"/></div>
           <h1 className="item">메신저</h1></div></Link>
           <Link to="/bookreg"><div className="l">
           <div className="live"><img src={Input} className="l2"/></div>
           <h1 className="item">등록</h1></div></Link>
           <Link to="/select"><div className="ldg">
           <div className="landing"><img src={Grow} className="ld"/></div>
           <h1 className="item">새싹(to do)</h1></div></Link>
           </div>}
           <div className="miky"><img src={logo} className="logo"/></div>
           <h1 className="jun"><img src={growActions} className="domain"/></h1>
           </div>
         <div className="s_btn_ctr">
        <div className="s_nicks"> <Link to="/profile"><div className="s_nick" onClick={clickHandler2}>{props.nickName}</div></Link></div>
           <div className="login">
                {props.isLogin===false?<Link to="/login"><button className="s_btn"><div className="btn">LOGIN</div></button></Link>
                :<button onClick={logout} className="Logout_Css"><div className="Logout_Text">LOGOUT</div></button>}
            </div>
        </div>
        </div>
        <div className="contents">
        <h1 className="hot_grow">Flower<img src={Flower}/></h1>
        <div className="lp_bk">
        <div className="lp_lw">
        {
            todo.map(function(todos){
                return (
                    <div className="lp_1w01">
                        <div><img src={todos.todo_url} className="list_profile"/></div>
                        <div><div className="list_wr">{todos.todo_memo}</div></div>  
                    </div>
                
                )}
            )
        }      

        </div> 
        <div className="book_round">
            <div className="book_h1">a book read</div>
            <div>
            <div className="book_url_send">
            
            <div className="book_url">
            {books.slice((currentPage-1)*14, (currentPage)*14).map(function(book){
                return(
                    <div>
                    <div><img src={book.book_url} className="book_url_img" /></div>
                    </div>
                )
            })}
            </div>
            <div className="page">
            <div onClick={() => setCurrentPage(currentPage - 1)}><img src={select_img2} className="btn_select"/></div>
            {pages.map(function(page){
                if(page === currentPage) {
                    return (
                        <div onClick={() => { setCurrentPage(page) }}><img src={flower_choice} className="flower_choice"/></div>
                    )
                } else {
                    return (
                        <div onClick={() => { setCurrentPage(page) }}>{page}</div>
                    )
                }
            })}
            <div onClick={() => setCurrentPage(currentPage + 1)}><img src={select_img} className="btn_select"/></div>
            </div>
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
        book_url : state.book_url
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