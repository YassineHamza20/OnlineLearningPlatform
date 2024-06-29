import axiosInstance from "../../interceptors/axiosInterceptor"
import axios from 'axios';
//getting flag image with name of country
export const fetchCountryData = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      return null;
    }
  };
 // Replace `axiosInstance` with your axios configuration if necessary
const axiosInstance = axios.create({
    baseURL: 'https://onlinelearningplatform-d9w2.onrender.com'
});

// Getting files from backend
export const fetchFile = async (pfp, fileType, role, id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/api/uploads/${pfp}`, {
            params: {
                role: role,
                fileType: fileType,
                id: id
            },
            responseType: 'blob'
        })
        .then(response => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
};

export const LogOut = () => {
    localStorage.clear()
}

export const timeFormatter = (start_time) => {
    const startDate = new Date(start_time);
    const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour12: false });
    const [startHour, startMinute] = formattedStartTime.split(':');

    const formattedStartHourMinute = `${startHour}:${startMinute}`;
    

    return formattedStartHourMinute

}

export const handleLessonDifficultyColor = (test, type) => {
    if(type === 'Schedule') {
        switch (test) {
            case 'Beginner':
            return "text-elements"
            case 'Intermediate':
            return "text-yellow-500" 
            case 'Advanced':
            return "text-button"  
            case 'Expert':
            return "text-errortext" 
            default:
            return "text-active"
        }
    }else {
        switch (test) {
            case 'Beginner':
            return "text-elements border-elements bg-lightGreen"
            case 'Intermediate':
            return "text-yellow-500 bg-lightYellow border-yellow-500" 
            case 'Advanced':
            return "text-button border-button bg-lightbutton"  
            case 'Expert':
            return "bg-lightRed border-textRed text-textRed" 
            default:
            return "text-active"
        }
    }

}

export const convertTime = (scheduledTime) => {
     //converting the selected time to normal one 
    // Split the time string into hours, minutes, and AM/PM
    console.log("scheduleTime: ", scheduledTime);
    const [time, period] = scheduledTime.split(' ');
    const [hours, minutes] = time.split(':');

    // Convert hours to 24-hour format
    let hours24 = parseInt(hours, 10);
    if (period === 'PM' && hours24 < 12) {
        hours24 += 12;
    } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0;
    }

    // Format the hours and minutes
    const formattedHours = hours24.toString().padStart(2, '0')
    const formattedMinutes = minutes.padStart(2, '0')



    return {formattedHours, formattedMinutes}
}

export const dateExistenceTester = (list, hour, minute, busyDate) => {
    const formatHours = String(hour).padStart(2, '0')
    const formatMinutes = String(minute).padStart(2, '0')
    const usedTime= `${busyDate} ${formatHours}:${formatMinutes}`

    let test = false
    //we check if the time is used or not 
    if(list.length > 0 ){
        for(let i =0; i < list.length; i++){
            const item = list[i].interval_time_formatted
            if(item === usedTime) {
                test = true
                break
            }
        }
    }
    const hour12 = hour % 12 || 12;
    const hourStr = hour12.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    const amPm = hour < 12 ? 'AM' : 'PM'
    const result= `${hourStr}:${minuteStr} ${amPm}`
    

    return {
        test, result
    }
}

//testing if the picture is from google or not
export function isGoogleProfilePicture(pfpPath) {
    // Define a regular expression pattern to match Google profile picture URLs
    const googlePattern = /lh3\.googleusercontent\.com\/.*=s\d+-/;
    // Test if the pathname matches the Google pattern
    return googlePattern.test(pfpPath);
}

 //convert time string to minutes
export function getTimeInMinutes(timeString) {
    const timeParts = timeString.split(' ')[1].split(':');
    return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
}


// Helper function to get the maximum duration index based on the selected time and busy times
export function getMaxDurationIndex(selectedTimeInMinutes, busyTimes, duration) {
    // Filter out busy times that are after the selected time
    const overlappingTimes = busyTimes.filter(busyTime =>
      getTimeInMinutes(busyTime.interval_time_formatted) > selectedTimeInMinutes
    );
  
    // Determine the maximum duration index based on the filtered busy times
    let maxDurationIndex = duration.length
    for (let i = 0; i < overlappingTimes.length; i++) {
      const busyTimeInMinutes = getTimeInMinutes(overlappingTimes[i].interval_time_formatted);
      const diffInMinutes = busyTimeInMinutes - selectedTimeInMinutes;
  
      if (diffInMinutes <= 60) {
          maxDurationIndex = Math.min(maxDurationIndex, Math.floor(diffInMinutes / 15));
          console.log("math: ", maxDurationIndex);
      }
    }
  
    return maxDurationIndex;
  }


  //compares two arrays ignoring order
  export const arraysEqualUnordered = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    console.log('sortedArr1: ', sortedArr1, "sortedArr2: ", sortedArr2);
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) return false;
    }
    return true;
};


//compares two array of objects ignoring order 

export function compareLanguageLists(list1, list2) {
    if (list1.length !== list2.length) {
        return false;
    }

    return list1.every(item1 =>
        list2.some(item2 => item1.language === item2.language)
    ) && list2.every(item2 =>
        list1.some(item1 => item2.language === item1.language)
    );
}
