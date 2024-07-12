export const ist_to_utc = (dateString)=>{
  try{
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime()+(5*60+30)*60000);
    return utcDate;
  }
  catch(err){
    console.log(err)
  }
}