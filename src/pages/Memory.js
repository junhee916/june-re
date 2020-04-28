import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import *as actionCreators from '../store/actionCreators'
import Header from '../components/Header'
import '../pages/Memory.scss'
import Key from '../img/key.png'
import select_img from '../img/select img.png'
import select_img2 from '../img/select img2.png'
import queryString from 'query-string'
import axios from 'axios';

const Memory = function(props){
    const [isOpend, setIsOpend] = useState(false)
    const [isOpend2, setIsOpend2] = useState(false)
    const [todolists, setTodolists] = useState([])
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [file, setFile] = useState(false)
    const [imgUrl, setImgUrl] = useState(null)

    const inputFileChangeHandler2 = (e) => {
        const file = e.currentTarget.files[0]
        setFile(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file)
        reader.onload = function(){
            setImgUrl(reader.result)
        }
      }

    console.log("프롭스", props)
    console.log(props.location)
    console.log(props.match)


    useEffect(() => {
        const query = queryString.parse(props.location.search)
        const seq = query.seq

        const body = {
            seq: seq,
        }

        const config = {
            headers: {
                auth : props.secret_token
            }
        }
      
        axios.post(`/recentTodolist`, body, config).then(function(response){
            console.log(response.data)
            const totalPageCount = Math.ceil(response.data.todolist.length / 2)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setTodolists(response.data.todolist)
        })

    }, [])

    const clickHandler = function(){
        setIsOpend(!isOpend)
    }

    const clickHandler2 = function(){
        setIsOpend2(!isOpend2)
    }

    const onWrChangeHandler = function(e){
        props.updateWr(e.currentTarget.value)
    }

    const todoClickHandler = function(){

        const form = new FormData()
        form.append("myFile", file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                auth : props.secret_token
            }
        }

        axios.post("/addTodo", form, config).then(function(response){
            if(response.data.isSuccess===true){
                console.log(response.date)
                alert("todo 인증 되었습니다.")
                props.history.push("/start")
            }
        })
    }

    const addClickHandler = function(){
 
        const body = {
           wr : props.wr,
        }

        const config = {
            headers: {
                auth : props.secret_token
            }
        }
        
        axios.post("/addListForBook", body, config).then(function(response){
            if(response.data.isSuccess===true){
                console.log(response.data.isSuccess)
            }
        })
    }

    return(
    <div className="landing_memory">
        <div className="header"><Header/></div>
    <div className="memory_final_posts">
            <div className="momory_total_posts">
                <div className="ib">
                    <div className="ibs">
                        <div className="ibss">
             <div className="diary_text">
                 <div>D I A R Y</div>
             </div>               
            <div className="vi"><textarea placeholder="review*" form="inform" cols="25" rows="6" autoFocus required wrap="hard" value={props.wr} onChange={onWrChangeHandler} className="memory_review"/></div>
            <div className="vi5"><div onClick={addClickHandler}>Send</div></div>
            <div className="key_posts"><div className="key_background" onClick={clickHandler}><img src={Key}/></div></div>
            </div>  
           </div>
           </div>

           <div className="todolist_action_ctrl">
    
           {isOpend&&
            <div className="list_posts">
            <div className="list_post">
            {todolists.slice((currentPage-1)*2,(currentPage)*2).map(function(todolist){
                console.log(todolist)
                return(
                   <div className="list01">
                    <div><img src={todolist.book_url}/></div>
                    <div className="p_wr">
                        <div className="seq_text">To Do List</div>
                        <div className="wr_text">{todolist.wr}</div>
                        {
                          <div className="add_click"><div onClick={clickHandler2}>Upload</div></div>
                        }
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
           </div>}

           </div>
           {isOpend2&&
           <div className="memory_upload_posts">
             <div className="memory_upload_img">
               <div className="memory_upload_size">
             {
                      imgUrl && <img src={imgUrl}/>
             } 
               </div>
            <input type='file' onChange={inputFileChangeHandler2}/>
             </div>
             <div className="memomry_upload_btn" onClick={clickHandler2}>이 전</div>
             <div className="memomry_upload_btn" onClick={todoClickHandler}>인 증</div>
           </div>}

           </div>     
</div>
</div>
    )

}

const connectedMemory = connect(function(state){
    return {
        secret_token:state.secret_token,
        wr: state.wr,
        seq: state.seq,
        todoUrl:state.todo_url,
        book_url: state.book_url,
    }
},function(dispatch){
    return{
        updateWr : function(wr){
            dispatch(actionCreators.update_wr(wr))
        }
    }
})(Memory)

export default connectedMemory