import StepBar from "../../components/tutor_sign_up/StepBar"
import FirstPhase from "../../components/tutor_sign_up/FirstPhase";
import SecondPhase from "../../components/tutor_sign_up/SecondPhase";
import ThirdPhase from "../../components/tutor_sign_up/ThirdPhase";
import FourthPhase from "../../components/tutor_sign_up/FourthPhase";
import {setSteps} from '../../state/slices/tutorSlice'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../state/slices/tutorSlice"
import Errorpop from "../../components/Global/Error_popup"
import {useNavigate} from 'react-router-dom'
import axiosInstance from "../../interceptors/axiosInterceptor";
import { setIsLoading, resetUserData } from "../../state/slices/tutorSlice";
import { resetLists } from "../../state/slices/listSlice";
import {useState} from 'react'

function AccountPersonalization() {
    const dispatch = useDispatch()

    const tutorData = useSelector(state=> state.tutorData)
    const listData = useSelector(state => state.listData)

    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate()

    //steps
    const content = [
        <FirstPhase></FirstPhase>, //Welcome page
        <SecondPhase></SecondPhase>, //Intro
        <ThirdPhase></ThirdPhase>, //Profile
        <FourthPhase></FourthPhase>, //Wifi test
    ]
    

    const handleNextButton = async (e) => {
        e.preventDefault();
        //at the end of the form, send the data to the server to save it in the DB
        if (tutorData.steps === 3) {
            dispatch(setIsLoading(true))
            setIsClicked(true)
            const formData = new FormData();
            formData.append('userFiles', tutorData.serverImage);
            formData.append('userFiles', tutorData.introductionVideo);
            
            // Append JSON data to FormData
            formData.append('Country', tutorData.Country);
            formData.append('description', tutorData.description);
            formData.append('TeachingStyle', tutorData.TeachingStyle);
            formData.append('AboutMe', tutorData.AboutMe);
            formData.append('languages', JSON.stringify(tutorData.languages));
            formData.append('workExperience', JSON.stringify(tutorData.workExperience));
            formData.append('education', JSON.stringify(tutorData.education));
            formData.append('firstname', tutorData.firstname)
            formData.append('lastname', tutorData.lastname)


            axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/tutor/personalization', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            })
            .then((response) => {
                console.log(response)
                //clearing state at the end of sign up process
                dispatch(resetUserData())
                dispatch(resetLists())
                navigate('/tutor/profile')
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
        }else {
            dispatch(setSteps(tutorData.steps <= 2 ? tutorData.steps + 1 : tutorData.steps));
        }
    };    

    const handleBackButton = () => {
        dispatch(setSteps(tutorData.steps>0? tutorData.steps-1 : tutorData.steps))
    }

    //this is the condition that should be true in order to disable the next button in the welcome phase
    const welcomeDisabledCondition = !tutorData.Country

    //this is the condition that should be true in order to disable the next button in the intro phase
    const introDisabledCondition = !tutorData.serverImage || !tutorData.displayableImage || !tutorData.introductionVideo || !tutorData.description || !tutorData.firstname || !tutorData.lastname

    //this is the condition that should be true in order to disable the next button in the Profile phase
    const profileDisabledCondition = !tutorData.TeachingStyle || !tutorData.AboutMe || !listData.listOfLanguagesSaved || !listData.listOfWorkExperienceSaved || !listData.listOfEducationSaved

    //this is the condition that should be true in order to disable the next button in the wifi test phase
    const wifiTestDisabledCondition = !tutorData.wifiQuality || isClicked

    const handleDisabled = () => {
        let conditionComponent;
        switch(tutorData.steps) {
            case 1:
                conditionComponent = introDisabledCondition;
                break;
            case 2:
                conditionComponent = profileDisabledCondition;
                break;
            case 3:
                conditionComponent = wifiTestDisabledCondition;
                break;
            default:
                conditionComponent = welcomeDisabledCondition;
        }

        return conditionComponent;

    }

    console.log("introDisabledCondition: ", introDisabledCondition);
    return (
        <form onSubmit={handleNextButton} className="h-screen relative w-screen flex flex-col bg-backg">
            <StepBar></StepBar>
            {
                content[tutorData.steps]
            }
            <div className="flex justify-between px-10 h-[10%] items-center w-full py-5">
                <button onClick={handleBackButton} type="button" className={`text-button bg-lightbutton border-button  border space-x-2 sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 flex justify-center items-center sm:w-[15%] md:w-[15%] lg:w-[10%] xl:w-[10%] w-[20%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full cursor-pointer hover:shadow`}>
                    <GrFormPreviousLink  size="25"></GrFormPreviousLink>
                    <span className="text-base hidden sm:block md:block lg:block xl:block">Back</span>
                </button>
                <button disabled={handleDisabled()} type="submit" className={`bg-button ${(tutorData.steps===0 && welcomeDisabledCondition) || (introDisabledCondition && tutorData.steps === 1) || (profileDisabledCondition && tutorData.steps === 2) || (tutorData.steps === 3 && wifiTestDisabledCondition)? 'opacity-60' :'hover:shadow'} sm:space-x-2 md:space-x-2 lg:space-x-2 xl:space-x-2 border border-button flex justify-center items-center w-[20%] sm:w-[15%] md:w-[15%] lg:w-[10%] xl:w-[10%] self-end h-10 text-center font-semibold text-lg px-4 py-2 rounded-full text-white`}>
                    <span className="text-base hidden sm:block md:block lg:block xl:block">Next</span>
                    <GrFormNextLink size="25"></GrFormNextLink>
                </button>
            </div>
            <Errorpop error={tutorData.error} setError={setError}></Errorpop>
        </form>
    );
}

export default AccountPersonalization;