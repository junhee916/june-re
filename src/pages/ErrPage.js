import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './ErrPage.css'

const ErrPage = function(){
    return(
        <div className="posts2">
        <div><Header/></div>
        <div className="contents">실시간 채팅을 하기 위해서는 로그인을 해야합니다.</div>
        <div><Footer/></div>
        </div>
    )
}

export default ErrPage