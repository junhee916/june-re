import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Profile.scss'
import *as actionCreators from '../store/actionCreators'
import '../pages/BookReg.css'
import axios from 'axios';

const BookReg = function(props){
    console.log(props)

    const [file, setFile] = useState(false)
    const [imgUrl, setImgUrl] = useState(null)

    const inputFileChangeHandler2 = (e) => {
        const file = e.currentTarget.files[0]
        setFile(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file)
        reader.onload = function(){
            setImgUrl(reader.result)
        }
      }

    const onBookNameHandler = function(e){
        console.log("book_name: ", e.currentTarget.value)
        props.updateBookName(e.currentTarget.value)
    }

    const onDateHandler = function(e){
        console.log("date: ", e.currentTarget.value)
        props.updateDate(e.currentTarget.value)
    }

    useEffect(function(){
        const config = {
            headers: {
                auth : props.secret_token
            }
        }

        axios.get("/book", config).then(function(response){
            if(response.data.isSuccess===true){

            }
        })
    },[])
    

    const addClickHandler = function(){

        const form = new FormData()
        form.append("myFile", file)
        form.append("book_name", props.book_name)
        form.append("date", props.date)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                auth : props.secret_token
            }
        }

        axios.post("/addBook", form, config).then(function(response){
            console.log(response.data)
            if(response.data.isSuccess===true){
                console.log("나실행중")
                props.history.push("/start")
            }
        })
    }
 
    return(
        <div className="bookreg_posts">
            <div className="bookreg_background">
                <div className="hole"></div>
                <div className="bookreg_contents">
                <div>
                <div className="total_bookreg">
                  <div className="img_book_file">
                   <div className="hole2"></div>
                   <div>
                   <div className="img_book">
                     {
                      imgUrl && <img src={imgUrl}/>
                     }      
                    </div>
                   </div>
                     <input type='file' onChange={inputFileChangeHandler2}/>
                  </div>

                  <div className="reg_name">
                     <div className="book_name_date">
                     <div><div>Date</div><input value={props.date} onChange={onDateHandler}/></div>
                     <div><div>Book Name</div><input value={props.book_name} onChange={onBookNameHandler}/></div>
                     
                     </div>
                   <div className="book_send"><div onClick={addClickHandler}>send</div></div>
                 </div> 
                 </div>
                </div>
              </div>
            </div>
        </div>
    )

}

const connectedBookReg = connect(function(state){
    return {
       book_url:state.book_url,
       book_name:state.book_name,
       date:state.date,

       secret_token : state.secret_token
    }
},function(dispatch){
    return{
        updateBookName : function(book_name){
            dispatch(actionCreators.update_bookname(book_name))
        },
        updateDate : function(date){
            dispatch(actionCreators.update_date(date))
        }
    }
})(BookReg)

export default connectedBookReg
