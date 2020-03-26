import React, { useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import Left from '../img/화살표.png'
import Right from '../img/화살표2.png'
import {Link} from 'react-router-dom'
import '../pages/Select.css'

const Select = function(props){
   
    const [pages, setPages] = useState([])
    const [currentBookIndex, setCurrentBookIndex] = useState(0)
    const [books, setBooks] = useState([])

    useEffect(() => {    
        axios.get(`/recentBook?page=1`).then(function(response){
            setBooks(response.data.book)

            // console.log(response.data.book)
            // const totalPageCount = Math.ceil(response.data.book.length / 1)

            // const pages = []
            // for(let i = 1; i <= totalPageCount; i++){
            //     pages.push(i)
            // }
            // setPages(pages)
            // setBooks(response.data.book)
        })
    }, [])

    return(
        <div>
        <div className="select_background">

        {
            books.length !== 0 &&
            <div>
                <div className="select_book"><img src={books[currentBookIndex].book_url} className="select_img"/></div>
            </div>            
        }


        <div className="page_posts">
            <div className="select_page">
                {
                    currentBookIndex !== 0 &&
                    <div className="select_item" onClick={() => {
                        setCurrentBookIndex(currentBookIndex - 1)
                    }}>
                        <div><img src={Left}/></div>
                    </div>                    
                }
               <div className="Select_button" onClick={function(){props.history.push(`/landing?seq=${books[currentBookIndex].seq}`)}}>Select</div>
               {
                   currentBookIndex !== books.length - 1 &&
                   <div className="select_item" onClick={() => {
                        setCurrentBookIndex(currentBookIndex + 1)
                    }}>
                        <div><img src={Right}/></div>
                    </div>                   
               }
            </div>
            </div>
          }  
        </div>
        </div>

        
    )
}

const connectedSelect = connect(function(state){
    return {
       book_url : state.book_url
    }
})(Select)

export default connectedSelect
