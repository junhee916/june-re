import React, { useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators'
import './LoginPage.css'

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
                    props.history.push("/start")

            } else {
                alert("로그인 정보가 맞지 않습니다. 다시 로그인을 시도해주세요")

            }
        })
    }


    return (

        <div className="Login">
        <div className="titleNick">growActions</div>
        <div ><input value={id} className="inputSize" onChange={function(e){setId(e.currentTarget.value)}} placeholder="ID*"/></div>
        <div className="item5"><input value={pw} className="inputSize" onChange={function(e){setPw(e.currentTarget.value)}} placeholder="Password*" type="password"/></div>
        <div onClick={clickHandler}><div className="login_btn">Login</div></div>
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