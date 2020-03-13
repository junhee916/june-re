import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import {Link} from 'react-router-dom'
import *as actionCreators from '../store/actionCreators'
import {connect} from 'react-redux'
import axios from 'axios'
import Basic from '../img/basic.jpg'
import '../pages/Live.css'

const socket = io("http://localhost")

const Live = (props) => {
    const [msg, setMsg] = useState("");
    const [mySocketId, setMySocketId] = useState(null)
    const [chatLists, setChatLists] = useState([])

    const clickHandler = () => {

        socket.emit("newChat", { msg : msg })

        const body ={
            chat : msg
        }

        axios.post("/addChat", body).then(function(response){
             if(response.data.isSuccess === true){

             }
        })

        setMsg("")
    }

    useEffect(() => {
        setTimeout(() => {
            setMySocketId(socket.id)
        }, 1000)
    }, [])

    useEffect(() => {
        socket.on("chats", function(data){
            const newChatLists = [...chatLists, { msg : data.msg, socketId : data.socketId }]
            setChatLists(newChatLists)

        })
    }, [chatLists])

    return (
        <div className="Live_topCss">
        <div className="Live_css">
          <div className="Live_Profile_nick">
           <div className="Live_Profile"><img src={props.profile_url === "" ? Basic : props.profile_url} className="Live_img"/></div>
           <div className="Live_nickName"><Link to="/profile"><h1 className="l_nick_text">{props.nickName}</h1></Link></div>
           </div>
            <div className="Live_Contents">
                {chatLists.map(chat => {
                    return (
                        <div className="Live_Chats">
                            {
                                chat.socketId === mySocketId
                                ? <div className="Live_Chat_Me">Me: {chat.msg}</div>
                                : <div className="Live_Chat">User: {chat.msg}</div>
                            }
                        </div>
                    )
                })}
            </div>
            <div className="Live_footer">
            <textarea placeholder="chatting*" form="inform" cols="40" rows="5" autoFocus required wrap="hard" value={msg} onChange={(e) => { setMsg(e.currentTarget.value) }}/>
            <div><button onClick={clickHandler} className="Live_btn">전송</button></div>
            </div>
        </div>
        </div>
    )
}

const ConnectedLive = connect(function(state){
    return{
       profile_url: state.profile_url,
       nickName: state.nickName
    }
})(Live)

export default ConnectedLive