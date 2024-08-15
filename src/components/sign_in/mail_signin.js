import { FcGoogle } from "react-icons/fc";
import { setLearnerError, setLoading, setTutorError } from "../../state/slices/loginSlice"
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFields } from "../../state/slices/loginSlice";
import axios from 'axios'


export default function MailSignIn() {
    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    const dispatch = useDispatch()

    const navigate = useNavigate()

    //handle sign in via google
    const handleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try{
                dispatch(setLoading(true))
                //send post request with google token in header
                const resp = await axios.post(
                    '${process.env.REACT_APP_BACKEND_URL}/GoogleLogin',
                    {
                        information: firstSegment //specifying if it's a tutor or a learner
                    },
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
                dispatch(resetFields())
                if(firstSegment === 'tutor'){
                    navigate('/tutor/profile')
                }else {
                    navigate('/learner/profile')
                }
            }catch(err) {
                const error = err.response.data.message? err.response.data.message : "Cannot Login Now!"
                dispatch(setLoading(false))
                if(firstSegment === 'tutor') {
                    dispatch(setTutorError(error))
                }else {
                    dispatch(setLearnerError(error))
                }
                console.log(err)
            }finally{
                //manage loading here
            }
        },
        onError: (err) => {
            const error = "Service Unavailable"
            console.log(err);
            if(firstSegment === 'tutor') {
                dispatch(setTutorError(error))
            }else {
                dispatch(setLearnerError(error))
            }
        }
      });
    return(
        <div onClick={handleLogin} className="w-full h-14 cursor-pointer p-2 flex justify-center hover:shadow items-center space-x-3 border border-[#E5E5E5] rounded-xl">
                <FcGoogle size="23" />
                <span className="font-semibold text-sm">Continue with Google</span>
        </div> 
    );

}