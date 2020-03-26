import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import *as actionCreators from '../store/actionCreators'
import '../pages/Memory.css'
import Key from '../img/key.png'
import Left from '../img/화살표.png'
import Right from '../img/화살표2.png'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios';

const Memory = function(props){
    const [isOpend, setIsOpend] = useState(false)
    const [list, setLists] = useState([])
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    console.log("프롭스", props)
    console.log(props.location)
    console.log(props.match)


    useEffect(() => {
        console.log("초기화!")
      
        axios.get(`/recentList?page=1`).then(function(response){
            const totalPageCount = Math.ceil(response.data.list.length / 11)
            const pages = []
            for(let i = 1; i <= totalPageCount; i++){
                pages.push(i)
            }
            setPages(pages)
            setLists(response.data.list)
        })

    }, [])

    const clickHandler = function(){
        setIsOpend(!isOpend)
    }

    const onWrChangeHandler = function(e){
        props.updateWr(e.currentTarget.value)
    }

    const addClickHandler = function(){
        const query = queryString.parse(props.location.search)
        console.log(props.location.search)
        const seq = query.seq

        

        console.log(props.wr)
        const body = {
           seq : seq,
           wr : props.wr,
        }
        
        axios.post("/addListForBook", body).then(function(response){
            if(response.data.isSuccess===true){
                console.log(response.data.isSuccess)
            }
        })
    }

    return(
            <div>
                <div className="ib">
                    <div className="ibs">
                        <div className="ibss">
            <div className="vi"><textarea placeholder="review*" form="inform" cols="40" rows="10" autoFocus required wrap="hard" value={props.wr} onChange={onWrChangeHandler}/></div>
            <div className="vi5"><button onClick={addClickHandler}>send</button></div>
            <div className="key_posts"><div className="key_background" onClick={clickHandler}><img src={Key}/></div></div>
            </div>  
           </div>
           {isOpend&&
            <div className="list_posts">
            {list.slice((currentPage-1)*11,(currentPage)*11).map(function(lists){
                console.log(lists)
                return(
                   <div className="list01">
                    <div className="p_imgs"><img src={lists.book_url} className="p_img2"/></div>
                    <div className="p_wr">
                        <div className="seq_text">{lists.seq}</div>
                        <div className="wr_text">{lists.wr}</div>
                        {
                          <Link to="/add"><div className="add_click"><div>인증</div></div></Link>
                        }
                    </div>
                   </div>
                )
            })}
            <div className="page">
            {pages.map(function(page){
                return (
                    <div onClick={() => { setCurrentPage(page) }}/>
                )
            })}
            <div className="list_choice">
                {currentPage !==1 &&
                 <div onClick={() => {
                    setCurrentPage(currentPage - 1)
                }} className="list_click">
                    <div><img src={Left}/></div>
                    </div>}
                
                {currentPage !== pages.length&&
                   <div onClick={() => {
                    setCurrentPage(currentPage + 1)
                }} className="list_click">
                    <div><img src={Right}/></div>
                    </div>}
            </div>
            </div>
           </div>}
           </div>
           </div>     

    )

}

const connectedMemory = connect(function(state){
    return {
        secret_token:state.secret_token,
        wr: state.wr,
        seq: state.sep,
        book_url: state.book_url
    }
},function(dispatch){
    return{
        updateWr : function(wr){
            dispatch(actionCreators.update_wr(wr))
        }
    }
})(Memory)

export default connectedMemory