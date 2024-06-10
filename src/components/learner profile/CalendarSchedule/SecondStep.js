import { useSelector, useDispatch } from "react-redux"
import { setLessonDifficulty, setLessonTopic} from "../../../state/slices/Schedule"
import { MdNavigateBefore } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaBook } from "react-icons/fa";
import { IoMdFlame } from "react-icons/io";
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdNavigateNext } from "react-icons/md"
import { handleLessonDifficultyColor } from '../../Global/functions'
import { useLocation } from 'react-router-dom'
import TutorRow from "./TutorRow";
import { useEffect, useState } from "react";






function SecondStep(props) {

    const scheduleData = useSelector(state => state.scheduleData )
    const dispatch = useDispatch()
    const selectedTutorData = useSelector(state => state.userData.selectedTutor)
    const location = useLocation()
    const [tutorSpecialities, setTutorSpecialities] = useState([])



    const handleLessonTopicChange = (e) => {
        dispatch(setLessonTopic(e.target.value))
    }

    const handleLessonDifficultyChange = (e) => {
        dispatch(setLessonDifficulty(e.target.value))
    }


    const topics = [
      'Education',
      'It',
      'Advertising',
      'Agriculture',
      'Entrepreneurship',
      'Government',
      'Law',
      'Customer Support',
    ]

    const difficulty = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert'
    ]

      //incase where user is scheduling from tutor profile directly 
      useEffect(() => {
        if(selectedTutorData && location.pathname.startsWith('/learner/profile/Tutor/')) {
            // Merge the arrays
            const  combinedArray =[...JSON.parse(selectedTutorData.WorkExperience), ...JSON.parse(selectedTutorData.Education)]

            // Extract unique tags
            setTutorSpecialities([...new Set(combinedArray.map(obj => obj.tag))])
        }
    }, [selectedTutorData])
    

    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Schedule</span>
            </div>
            <div className="flex p-2 items-center justify-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <FaBook size="25" className={` ${scheduleData.lessonTopic? 'text-button': 'text-active'}`} />
                <span className="text-active">Choose lesson topic</span>
                <div className="flex-grow"></div>
                <select onChange={handleLessonTopicChange} value={scheduleData.lessonTopic} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Choose lesson topic</option>
                    {
                        location.pathname.startsWith('/learner/profile/Tutor/')?
                        //case of scheduling a lesson directly from tutor profile
                        tutorSpecialities.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                        :
                        //scheduling from general calendar
                        topics.map((topic, index) => (
                            <option key={index} value={topic}>{topic}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex p-2 items-center space-x-6 w-full">
                <IoMdFlame size="25" className={handleLessonDifficultyColor(scheduleData.lessonDifficulty, 'Schedule')}></IoMdFlame>
                <span className="text-active">Choose lesson difficulty</span>
                <div className="flex-grow"></div>
                <select onChange={handleLessonDifficultyChange} value={scheduleData.lessonDifficulty} className="border focus:outline-none border-elements z-50 px-2 active:outline-none py-1 rounded-md">
                    <option disabled value=''>Choose lesson difficulty</option>
                    { 
                    difficulty.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
            {
                location.pathname.startsWith('/learner/profile/Tutor/')?
                //case of scheduling a lesson directly from tutor profile
                <TutorRow></TutorRow>
                :
                //scheduling from general calendar
                <div onClick={props.moveForward} className={`flex p-2 ${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'hover:bg-lightg cursor-pointer': ''} rounded-md items-center  space-x-6`}> 
                    <FaChalkboardTeacher size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'} `}></FaChalkboardTeacher>
                    <span className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-active' : 'text-disabled'}`}>Select tutor</span>
                    <div className="flex-grow"></div>
                    <MdNavigateNext size="25" className={`${scheduleData.lessonTopic && scheduleData.lessonDifficulty? 'text-elements' : 'text-disabled'}`}></MdNavigateNext>
                </div>
            }
        </>
    );
}

export default SecondStep;