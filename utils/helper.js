// Function to get timestamp for the start of the current day
function getStartOfDayTimestamp() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    return today.getTime();
}

// Function to check if a given timestamp is within the current day
function isTimestampInToday(timestamp) {
    const startOfDayTimestamp = getStartOfDayTimestamp();
    const endOfDayTimestamp = startOfDayTimestamp + (24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return timestamp >= startOfDayTimestamp && timestamp < endOfDayTimestamp;
}

function convertTimeStamp(timestamp) {
    // Create a new Date object with the provided timestamp
    const date = new Date(timestamp);
    // Format the date to the desired format (YYYY-MM-DDTHH:mm)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate
}

function dateToTimeStamp(dateString) {
    // Parse the date string to create a Date object
    const dateObject = new Date(dateString);

    // Get the timestamp in milliseconds
    const timestamp = dateObject.getTime();

    console.log(timestamp);

    
}
module.exports = {isTimestampInToday, convertTimeStamp}