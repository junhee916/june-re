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
import select_img from '../img/select img.png'
import select_img2 from '../img/select img2.png'
import './VisitorWrite.scss'

const VisitorWrite = function(props){

    const [boards, setBoards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState([])
    const [isOpend, setIsOpend] = useState(true)

    useEffect(() => {
       
        axios.get('/board?page=1').then(function(response){
            console.log(response.body)
            const totalPageCount = Math.ceil(response.data.boards.length / 2)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setBoards(response.data.boards)
            console.log(response.data)
        })
    }, [])

    const clickHandler = function(){
        setIsOpend(!isOpend)
    }

    const addClickHandler = function(){
        console.log("1 addclick 실행")
        if(props.secret_token){
            console.log(props.secret_token)
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
        
        {isOpend&&
        <div className="fitting">
           <div className="fitting_background">
              <div onClick={clickHandler}>응 원</div> 
           </div>
        </div>
    }

   
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
             <Link to="/start">
                <div className="h">
                <div className="home2"><img src={Home}/></div>
                <div className="item">Home</div></div>
            </Link>
            <Link to="/visitors">
                <div className="v">
                    <div className="visi">
                        <img src={Visitor}/>
                    </div>
                    <div className="item">Visitor</div>
                </div>
            </Link>
            <Link to="/live"><div className="l">
           <div className="live"><img src={Messege} className="l2"/></div>
           <div className="item">Messege</div></div></Link>
           <Link to="/select"><div className="ldg">
           <div className="landing"><img src={Grow} className="ld"/></div>
           <div className="item">To Do</div></div></Link>
         </div>  
        </div>

        <div className="writes">
        <div className="Write">
        <div>
            <div className="visitor_text">Visitor</div>
            <div className="title_review">
            <div className="title_text">Title <input placeholder="title*" value={props.title} onChange={onTitleChangeHandler}/></div>
            <div><textarea placeholder="review*" form="inform" cols="40" rows="10" autoFocus required wrap="hard" value={props.content} onChange={onContentChangeHandler}/></div>
           </div>
           <div><div className="visitor_send_btn" onClick={addClickHandler}>Send</div></div>
        </div>
        </div>

{/* pages */}
        <div className="list_post">
            <div className="list_ctrl">
            {boards.slice((currentPage-1)*2, (currentPage)*2).map(function(board){
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
            </div>
            <div className="visitor_page">
            <div onClick={() => setCurrentPage(currentPage - 1)}><img src={select_img2} className="btn_select"/></div>
            {pages.map(function(page){
                if(page === currentPage) {
                    return (
                        <div onClick={() => { setCurrentPage(page) }} className="visitor_page">{page}</div>
                    )
                } else {
                    return (
                        <div onClick={() => { setCurrentPage(page) }} className="visitor_page">{page}</div>
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