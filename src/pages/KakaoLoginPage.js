import React, { useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators'

const KakaoLoginPage = (props) => {

    useEffect(() => {
        console.log(props.location.search)

        const query = queryString.parse(props.location.search)
        console.log(query)

        const code = query.code

        console.log(code)

        const body = {
            code : code
        }

        axios.post("/kakao-login-process", body).then(response => {
            console.log(response.data)
            if(response.data.isSuccess === true ){
                    props.login(response.data.name, response.data.age, response.data.secret_token, response.data.profile_url, response.data.nickName)
                    props.history.push("/start")

            } else {
                props.history.push("/err")

            }            
        })
    }, [])

    return (
        <div>카카오 로긴 테스트</div>
    )
}

const ConnetedKakaoLoginPage = connect(function(state){
    return {
        isLogin : state.isLogin,
        secret_token : state.secret_token,
    }
}, function(dispatch){
    return {
        login : (name, age, secret_token, profile_url, nickName) => { dispatch(actionCreators.login_success(name, age, secret_token, profile_url, nickName)) }
    }
})(KakaoLoginPage)

export default ConnetedKakaoLoginPage