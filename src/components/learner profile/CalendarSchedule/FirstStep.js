
import { IoMdTime } from "react-icons/io"
import { IoIosTimer } from "react-icons/io"
import { IoMdSettings } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { setLanguage, setLessonLength, setTime } from "../../../state/slices/Schedule"
import {useDispatch, useSelector} from 'react-redux'
import { MdLanguage } from "react-icons/md";
import { convertTime, getMaxDurationIndex } from "../../Global/functions"
import { useLocation } from 'react-router-dom';




function FirstStep(props) {

    const location = useLocation()
    const selectedTutorData = useSelector(state => state.userData.selectedTutor)
    
    const duration = [
        '15 minutes',
        '30 minutes', 
        '45 minutes',
        '60 minutes'
    ]

    const languages = [
        "English", 
        "French",
        "Arabic"
    ]
    
    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()

    //handling the given time output from the user
    const handleTimeChange = (e) => {
        //set the time the the option selected by the user 
        dispatch(setTime(e.target.value))
        //clearing the lesson duration on every time change
        dispatch(setLessonLength(''))

    }

    const handleLessonLengthChange = (e) => {
        dispatch(setLessonLength(e.target.value))
    }
    
    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value))
    }

    
    //we show possbile duration based on picked time
    //we're assuring that the max end_time is 00 in the next day
    function renderOptions() {
        if(scheduleData.time && scheduleData.busyTimes) {

            //testing if the time is followed by a busy time or not
            //for example user picks 12:45 and 13:00 is taken
            //he can't pick 60 minutes, 45 minutes or 30 minutes, he can't only pick 15 minutes
            const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
            const conditionDate = new Date(props.selectedDate).toLocaleDateString('en-US', options)
            const month = conditionDate.split('/')[0]
            const day = conditionDate.split('/')[1]
            const year = conditionDate.split('/')[2]

            const currentDay = `${year}-${month}-${day}`

            //getting the times that are busy in the selected Date
            const filteredBusyDate = scheduleData.busyTimes.filter(time => time.interval_time_formatted.includes(currentDay))

            console.log(scheduleData.time);
            const {formattedHours, formattedMinutes} = convertTime(scheduleData.time)

            console.log(formattedHours, formattedMinutes);

            //converting the selected time to minutes
            const selectedTimeInMinutes = parseInt(formattedHours) * 60 + parseInt(formattedMinutes)
            console.log(selectedTimeInMinutes)

            //getting how many items of the duration list should be shown
            const maxDurationIndex = getMaxDurationIndex(selectedTimeInMinutes, filteredBusyDate, duration)

            console.log("maxDurationIndex: ", maxDurationIndex)

            
            if(maxDurationIndex === duration.length ) {
                // this indicates that if those times are the selected ones then we give limited options
                if (scheduleData.time === "11:45 PM") {
                    return duration.slice(0, 1).map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ));
                  } else if (scheduleData.time === "11:30 PM") {
                    return duration.slice(0, 2).map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ));
                  } else if (scheduleData.time === "11:15 PM") {
                    return duration.slice(0, 3).map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ));
                  } else {
                    return duration.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ));
                  }
            }else {
                //in other case show what
                return duration.slice(0, maxDurationIndex ).map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ));
            }



        }   
        

        

      }

    return (
        <>
            <span className="block text-center text-black font-semibold text-lg">Schedule a Lesson</span>
            <div className="flex p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <IoMdTime size="25" className={`${scheduleData.time? 'text-button': 'text-active'}`} />
                <span className="text-active">Select Time</span>
                <div className="flex-grow"></div>
                <select onChange={handleTimeChange} value={scheduleData.time} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select time</option>
                    {props.times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6"> 
                <IoIosTimer size="25" className={`${scheduleData.lessonLength? 'text-button': 'text-active'}`}></IoIosTimer>
                <span className="text-active">Select Lesson Length</span>
                <select onChange={handleLessonLengthChange} value={scheduleData.lessonLength} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select duration</option>
                    {
                        renderOptions()
                    }
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <MdLanguage size="25" className={`${scheduleData.language? 'text-button': 'text-active'}`} />
                <span className="text-active">Select Language</span>
                <div className="flex-grow"></div>
                <select onChange={handleLanguageChange} value={scheduleData.language} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Select Language</option>
                    {
                    location.pathname.startsWith('/learner/profile/Tutor/')?
                    JSON.parse(selectedTutorData.Languages).map((item, index) => (
                        <option key={index} value={item.language}>{item.language}</option>
                    ))
                    :
                    languages.map((language, index) => (
                        <option key={index} value={language}>{language}</option>
                    ))}
                </select>
            </div>
            <div onClick={props.moveForward} className={`flex p-2 ${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                <IoMdSettings size="25" className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-active' : 'text-disabled'} `}></IoMdSettings>
                <span className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-active' : 'text-disabled'}`}>Select preferences</span>
                <div className="flex-grow"></div>
                <MdNavigateNext size="25" className={`${scheduleData.time && scheduleData.lessonLength && scheduleData.language? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
            </div>
            </>
    );
}

export default FirstStep;