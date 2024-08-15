import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import {setSignUpStep, setIsLoading, setFirstName, setLastName} from '../../state/slices/userSlice'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { setError } from "../../state/slices/userSlice";

//learner mail sign up
export default function Mail() {
    //step index
    const step = useSelector((state) => state.userData.signupStep)

    //initializing the tool to change the user data on the redux store
    const dispatch = useDispatch()
    
    //handle sign up via google
    const handleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                dispatch(setIsLoading(true))
                //send post request with google token in header
                const resp = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/googlesignup`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        }
                    }
                )
                localStorage.clear();
                localStorage.setItem('refreshtoken', resp.data.refreshToken)
                localStorage.setItem('accesstoken', resp.data.accessToken)
                dispatch(setFirstName(resp.data.firstname))
                dispatch(setLastName(resp.data.lastname))
                dispatch(setSignUpStep(step<2? step + 1: step))
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
    return(
        <div onClick={handleLogin} className="w-full cursor-pointer p-2 flex justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Continue with Google</span>
        </div> 
    );

}