import React, { useEffect, useState } from 'react'
import { backend_start_api } from '../../api/api'
import Loader from '../../components/loader/loader';

const Home = () => {

  const [visible , setVisibility] = useState(false);

  useEffect(()=>{

    const fetchData = async()=>{
      try{
        const data = await backend_start_api();
        if(data.statusCode === 200){
          setVisibility(true);
        }
      }
      catch(err){
        console.log(err);
      }
    }

    fetchData();

  }, []);

  // console.log(visible)

  return (
    
      visible?<div>Home</div>:<Loader />
    
  )
}

export default Home