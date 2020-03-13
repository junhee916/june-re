import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators'
import './LoginPage.css'
import kakaoImg from '../img/카카오톡.png'

const LoginPage = (props) => {

    const [id, setId] = useState("")
    const [pw, setPw] = useState("")

    const clickHandler = () => {
        const body = {
            user_id : id,
            user_pw : pw,
        }
        axios.post("/login_process", body).then(function(response){
            console.log(response.data)
            if(response.data.isSuccess === true ){
                    props.login(response.data.name, response.data.age, response.data.secret_token, response.data.profile_url, response.data.nickName)
                    props.history.push("/")

            } else {
                props.history.push("/err")

            }
        })
    }


    return (
        <div className="Login">
            <div className="titleNick">growActions</div>
            <div ><input value={id} className="inputSize" onChange={function(e){setId(e.currentTarget.value)}} placeholder="ID*"/></div>
            <div className="item5"><input value={pw} className="inputSize" onChange={function(e){setPw(e.currentTarget.value)}} placeholder="Password*" type="password"/></div>
            <button onClick={clickHandler} className="btn3"><div className="agreeBtn">Login</div></button>
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=e94722859a13a96095d4b975965b3a3f&redirect_uri=http://localhost:3000/kakaoLogin&response_type=code"><button className="btn3"><div className="agreeBtn2"><img src={kakaoImg} className="kakao"/>kakao Login</div></button></a>
            <Link to="/agree"><button className="btn3"><div className="agreeBtn">회원가입</div></button></Link>
        </div>
    )
}

const ConnetedLoginPage = connect(function(state){
    return {
        isLogin : state.isLogin,
        secret_token : state.secret_token,
    }
}, function(dispatch){
    return {
        login : (name, age, secret_token, profile_url, nickName) => { dispatch(actionCreators.login_success(name, age, secret_token, profile_url, nickName)) }
    }
})(LoginPage)

export default ConnetedLoginPage