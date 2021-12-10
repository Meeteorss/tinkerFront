export const formatTime = (date: any) => {
  // console.log("in function date", date);

  const currentHour = new Date().getHours();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMinute = new Date().getMinutes();
  const dayDiff = currentDay - new Date(date).getDate();
  let formattedTime = "";

  if (currentYear == new Date(date).getFullYear()) {
    if (currentMonth == new Date(date).getMonth()) {
      if (dayDiff == 0) {
        if (currentHour == new Date(date).getHours()) {
          if (currentMinute - new Date(date).getMinutes() < 2) {
            formattedTime = "A l'instant";
          } else {
            formattedTime = `Il y'a ${
              currentMinute - new Date(date).getMinutes()
            } minutes`;
          }
        } else if (currentHour - new Date(date).getHours() == 1) {
          formattedTime = "Il y'a une heure";
        } else if (currentHour - new Date(date).getHours() < 3) {
          formattedTime = `Il y'a ${
            currentHour - new Date(date).getHours()
          } heures`;
        } else {
          formattedTime = `Aujourd'hui à ${new Date(date).toLocaleTimeString(
            "fr",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}`;
        }
      } else if (dayDiff == 1) {
        formattedTime = `Hier à ${new Date(date).toLocaleTimeString("fr", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      } else {
        formattedTime = `Il y'a ${dayDiff} jours`;
      }
    } else if (currentMonth - new Date(date).getMonth() == 1) {
      formattedTime = "Il y'a un mois";
    } else {
      formattedTime = `Il y'a ${currentMonth - new Date(date).getMonth()} mois`;
    }
  } else if (currentYear - new Date(date).getFullYear() == 1) {
    formattedTime = "Il y'a un an";
  } else {
    formattedTime = `Il y'a ${currentMonth - new Date(date).getFullYear()} ans`;
  }

  return formattedTime;
};

export const formatMonthOrDay = (monthOrDay: string) => {
  if (parseInt(monthOrDay) < 10) {
    return `0${monthOrDay}`;
  } else {
    return monthOrDay;
  }
};
export const formatTime2 = (dateString: any) => {
  // console.log("in function date", dateString);
  // if (typeof dateString == "string") {
  //   dateString = Date.parse(dateString);
  // }
  console.log("from function", dateString);

  const date = new Date(dateString);
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMinute = new Date().getMinutes();
  const dayDiff = currentDay - new Date(date).getDate();
  let formattedTime = "";

  if (currentYear == new Date(date).getFullYear()) {
    if (currentMonth == new Date(date).getMonth()) {
      if (dayDiff == 0) {
        if (currentHour == new Date(date).getHours()) {
          if (currentMinute - new Date(date).getMinutes() < 10) {
            formattedTime = "Just Now";
          } else {
            formattedTime = `${
              currentMinute - new Date(date).getMinutes()
            } minutes ago`;
          }
        } else if (currentHour - new Date(date).getHours() == 1) {
          formattedTime = "1 Hour ago";
        } else if (currentHour - new Date(date).getHours() < 6) {
          formattedTime = `${
            currentHour - new Date(date).getHours()
          } hours ago`;
        } else {
          formattedTime = `Today at ${new Date(date).toLocaleTimeString()}`;
        }
      } else if (dayDiff == 1) {
        formattedTime = `Yesterday at ${new Date(date).toLocaleTimeString()}`;
      } else {
        formattedTime = `${dayDiff} days ago at ${new Date(
          date
        ).toLocaleTimeString()}`;
      }
    } else if (currentMonth - new Date(date).getMonth() == 1) {
      formattedTime = "1 month ago";
    } else {
      formattedTime = `${currentMonth - new Date(date).getMonth()} months ago`;
    }
  } else if (currentYear - new Date(date).getFullYear() == 1) {
    formattedTime = "1 year ago";
  } else {
    formattedTime = `${currentMonth - new Date(date).getFullYear()} years ago`;
  }

  return formattedTime;
};
