export default (orderDate, turnTimeDays, cutOffTime = 13) => {
    
  let newDate = new Date(orderDate);

  //business day end
  if (
    newDate.getHours() >= cutOffTime &&
    newDate.getDay() !== 6 &&
    newDate.getDay() !== 0
  ) {
    turnTimeDays++;
  }

  for (let i = 0; i <= turnTimeDays; i++) {
    newDate = new Date(orderDate);
    newDate.setDate(newDate.getDate() + i);

    //holidays

    //weekends
    if (newDate.getDay() === 6 || newDate.getDay() === 0) {
      turnTimeDays++;
    }
  }

  const endDate = new Date(orderDate);
  endDate.setDate(endDate.getDate() + turnTimeDays);
  return endDate;
};
