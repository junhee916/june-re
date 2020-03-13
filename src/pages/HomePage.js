import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function HomePage(){

    const [isOpend2, setIsOpend2] = useState(true)
 


    function clickHandler2(){
        setIsOpend2(!isOpend2)
    }

    return(
        <div>
            
            <div className="Map">
            <button onClick={clickHandler2}>Map</button>
            {isOpend2?test:<div>맵이 닫혔습니다.</div>}
            </div>
            <Link to="/login"><button>before</button></Link>
        
        </div>
    )
}

export default HomePage