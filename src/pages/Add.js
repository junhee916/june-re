import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Profile.css'
import *as actionCreators from '../store/actionCreators'
import '../pages/BookReg.css'
import '../pages/Add.css'
import axios from 'axios';

const Add = function(props){
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

    const onTodoDateHandler = function(e){
        console.log("todo_date: ", e.currentTarget.value)
        props.updateTodoDate(e.currentTarget.value)
    }

    const onTodoMemoHandler = function(e){
        console.log("date: ", e.currentTarget.value)
        props.updateTodoMemo(e.currentTarget.value)
    }

    useEffect(function(){
        axios.get("/todo").then(function(response){
            if(response.data.isSuccess===true){

            }
        })
    },[])
    

    const addClickHandler = function(){

        const form = new FormData()
        form.append("myFile", file)
        form.append("todo_date", props.todoDate)
        form.append("todo_memo", props.todoMemo)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        axios.post("/addTodo", form, config).then(function(response){
            if(response.data.isSuccess===true){
                console.log(response.date)
                props.history.push("/landing")
            }
        })
    }
 
    return(
        <div className="bookreg_posts">
            <div className="add_background">
                <div className="hole"></div>
                <div className="bookreg_contents">
                <div>
                <div className="total_bookreg">
                  <div className="img_book_file">
                   <div className="hole2"></div>
                   <div>
                   <div className="img_add">
                     {
                      imgUrl && <img src={imgUrl}/>
                     }      
                    </div>
                   </div>
                     <input type='file' onChange={inputFileChangeHandler2}/>
                  </div>

                  <div className="reg_add">
                     <div className="book_name_date">
                     <div><div>Date</div><input value={props.todoDate} onChange={onTodoDateHandler}/></div>
                     <div>
                         <div>Memo</div>
                         <textarea placeholder="review*" form="inform" cols="40" rows="10" autoFocus required wrap="hard" value={props.todoMemo} onChange={onTodoMemoHandler}/>
                     </div>
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

const connectedAdd = connect(function(state){
    return {
       todoUrl:state.todo_url,
       todoDate:state.todo_date,
       todoMemo:state.todo_memo
    }
},function(dispatch){
    return{
        updateTodoDate : function(todo_date){
            dispatch(actionCreators.update_tododate(todo_date))
        },
        updateTodoMemo : function(todo_memo){
            dispatch(actionCreators.update_todomemo(todo_memo))
        }
    }
})(Add)

export default connectedAdd
