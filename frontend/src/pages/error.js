import React from "react";
import { useParams } from "react-router-dom";

const ErrorPage = ()=>{
    const {page} = useParams()
    // console.log(page)
    if(page==='bar-graphs'){
        return <div style={{padding:'20px' , display:'flex' , alignItems:"center" , flexDirection:'column'}}>
            <h1 style={{display:"flex",alignSelf:'center'}}>Error Fetching Graph</h1>
            <ul>
                <li style={{margin:"0 0 20px 0"}}>try entering another year (there might be no sale of the item in the given year)</li>
                <li style={{margin:"0 0 20px 0"}}>try entering another code (code you are entering maybe invalid.)</li>
            </ul>
        </div>
    }
}

export default ErrorPage