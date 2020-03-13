import React, { useState } from "react";

const B = () => {
    const [boards, setBoards] = useState(["가", "나", "따", "라", "마","바","사","아"])
    const [currentPage, setCurrentPage] = useState(1)
    const totalPageCount = Math.ceil(boards.length / 2)
    const pages = []
    for(let i = 1; i <= totalPageCount; i++){
        pages.push(i)
    }
    return (
        <div>
            {boards.slice((currentPage -1) * 2, (currentPage) * 2).map(function(v){
                return (
                    <div>{v}</div>
                )
            })}
            <div>
                <button onClick={() => {
                    setCurrentPage(currentPage - 1)
                }}>이전</button>
                <button onClick={() => {
                    setCurrentPage(currentPage + 1)
                }}>더보기</button>
            </div>
        </div>
    )
}

export default B

// import React, { useState } from "react";

// const B = () => {
//     const [boards, setBoards] = useState(["가", "나", "따", "라", "마","바","사","아"])
//     const [currentPage, setCurrentPage] = useState(1)
//     const totalPageCount = Math.ceil(boards.length / 2)
//     const pages = []
//     for(let i = 1; i <= totalPageCount; i++){
//         pages.push(i)
//     }
//     return (
//         <div>
//             {boards.slice((currentPage -1) * 2, (currentPage) * 2).map(function(v){
//                 return (
//                     <div>{v}</div>
//                 )
//             })}
//             <div>
//                 {pages.map(function(pageNum){
//                     return (
//                         <span onClick={() => {
//                             console.log(pageNum, "클릭발생!")
//                             setCurrentPage(pageNum)
//                         }}>{pageNum}</span>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// export default B