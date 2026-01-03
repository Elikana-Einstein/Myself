function getDate(day){
  let thisDate; //a variable to store the day date being calculated
  let rem; //a variable to help in calculating thisDate
  let days = {'Monday':1,'Tuesday':2,'Wednesday':3,'Thursday':4,'Friday':5,'Saturday':6,'Sunday':7}  //object to turn days into numbers
  let actual_day = new Date().getDay() //get the current day
  let date = new Date().getDate()  //get the current date
  let month = new Date().getMonth() //get the current month
  if (days[day] === actual_day){
      return date
  }
  if (month === 8 || month === 3 || month === 5 || month === 10){ // check if month is thirty days
      if (days[String(day)] > actual_day ){   //check day being calculated is before or after current day
          rem = days[String(day) ]- actual_day; 
          thisDate = date + rem;
          if(thisDate > 30){
            thisDate = thisDate % 30;
            return thisDate;
          }else{
            return thisDate;
          }
      }else{
          rem = actual_day - days[String(day)];
          thisDate = date - rem;
          if(thisDate < 1){  //check if thisDate has jumped into the previous month
            thisDate = 31+ thisDate;
            return thisDate;
          }else{
            return thisDate;
          }
      }
  }else if(month === 1){ //check if month is february 28 days , handle 29 logic later
      if (days[String(day)] > actual_day ){
         rem = days[String(day) ]- actual_day;
          thisDate = date + rem;
          if(thisDate > 28){
            thisDate = thisDate % 28;
            return thisDate;
          }else{
            return thisDate;
          }
      }else{
         rem = actual_day - days[String(day)];
        thisDate = date - rem;
        thisDate = 31 + rem;
        return thisDate;
      }
  }else{ //for months with 31 days
    
    if (days[String(day)] > actual_day ){
          rem = days[String(day) ]- actual_day;
          thisDate = date + rem;
          if(thisDate > 31){
            thisDate = thisDate % 31;
            return thisDate;
          }else{
            return thisDate;
          }
      }else{
          rem = actual_day - days[String(day)];
          
          thisDate = date - rem;
          
          if (month === 0 || month === 7 || month === 3){ //check if month is january august or february since their previos months is 31 days
            thisDate = 31 + thisDate;
            return thisDate;
          }else if(month === 2){ // check if month is march since prev month is 28 days
            thisDate = 28+rem;
            return thisDate;
          }else{
            thisDate = 3 +rem
          }
     
      }
  }
}

export const week ={'Monday':getDate('Monday'),'Tuesday':getDate('Tuesday'),'Wednesday':getDate('Wednesday'),'Thursday':getDate('Thursday'),'Friday':getDate('Friday'),'Saturday':getDate('Saturday'),'Sunday':getDate('Sunday')}




export const formatDate = (date) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const ordinal = (n) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${days[date.getDay()]} ${date.getDate()}${ordinal(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export function getDayOfWeekSwitch2() {
  const dayNumber = new Date().getDay();
  
  switch (dayNumber) {
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    default: return 'Monday';
  }
}
  