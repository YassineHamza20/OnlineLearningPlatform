const formatTime = (selectedDate, lessonLength) => {
    // Assuming selectedDate is in the format 'MM/DD/YYYY HH:mm'
    const dateParts = selectedDate.split(' ');
    const date = dateParts[0].split('/');
    const time = dateParts[1].split(':');

    const year = parseInt(date[2]);
    const month = parseInt(date[0]) - 1; // Month is 0-based in JavaScript Date
    const day = parseInt(date[1]);

    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);

    // Create Date object for the selected date and time
    const beginDate = new Date(year, month, day, hours, minutes);

    if (isNaN(beginDate.getTime())) {
        throw new Error('Invalid time value');
    }

    // Parse lessonLength assuming it is in the format 'XX minutes'
    const lessonDuration = parseInt(lessonLength.split(' ')[0]);
    const endDate = new Date(beginDate.getTime() + lessonDuration * 60000);

    // Format dates to 'YYYY-MM-DD HH:mm:ss'
    const formattedBeginDate = beginDate.toISOString().replace('T', ' ').substring(0, 19);
    const formattedEndDate = endDate.toISOString().replace('T', ' ').substring(0, 19);

    return { formattedBeginDate, formattedEndDate };
};

module.exports = {
    formatTime
};
