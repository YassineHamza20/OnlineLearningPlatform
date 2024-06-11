import Progress from './progress_bar'
import First from './first_step'
import Second from './second_step'
import Third from './third_step'
import {useSelector, useDispatch} from 'react-redux'
import {setSignUpStep, setIsLoading, setIsVerified, setVerificationLearner, resetUserData} from '../../state/slices/userSlice'
import { setError } from '../../state/slices/userSlice'
import axios from 'axios'
import axiosInstance from '../../interceptors/axiosInterceptor';
import {useNavigate} from 'react-router-dom'
import Loading from '../Global/Loading'
import {useEffect} from 'react'
import NextButton from './nextButton'
import BackButton from './backButton'
import VerifEmail from '../Global/VerifEmail'

export default function Card() { 
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //getting elements from redux store
    const userData = useSelector((state) => state.userData)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    //getting the url path
    const path = window.location.pathname;

    //steps
    const content = [
        userData.verificationPlaceholder? <VerifEmail role="Learner" user= {userData}></VerifEmail>:<First></First>, //showing the email sent ui after sign up
        <Second></Second>,
        <Third></Third>
    ]

    //responsible for navigating to different route
    const navigate = useNavigate()


    //handle regular Signup 
    const handleRegularSignup = async () => {
        try {
            dispatch(setIsLoading(true))
            const response = await axios.post('https://onlinelearningplatform-d9w2.onrender.com/regular_signup', {
                email: userData.email, 
                pword: userData.password,
                pfp: userData.pic
            })
            console.log(response);
            //showing the ui for the verification
            dispatch(setVerificationLearner(true))
        }catch(err) {
            dispatch(setError(err.response.data.message))
            console.log(err);
        }finally{
            dispatch(setIsLoading(false))
        }
    }

    //handle the second step updates in Database
    const handlePersonalize = async () => {
        try {
            dispatch(setIsLoading(true))
            const response = await axiosInstance.post('/personalize', 
            {
                language_proficiency: userData.proficiency,
                firstname: userData.firstname,
                lastname: userData.lastname
            }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            console.log(response);
            dispatch(setSignUpStep(step<2? step + 1: step))
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Handle 401 error (token expired or unauthorized)
                navigate('/learner/signin');
            } else {
                dispatch(setError(err.response.data.message))
                console.log(err);
            }
        }finally{
            dispatch(setIsLoading(false))
        }
    };

    //handle the third step
    const handleBegin = async () => {
        try {
            dispatch(setIsLoading(true))
            const response = await axiosInstance.post('/finalstep', 
            {
                learning_goals: userData.goals,
                interested_topics: userData.topics
            }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            console.log(response);
            dispatch(resetUserData())
            navigate('/learner/profile')
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Handle 401 error (token expired or unauthorized)
                navigate('/signin');
            } else {
                dispatch(setError(err.response.data.message))
                console.log(err);
            }
        }finally{
            dispatch(setIsLoading(false))
        }
    }
    

    //Next button logic moving forward through the steps
    const handleNext= (e) => {
        e.preventDefault()
        if(step === 0 ) {
            //if we're in the first step we make the signup with the inputs given by the user
            handleRegularSignup()

        }
        else if (step === 1) {
            handlePersonalize()
        }
        else if (step === 2) {
            handleBegin()
        }
    }

    //handle loading ui
    const handleLoading = () => {
        if(userData.isLoading)
            return <Loading></Loading>
        return content[step]
    }

   

    //controlling what to show based on the path
    useEffect(() => {
            if (path === '/learner/signup/personalize') {
                dispatch(setSignUpStep(1)); // Dispatch the action after the component has rendered
            }
        }, []); // Empty dependency array ensures the effect runs only once after the component mounts

    return(
        <form onSubmit={handleNext} className="bg-white shadow-lg px-10 py-4 w-[97%] h-[95%] sm:w-[80%] sm:h-[93%] md:w-[60%] md:h-[93%] lg:w-[60%] lg:h-[93%] xl:w-[60%] xl:h-[93%] space-y-4 rounded-3xl flex flex-col items-center">
            <Progress></Progress>
            <hr className="h-1 w-full"></hr>
            <div className={`flex flex-col w-full overflow-y-scroll scrollbar-hide h-full ${step === 0? "space-y-2": "space-y-4  "}`}>
            {   
                handleLoading()
            }
           </div>
            <div className={`flex ${step<2? "justify-end": "justify-between"} w-full flex-grow items-center`}>
                <BackButton></BackButton>
                {
                    !userData.verificationPlaceholder && !userData.isLoading? //if it's loading or we're in verification part, the button doesn't show up
                    <NextButton></NextButton>
                    :
                    null
                }
            </div>
        </form>
    );
}