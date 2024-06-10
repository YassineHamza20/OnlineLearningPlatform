
const formatTime = (selectedDate, lessonLength) => {
    // Extracting the date, hours, and minutes from the request's data
    const date = selectedDate.split(' ')[0]
    const month = date.split('/')[0]
    const day = date.split('/')[1]
    const year = date.split('/')[2]
    const time = selectedDate.split(' ')[1];
    const [hours, minutes] = time.split(':').map(Number);

    const lessonDuration = parseInt(lessonLength.split(' ')[0]);

    // Calculate adjusted hours and minutes
    let adjustedHours = hours + Math.floor((minutes + lessonDuration) / 60);
    let adjustedMinutes = (minutes + lessonDuration) % 60;

    // Adjust date if necessary
    let endDate = new Date(Date.UTC(date.split('/')[2], date.split('/')[0] - 1, date.split('/')[1], adjustedHours, adjustedMinutes));

    // Format the adjusted enddate to "YYYY-MM-DD HH:MM:SS" format for MySQL
    const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

    // Format the adjusted startdate to "YYYY-MM-DD HH:MM:SS" format for MySQL
    const formattedBeginDate = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+"00"

    return {formattedBeginDate, formattedEndDate}
}

module.exports = {
    formatTime
}