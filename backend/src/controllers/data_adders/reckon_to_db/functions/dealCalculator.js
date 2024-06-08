const findDeal = (rateObj)=>{
  try{
    const {mrp, purchaseRate, batchNumber, quantity, free, discount} = rateObj;

    

    if(Number(free)>0 && Number(quantity)>0){
      const deal = `${Number(quantity)/Number(free)}+1`
      return deal  
    }
    else{
      const rate = mrp-(0.285*mrp);
       
    }

  }
  catch(err){
    console.log(err);
  }
}

export {findDeal};