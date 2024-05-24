import { ApiResponse } from "../../../../utils/apiResponse.js"

const trimObj = (obj)=>{
  try{
    const key_arr = Object.keys(obj);
    
    const object = {}
    
    key_arr.map((key)=>{
      object[String(key).trim()] = String(obj[key]).trim();
    })
  
    return object;

  }
  catch(err){
    return res.json(new ApiResponse(500, `(trimObj): ${err.message}`))
  }
}

const trimArrayOfObj = (array)=>{
  try{
    const arr = []
    array.map((obj)=>{
      arr.push(trimObj(obj));
    })

    return arr;
  }
  catch(err){
    return res.json(new ApiResponse(500, `(trimArrayOfObj): ${err.message}`))
  }
}

export {trimObj, trimArrayOfObj}