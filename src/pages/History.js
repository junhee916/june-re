import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Documentation.scss'
import './history.scss'
import Docu from '../img/documentation2.PNG'
import Left from '../img/화살표.png'
import Right from '../img/화살표2.png'

const History = function(props){

  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [img, setImg] = useState([])

  useEffect(() => {    

      axios.get(`/img`).then(function(response){
          setImg(response.data.img)
      })
  }, [])
    return(
        <div className="history_posts">
          <div className="history_background">
          <div className="history_pagenation">

          <div className="histroy_choice_ctrl"> 
             {
                currentImgIndex !== 0 &&
                    <div onClick={() => {
                        setCurrentImgIndex(currentImgIndex - 1)
                    }}>
                        <div><img className="history_choice_left" src={Left}/></div>
                    </div>                    
                }

             {
                currentImgIndex === 0 &&
                    
                        <div><img className="history_choice_left" src={Left}/></div>
                                      
                }    
         </div>

         <div className="img_url_posts">      
                 {
                  img.length !== 0 &&
                 <div className="img_url_round">
                  <div><img src={img.img_url===""?Docu:img[currentImgIndex].img_url}/></div>
                 </div>            
                  }
                  <div className="yes_btn"><div onClick={function(){props.history.push(`/`)}}>YES</div></div>
         </div>    
              
         <div className="histroy_choice_ctrl"> 
               {
                   currentImgIndex !== img.length - 1 &&
                   <div onClick={() => {
                        setCurrentImgIndex(currentImgIndex + 1)
                    }}>
                        <div><img className="history_choice" src={Right}/></div>
                    </div>                   
               }

{
                   currentImgIndex === img.length - 1 &&
                  
                        <div><img className="history_choice" src={Right}/></div>
                                  
               }
           </div>    
          </div>

          </div>
        </div>
    )
}

export default History
