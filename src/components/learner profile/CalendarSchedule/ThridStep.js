import { MdNavigateBefore } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCalendar } from "react-icons/io";
import { useState, useEffect } from 'react';
import axiosInstance from "../../../interceptors/axiosInterceptor";
import { setTutorSearchList } from "../../../state/slices/userSlice";
import Loading from "../../Global/Loading";
import TutorRow from "./TutorRow";
import { convertTime } from "../../Global/functions";

function ThirdStep(props) {   
    const dispatch = useDispatch();
    const learnerData = useSelector(state => state.userData);
    const scheduleData = useSelector(state => state.scheduleData);

    const [tutorName, setTutorName] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredList, setFilteredTutors] = useState(learnerData.tutorSearchList);

    //getting the tutors from database
    async function fetchData () {
        try {
            setLoading(true);
            const { formattedHours, formattedMinutes } = convertTime(scheduleData.time);
            
            // Construct the normal time string
            const normalTime = `${formattedHours}:${formattedMinutes}`;
            const selectedDate = `${scheduleData.selectedDate} ${normalTime}`;
    
            console.log("normalTime: ", normalTime);

            const response = await axiosInstance.post('https://onlinelearningplatform-d9w2.onrender.com/learner/getFreeTutors', {
                selectedDate: selectedDate,
                lessonLength: scheduleData.lessonLength,
                lessonTopic: scheduleData.lessonTopic, 
                Language: scheduleData.language
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            dispatch(setTutorSearchList(response.data.message));
            setFilteredTutors(response.data.message);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    //this function only fires when the list is empty 
    useEffect(() => {
        if (learnerData.tutorSearchList.length === 0) {
            fetchData();
        }
    }, []);

    //taking name input from user and comparing the input with the list elements in lower case to avoid case sensitivity 
    const handleSearching = (e) => {
        setTutorName(e.target.value);
        const inputName = e.target.value.toLowerCase();

        const filteredList = learnerData.tutorSearchList.filter(tutor => {
            if (tutor.firstname && tutor.lastname) {
                const fullName = `${tutor.firstname.toLowerCase()} ${tutor.lastname.toLowerCase()}`;
                return fullName.includes(inputName) || tutor.firstname.toLowerCase().includes(inputName) || tutor.lastname.toLowerCase().includes(inputName);
            } else {
                return true;
            }
        });
        setFilteredTutors(filteredList); 
        
        console.log("tutor: ", filteredList);
    }

    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <MdNavigateBefore onClick={props.moveBackwards} size="25" className="text-elements cursor-pointer absolute left-0"></MdNavigateBefore>
                <span className="block text-center text-black font-semibold text-lg">Select Tutor</span>
            </div>
            <div className="flex justify-center p-2 items-center space-x-6"> 
                <IoMdCalendar size="25" className="text-active"></IoMdCalendar>
                <span className="text-active">{props.selectedDate}</span>
            </div>
            {
                learnerData.tutorSearchList.length > 0 &&
                <input
                    type="search"
                    value={tutorName}
                    onChange={handleSearching}
                    placeholder="Search for tutor..."
                    className="w-full mb-5 px-4 py-2 border rounded-xl focus:outline-none focus:border-elements transition-colors duration-300"
                />
            }
            <div className={`${learnerData.tutorSearchList.length > 0 ? 'overflow-y-auto ' : ''} py-4 pr-5 w-full flex flex-col space-y-4`}>
                {
                    loading ?
                    <Loading /> :
                    (
                        filteredList.length > 0 ?
                        filteredList.map((tutor, index) => (
                            <TutorRow key={index} moveForward={props.moveForward} tutor={tutor} />
                        )) :
                        <img src="/No-Data.png" alt="no data" className="flex justify-center items-center w-80 h-80 object-cover" />
                    )
                }
            </div>
        </>
    );
}

export default ThirdStep;
