const formatTime = (selectedDate, lessonLength) => {
    const dateParts = selectedDate.split(' ');
    const date = dateParts[0].split('-'); // Assuming 'YYYY-MM-DD' format
    const time = dateParts[1].split(':'); // Assuming 'HH:MM:SS' format

    const year = parseInt(date[0]);
    const month = parseInt(date[1]) - 1; // Month is 0-based in JavaScript Date
    const day = parseInt(date[2]);

    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);

    // Create Date object for the selected date and time
    const beginDate = new Date(Date.UTC(year, month, day, hours, minutes));

    // Calculate end date by adding lesson length (in minutes)
    const endDate = new Date(beginDate.getTime() + lessonLength * 60000);

    // Format dates to 'YYYY-MM-DD HH:MM:SS'
    const formattedBeginDate = beginDate.toISOString().replace('T', ' ').substring(0, 19);
    const formattedEndDate = endDate.toISOString().replace('T', ' ').substring(0, 19);

    return { formattedBeginDate, formattedEndDate };
};

module.exports = {
    formatTime
};
