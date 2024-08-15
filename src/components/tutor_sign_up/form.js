import Orline from "../Global/Or_line";
import MailSignup from "./mailSignup";
import Title from "./title";
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux";
import { setError, setIsLoading, setIsVerified, setVerificationTutor} from '../../state/slices/tutorSlice'
import Loading from '../Global/Loading'
import axios from "axios";
import io from 'socket.io-client'
import {useRef} from 'react'
import TutorFields from './fields'
import SignUpButton from "./SignUpButton";
import VerifEmail from "../Global/VerifEmail";
import { useNavigate } from "react-router-dom";


export default function Form() {
    //getting tutor Data from store 
    const tutorData = useSelector(state => state.tutorData)

    //initializing the tool to change the tutor data on the redux store
    const dispatch = useDispatch()


    const navigate = useNavigate()



    //sign up 
    const handleRegularSignup = async (e) => {
        e.preventDefault()
        try {
            dispatch(setIsLoading(true))
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/regsignup`, {
                email: tutorData.email, 
                pword: tutorData.password
            })
            console.log(response)
            dispatch(setVerificationTutor(true))
            
        }catch(err) {
            dispatch(setError(err.response.data.message))
            console.log(err);
        }finally{
            dispatch(setIsLoading(false))
        }
    }


    const handleLoginRoute = () => {
        navigate('/tutor/signin')
    }

    return (
        <form onSubmit={handleRegularSignup} className="h-full flex flex-col justify-center space-y-4 items-center w-full sm:w-[50%] md:w-[50%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] px-10">
            {
                tutorData.isLoading? 
                <Loading></Loading>
                :
                    tutorData.verificationPlaceholder?
                    <VerifEmail role="Tutor" user= {tutorData}></VerifEmail>
                    :
                    <>
                        <Title></Title> 
                        <MailSignup></MailSignup>
                        <Orline width="10%"></Orline>
                        <TutorFields></TutorFields>
                        <SignUpButton></SignUpButton>
                        <span onClick={handleLoginRoute} className="text-darkg text-base">Already have an account? <span className="cursor-pointer text-button"> Log in</span></span>
                    </>

            }
        </form >
    );
    
}

