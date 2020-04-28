import React, {useState} from 'react'
import axios from 'axios'

const ImgUpload = function(){

    const [file, setFile] = useState(false)

    const inputFileChangeHandler =function(e){
        const file = e.currentTarget.files[0]
        setFile(file)

        
    }

    const addClickHandler = function(){
        const form = new FormData()
        form.append("myFile", file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        axios.post("/addImg", form, config).then(function(response){
            console.log(response.data)
            if(response.data.isSuccess===true){
               alert("이미지 등록되었습니다.")
            }
        })
    }

    return(
        <div>
           <input type="file" onChange={inputFileChangeHandler}/>
           <button onClick={addClickHandler}>send</button>
        </div>
    )
}

export default ImgUpload