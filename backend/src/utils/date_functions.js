export const utc_to_ist = (dateString) => {
  try {
    const date = new Date(dateString);
    const istDate = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
    return istDate;
  }
  catch (err) {
    console.log(err)
  }
}



export const ist_to_utc = (dateString) => {
  try {
    const date = new Date(dateString);
    const istDate = new Date(date.getTime() - (5 * 60 + 30) * 60 * 1000);
    return istDate;
  }
  catch (err) {
    console.log(err)
  }
}
