import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setError, setLastName } from "../../state/slices/tutorSlice";
import { setIsLoading } from "../../state/slices/tutorSlice";
import { useGoogleLogin } from '@react-oauth/google';
import {useNavigate} from 'react-router-dom'
import { setFirstName } from "../../state/slices/tutorSlice";

//tutor mail sign up
function MailSignup() {
    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    //handle sign up via google
    const handleSignUp = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                dispatch(setIsLoading(true))
                //send post request with google token in header
                const resp = await axios.post(
                    'https://onlinelearningplatform-d9w2.onrender.com/tutor/signupgoogle',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        }
                    }
                )
                console.log(resp);
                localStorage.clear();
                localStorage.setItem('refreshtoken', resp.data.refreshToken)
                localStorage.setItem('accesstoken', resp.data.accessToken)
                dispatch(setLastName(resp.data.lastname))
                dispatch(setFirstName(resp.data.firstname))
                navigate('/tutor/signup/personalization')
            }catch(err) {
                dispatch(setError(err.response.data.message))
                console.log(err)
            }finally{
                dispatch(setIsLoading(false))
            }
        },
        onError: (err) => {
            console.log(err);
            dispatch(setIsLoading(false))
            dispatch(setError("Service Unavailable"))
        }
      });
    
    return (
        <div onClick={handleSignUp} className="w-full cursor-pointer p-2 flex bg-white justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Continue with Google</span>
        </div> 
    );
}

export default MailSignup;