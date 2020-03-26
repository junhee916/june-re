import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import *as actionCreators from '../store/actionCreators'
import Basic from '../img/basic.jpg'
import Home from '../img/홈.png'
import Visitor from '../img/방명록.png'
import Choice from '../img/choice.png'
import TopImg from '../img/top_background.jpg'
import Messege from '../img/메신저.png'
import Grow from '../img/새싹.png'
import Input from '../img/등록.png'
import flower_choice from '../img/flower_choice.png'
import select_img from '../img/select img.png'
import select_img2 from '../img/select img2.png'
import './VisitorWrite.css'
import './VisitorList.css'

const VisitorWrite = function(props){

    const [users, setUsers] = useState([])
    const [boards, setBoards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])

    useEffect(() => {
        axios.get("/user").then(function(response){
            setUsers(response.data.users)
        })
    
        axios.get('/board?page=1').then(function(response){
            const totalPageCount = Math.ceil(response.data.boards.length / 3)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setBoards(response.data.boards)
            console.log(response.data)
        })
    }, [])



    const addClickHandler = function(){
        if(props.secret_token){
            console.log("로그인 된 사람의 글쓰기")
            const body = { 
                content : props.content,
                title : props.title,
                profile_url : props.profile_url
            }

            const config = {
                headers: {
                    auth : props.secret_token
                }
            }
    
            axios.post("/addBoardForMember", body, config).then(function(response){
                console.log(response.data)
                if(response.data.isSuccess === true){
                    // props.history.push("/list")
                }
            })    
        } else {
            console.log("비회원의 글쓰기")
            const body = { 
                content : props.content,
                title : props.title,
                profile_url : props.profile_url
            }
    
            axios.post("/addBoard", body).then(function(response){
                console.log(response.data)
                if(response.data.isSuccess === true){
                    // props.history.push("/list")
                }
            })            
        }
    }

    const onTitleChangeHandler = function(e){
        props.updateTitle(e.currentTarget.value)
    }

    const onContentChangeHandler = function(e){
        props.updateContent(e.currentTarget.value)
    }
  

    return(
        <div>
        <div className="total">

        
        <div className="bet_r">
         <div className="menu_2"></div>
        </div> 

        <div className="p_w">
        <div className="p_wb"><img src={TopImg} className="topimg"/></div>

        <div className="p_ww">
         <div className="pp">
         <div className="p_n">
         <div>
            <img src={props.profile_url? props.profile_url : Basic} className="p_p"/>
         </div>
         <div className="p_pn">{props.nickName===""?"user":props.nickName}</div>
         <Link to="/profile"><div className="choice"><div className="p_t">profile</div><img src={Choice} className="cc"/></div></Link>
         </div>

           <div className="menu3">
             <Link to="/">
                <div className="h">
                <div className="home2"><img src={Home}/></div>
                <h1 className="item">홈</h1></div>
            </Link>
            <Link to="/visitors">
                <div className="v">
                    <div className="visi">
                        <img src={Visitor}/>
                    </div>
                    <h1 className="item">방명록</h1>
                </div>
            </Link>
            <Link to="/live"><div className="l">
           <div className="live"><img src={Messege} className="l2"/></div>
           <h1 className="item">메신저</h1></div></Link>
           <Link to="/bookreg"><div className="l">
           <div className="live"><img src={Input} className="l2"/></div>
           <h1 className="item">등록</h1></div></Link>
           <Link to="/landing"><div className="ldg">
           <div className="landing"><img src={Grow} className="ld"/></div>
           <h1 className="item">새싹</h1></div></Link>
         </div>  
        </div>

        <div className="writes">
        <div className="Write">
        <div className="VisitorWrite">
            <div className="vi2">Please leave a message on the guest book.</div>
            <div>
            <div className="vi3"><input placeholder="title*" value={props.title} onChange={onTitleChangeHandler}/></div>
            <div className="vi"><textarea placeholder="review*" form="inform" cols="40" rows="10" autoFocus required wrap="hard" value={props.content} onChange={onContentChangeHandler}/></div>
           <div className="vi4"><button onClick={addClickHandler}>send</button></div>
           </div>
        </div>
        </div>

{/* pages */}
        <div className="list_post">
            {boards.slice((currentPage-1)*3, (currentPage)*3).map(function(board){
                 return(
                 <div className="list01">
                 <div className="l_p_i">
                  <div className="l_p">
                   <div className="p_img3"><img className="p_img3_1" src={board.profile_url ? board.profile_url : Basic }/></div>
                   <div className="nickname2">{board.nickName ? board.nickName : "비회원" }</div>
                  </div>
                 </div> 
                 <div className="l_t">
                  <div className="nick">Title <div className="b_t">{board.title}</div></div>
                  <div className="txt">{board.content}</div>
                 </div>
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
        <div className="pp"></div>
        </div> 
        </div>

        <div className="menu_3"></div>
        </div>
        </div>
    )
}


const ConnectedVisitorWrite = connect(function(state){
    return{
        nickName: state.nickName,
        content: state.content,
        title: state.title,
        profile_url:state.profile_url,
        user_id: state.user_id,
        secret_token: state.secret_token,
    }},function(dispatch){
        return{
            updateContent : function(content){
                dispatch(actionCreators.update_content(content))
            },
            updateTitle : function(title){
                dispatch(actionCreators.update_title(title))
            },
        }
    })(VisitorWrite)

export default ConnectedVisitorWrite