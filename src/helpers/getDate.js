
export const getDate = (date) => {
    const dateObj = new Date(date);
    const today = new Date();
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getYear();
    const dayT = today.getDate();
    const monthT = today.getMonth();
    const yearT = today.getYear();

    if (dayT===day && monthT===month && yearT===year) {
        const hour = dateObj.getHours();
        let hoursT = "";
        if (hour === 0) {
            const minutes = dateObj.getMinutes();
            hoursT = `${minutes}m`
        } else {
            hoursT = `${hour}h`
        }
        //console.log('enter here: ',hour);
        return hoursT;
    } else {
        const objMonth = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        }
        let dayTwo = day < 10 ? '0'+day : day;
        return `${objMonth[month]} ${dayTwo}`;
    }
}   