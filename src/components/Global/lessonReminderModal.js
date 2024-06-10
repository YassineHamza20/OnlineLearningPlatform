import { MdCancel } from "react-icons/md"
import { IoMdTime } from "react-icons/io"
import { IoMdCalendar } from "react-icons/io"
import { FaBook } from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { isGoogleProfilePicture, timeFormatter } from "./functions";
import { useEffect, useState } from "react";
import { fetchFile } from "./functions";
import { NavLink } from "react-router-dom";
import { GiRingingAlarm } from "react-icons/gi";
import { setNotificationModalVisibility, setVideoCallModalVisibility } from "../../state/slices/lessonsList";



function LessonReminderModal(props) {
    const lessonData = useSelector(state => state.lessonsList)
    //tutor profile picture
    const [imageData, setImageData] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        //fetching tutor profile picture from backend
        async function fetchData () {
            if(lessonData.currentDayLesson.pfp && lessonData.currentDayLesson.tutor_id ){
                let image = lessonData.currentDayLesson.pfp
                if(!isGoogleProfilePicture(image)){
                    fetchFile(lessonData.currentDayLesson.pfp, "images", "Tutor", lessonData.currentDayLesson.tutor_id)
                    .then(response => {
                        setImageData(response)
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }else {
                    setImageData(image)
                }

            }
        }
        fetchData()
    }, [lessonData.currentDayLesson])
    
    //getting date in the right format 
    const handleTimeFormat = () => {
        const date = new Date(lessonData.currentDayLesson.start_time);

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate
    }

    //hidding the modal
    const handleCloseModal = () => {
        if(props.type === "videoCall"){
            dispatch(setVideoCallModalVisibility(false))
        }else {
            dispatch(setNotificationModalVisibility(false))
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
            <div className={`bg-backg w-[90%] md:w-[50%] lg:w-[35%] xl:w-[35%] max-h-[80%] min-h-[50%] flex flex-col rounded-md `} >
                <div className="flex space-x-2 py-3 justify-between rounded-t-md px-3 items-center bg-lightg">
                    <div className="flex items-center space-x-2"> 
                    {
                        props.type==="videoCall"?
                        <>
                            <GiRingingAlarm size="25" className="text-black"></GiRingingAlarm>
                            <span className="text-black font-bold"> Lesson Reminder </span>      
                        </>
                        :
                        <>
                            <IoIosAlarm size="25" className="text-black"></IoIosAlarm>
                            <span className="text-black font-bold"> Lesson Reminder </span>      
                        </>
                    }
                    </div>
                    <MdCancel onClick={handleCloseModal} size="25" className="text-darkg transition-colors duration-300 cursor-pointer hover:text-errortext"></MdCancel>
                </div>
                <div className="px-14 py-7 flex flex-col space-y-5">
                    <div className="flex items-center space-x-2">
                        <img 
                            src={imageData}
                            alt="profilepicture" 
                            referrerPolicy="no-referrer"
                            className="cursor-pointer hidden lg:block rounded-full min-w-10 min-h-10 w-12 h-12 object-cover"
                        />
                        <div className="">{lessonData.currentDayLesson.firstname+ " "+ lessonData.currentDayLesson.lastname}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <IoMdCalendar size="32" className="text-black"></IoMdCalendar>
                        <div className="">{handleTimeFormat() + " at " + timeFormatter(lessonData.currentDayLesson.start_time)} </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <IoMdTime size="32" className="text-black"></IoMdTime>
                        <div className="">{lessonData.currentDayLesson.duration}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaBook size="28" className="text-black"></FaBook>
                        <div className="">{lessonData.currentDayLesson.lesson_topic} in {lessonData.currentDayLesson.language}</div>
                    </div>
                    <div onClick={handleCloseModal} className="flex justify-center items-center">
                        {
                            props.type ==="videoCall"?
                            <NavLink
                            target="_blank" 
                            rel="noopener noreferrer"
                            to={`/videoCall/${lessonData.currentDayLesson.uuid}?name=${props.fullName}`}
                            className="py-2 px-8 border border-button hover:bg-lightbutton hover:text-button transition-colors duration-300 rounded-sm bg-button text-white  text-sm">Start Call</NavLink>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonReminderModal;