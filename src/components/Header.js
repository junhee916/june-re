import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import hamImg from '../img/ham.png'
import '../components/Header.css'
import Basic from '../img/basic.jpg'
import MikyImg from '../img/미키마우스.jpg'
import Home from '../img/홈.png'
import Visitor from '../img/방명록.png'
import Messege from '../img/메신저.png'
import Input from '../img/등록.png'
import Grow from '../img/새싹.png'
import growActions from '../img/growActions.png'
import logo from '../img/growActions logo.jpg'

const Header = function(props){


const [isOpend, setIsOpend] = useState(true)

const clickHandler = function(){
    setIsOpend(!isOpend)
}

    return(
<div className="start">
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
           <div className="live"><img src={Messege}/></div>
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
           <div className="min">
           <div className="p_img"><img src={props.profile_url === "" ? Basic : props.profile_url}/></div>
           <Link to="/profile"><div className="nickName"><h1 className="n2">{props.nickName}</h1></div></Link>
           </div>
        </div>
        </div>
    )
}

const ConnectedHeader = connect(function(state){
    return{
        nickName:state.nickName,
        profile_url:state.profile_url
    }
})(Header)

export default ConnectedHeader