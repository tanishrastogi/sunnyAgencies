import React from "react";
import { BarGraph } from "../../components/graphs/bar-graphs";
import Best_sale_by_month from "../../components/tables/tables";

const Analytics = ()=>{
  
  const styling = {
    position:"relative",
    margin:"70px"
  } 

  return <div>
    <BarGraph styles={styling} />    
    <Best_sale_by_month />
  </div>

}

export default Analytics