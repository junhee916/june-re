import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import Left from '../img/화살표.png'
import Right from '../img/화살표2.png'
import Plus from '../img/add.png'
import BookSolution from '../img/book_solution.png'
import '../pages/Select.scss'

const Select = function(props){

    const [currentBookIndex, setCurrentBookIndex] = useState(0)
    const [books, setBooks] = useState([])

    useEffect(() => {    
        const config = {
            headers: {
                auth : props.secret_token
            }
        }

        axios.get(`/recentBook?page=1`, config).then(function(response){
            setBooks(response.data.book)
        })
    }, [])

    return(
        <div className="select_total_ctrl">
        <div className="select_background">

        {
            books.length !== 0 &&
            <div>
                <div className="select_book"><img src={books.book_url===""?Plus:books[currentBookIndex].book_url} className="select_img"/></div>

                <div className="page_posts">
            <div className="select_page">
                {
                    currentBookIndex === 0?
                    <div className="select_item">
                        <div><img src={Left}/></div>
                    </div>
                    :                    
                    <div className="select_item" onClick={() => {
                        setCurrentBookIndex(currentBookIndex - 1)
                    }}>
                        <div><img src={Left}/></div>
                    </div>                    
                }

               <div className="Select_button" onClick={function(){props.history.push(`/memory?seq=${books[currentBookIndex].seq}`)}}>Select</div>
               
               {
                   currentBookIndex !== books.length - 1 ?
                   <div className="select_item" onClick={() => {
                        setCurrentBookIndex(currentBookIndex + 1)
                    }}>
                        <div><img src={Right}/></div>
                    </div>         
                    :
                    <div className="select_item">
                        <div><img src={Right}/></div>
                    </div>         

               }
               
            </div>
            </div>
            </div>            
        }

        {
            books.length === 0 &&
            <div className="nonbook_background_ctrl">
            <div className="nonbook_background">
                <img src={BookSolution}/>
                <div className="nonbook_add" onClick={function(){props.history.push("/bookreg")}}>Add</div>
            </div>
            </div>
        }

        </div>
        </div>

        
    )
}

const connectedSelect = connect(function(state){
    return {
       book_url : state.book_url,
       secret_token : state.secret_token
    }
})(Select)

export default connectedSelect
