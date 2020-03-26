import React from 'react'
import {Link} from 'react-router-dom'
import '../pages/movePage.css'

const move = function(){
    return(
        <div className="move_posts">
         <div className="move_post">
          <div className="move_text">회원가입이 완료 되었습니다.</div>
          <Link to="/login"><div className="move_btn">메인화면</div></Link>
         </div>  
        </div>
    )
}

export default move