import React from 'react'
import {Link} from 'react-router-dom'

const move = function(){
    return(
        <div>
        <div>회원가입이 완료 되었습니다.</div>
        <Link to="/login"><button>메인화면</button></Link>
        </div>
    )
}

export default move