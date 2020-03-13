import * as actionTypes from './actionTypes'

export const login_success = (name, age, secret_token, profile_url, nickName) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        secret_token : secret_token,
        name : name,
        age : age,
        profile_url: profile_url,
        nickName : nickName,
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const update_content = (content) => {
    return {
        type: actionTypes.UPDATE_CONTENT,
        content: content,
    }
}

export const update_title = (title) => {
    return {
        type: actionTypes.UPDATE_TITLE,
        title: title,
    }
}

export const update_id = (id) => {
    return {
        type: actionTypes.UPDATE_ID,
        id: id,
    }
}

export const update_pw = (pw) => {
    return {
        type: actionTypes.UPDATE_PW,
        pw: pw,
    }
}

export const update_name = (name) => {
    return {
        type: actionTypes.UPDATE_NAME,
        name: name,
    }
}

export const update_birth = (birth) => {
    return {
        type: actionTypes.UPDATE_BIRTH,
        birth: birth,
    }
}

export const update_number = (number) => {
    return {
        type: actionTypes.UPDATE_NUMBER,
        number: number,
    }
}

export const update_profileurl = function(profile_url){
    return{
        type: actionTypes.UPDATE_PROFILEURL,
        profile_url: profile_url
    }
}

export const update_nickName = function(nickName){
    return{
        type: actionTypes.UPDATE_NICKNAME,
        nickName : nickName
    }
}

export const update_profiledata = function(profile_data){
    return{
        type: actionTypes.UPDATE_PROFILEDATA,
        profile_data: profile_data
    }
}

export const update_wr = function(wr){
    return{
        type: actionTypes.UPDATE_WR,
        wr:wr
    }
}

export const update_msg = function(msg){
    return{
        type: actionTypes.UPDATE_MSG,
        msg:msg
    }
}

export const update_bookurl = function(book_url){
    return{
        type: actionTypes.UPDATE_BOOKURL,
        book_url:book_url
    }
}

export const update_bookname = function(book_name){
    return{
        type: actionTypes.UPDATE_BOOKNAME,
        book_name:book_name
    }
}

export const update_date = function(date){
    return{
        type: actionTypes.UPDATE_DATE,
        date:date
    }
}

export const update_tododate = function(todo_date){
    return{
        type: actionTypes.UPDATE_TODODATE,
        todo_date:todo_date
    }
}

export const update_todomemo = function(todo_memo){
    return{
        type: actionTypes.UPDATE_TODOMEMO,
        todo_memo:todo_memo
    }
}