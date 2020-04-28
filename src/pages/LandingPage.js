import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../components/Header'
import Memory from '../pages/Memory'
import './LandingPage.css'
import {connect} from 'react-redux'


const LandingPage = function(props){

    const [todolist, setTodolists] = useState([])
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
 
    useEffect(() => {
        console.log("초기화!")
        
        const config = {
            headers: {
                auth : props.secret_token
            }
        }

        axios.get(`/todo`, config).then(function(response){
            // const totalPageCount = Math.ceil(response.data.todo.length / 11)
            // const pages = []
            // for(let i = 1; i <= totalPageCount; i++){
            //     pages.push(i)
            // }
            // setPages(pages)
            // setTodolists(response.data.todolist)
        })
    }, [])
    return(
        <div>
            <div><Header/></div>
            <div><Memory location={props.location}/></div>
            </div>
    )
}

const connectedLandingPage = connect(function(state){
    return {
        secret_token : state.secret_token
    }
})(LandingPage)


export default connectedLandingPage