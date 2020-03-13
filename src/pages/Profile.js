import React, { useState} from 'react'
import Basic from '../img/basic.jpg'
import {connect} from 'react-redux'
import './Profile.css'
import *as actionCreators from '../store/actionCreators'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';

const Profile = function(props){
    const [file, setFile] = useState(false)

    console.log(props)

    const inputFileChangeHandler = (e) => {
        console.log("file : ", e.currentTarget.files[0])
        setFile(e.currentTarget.files[0])
    }

    const onNickNameChangeHandler = function(e){
        console.log("nickName: ", e.currentTarget.value)
        props.updateNickName(e.currentTarget.value)
    }

    const clickHandler = () => {
        const form = new FormData()
        form.append("myFile", file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                auth: props.secret_token,
            }
        }
        
      
        axios.post("/upload_s3", form, config).then(function(response){
            console.log(response.data)
            if(response.data.isSuccess === true){                
                props.updateProfileUrl(response.data.profile_url)
                alert("프로필 사진 업데이트 완료!")
            }
        })
    }

    const clickHandler01 = function(){
        const body = {
            nickName: props.nickName
        }

        const config = {
            headers: {
                auth: props.secret_token,
            }
        }
        

        axios.post("/update_nickName", body, config).then(function(response){
            if(response.data.isSuccess===true){
               
            }
        })
    }

    return(
        <div className="LandingPage">
            <div className="header"><Header/></div>
        <div className="contents_profile">
        <div className="profile">
            <div>
            <div className="profle_posts">
            <h1 className="profile_fix">프로필 수정</h1>
            <div>growActions대표 프로필과 닉네임을 수정하실 수 있습니다.</div>
            <div className="profile_middle">
            <div className="Profile_imgChange">
                <div className="Profile_imgText">프로필사진</div>
                <div className="Profile_Upload">
                <img className="ProfileImg" src={props.profile_url === "" ? Basic : props.profile_url}/>
                <div className="imgChange_Upload">
                <input type='file' onChange={inputFileChangeHandler}/>
                <div><button onClick={clickHandler}>사진 변경</button></div>
                </div>
                </div>
            </div>
            <div className="Profile_nickChange">
            <div className="Profile_nickText">닉네임</div> 
            <input value={props.nickName} onChange={onNickNameChangeHandler}/>
            </div>
            </div>
            </div>
            <div className="profile_handlers"><button onClick={clickHandler01} className="profile_handler">적용</button></div>
            </div>
        </div>
        </div>
        <div className="footer"><Footer/></div>
        </div>
    )

}

const connectedProfile = connect(function(state){
    return {
        nickName:state.nickName,
        secret_token:state.secret_token,
        profile_url: state.profile_url,
    }
},function(dispatch){
    return{
        updateProfileUrl : function(profile_url){
            dispatch(actionCreators.update_profileurl(profile_url))
        },

        updateNickName : function(nickName){
            dispatch(actionCreators.update_nickName(nickName))
        }
    }
})(Profile)

export default connectedProfile