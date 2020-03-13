import React from 'react'
import LandingPage from '../pages/LandingPage'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivatePage = function(props){
    console.log(" 로그인 상태 : ", props.isLogin)
    if(props.isLogin===true){
        return(
            <LandingPage location={props.location}/>
        )
    }
    else{
        return(
            <Redirect to ="/agree"/>
        )
    }
}

const connectedPrivatePage = connect(function(state){
    return {
        isLogin : state.isLogin
    }
})(PrivatePage)

export default connectedPrivatePage