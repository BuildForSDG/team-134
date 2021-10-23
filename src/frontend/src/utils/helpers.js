
export const getBaseUrl = () =>{
  // if(process.env.REACT_APP_ENV === 'production'){
  //   return process.env.REACT_APP_PROD_URL;
  // }
}

export const getDateToday = () =>{
    return new Date().toISOString().split('T')[0];
}

export const convertISOToLocalTime = (isoTime) =>{
  //there is a difference of -3hrs
  //TODO: account for timezone if operating outside kenya
  // const hourDiff = new Date().getTimezoneOffset()/60;
  const parts = isoTime.split('T');
  const date = parts[0];
  let time = parts[1].split('.')[0].substring(0,5); //19:04
  let hour = parseInt(time.split(':')[0]);
  let finalHour = null;
  if(hour < 21){
      let h = hour + 3;
      if(h < 10){
          finalHour = '0'+parseInt(h);
      }else{
          finalHour = parseInt(h);
      }
  }
  if(hour === 21){
      finalHour = '00';
  }
  if(hour > 21){
      let diff = 24 - hour;
      let rem = 3 - diff;
      finalHour = '0'+parseInt(rem);
  }

  let timeString;
  const minutes = time.split(':')[1];
  if(date === getDateToday()){ // this is an order made today
      timeString = finalHour+':'+minutes;
  }else{
      const p = new Date(date).toDateString().split(' ');
      timeString = `${p[2]} ${p[1]} ${finalHour}:${minutes}`; // 03 Apr 14:49
  }
  return(timeString);
}