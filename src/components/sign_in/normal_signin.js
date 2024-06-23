import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {setEmail, setPassword, setRecaptchaToken} from '../../state/slices/loginSlice'
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate, NavLink} from 'react-router-dom';


export default function Normal({recaptchaRef}) {
    const loginData = useSelector(state => state.loginData)

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 
    

    //handling the email field when typing
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    };
    
    //handling the password field when typing
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    };

    const handleRecaptchaChange = (value) => {
        try {
            dispatch(setRecaptchaToken(value));
        } catch (error) {
            console.error("Error setting reCAPTCHA token:", error);
            // Handle the error accordingly
        }
    }
    
    const handleSignUp = (e) => {
        e.preventDefault()
        navigate(`/${firstSegment}/signup`)
    }

    return(
        
        <div className="w-full flex flex-col space-y-5 items-center">
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                <input
                    className="shadow text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                    type="email"
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    value={loginData.email}
                    required
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
            </div>
            <div className="w-full">
                <label className="block text-[#000] text-sm font-semibold mb-2">Password</label>
                <input
                    className="shadow text-sm rounded-lg appearance-none border w-full  h-10 py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                    type="password"
                    value={loginData.password}
                    required
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
            </div>
            <div className="m-auto w-full scale-110 md:scale-x-[.60] md:scale-y-[.90] lg:scale-x-[.85] xl:scale-95 transform origin-top-left" >
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Ld0tv8pAAAAAEjYmyPqn5V_T_PW67wljx2jH-P-"
                    onChange={handleRecaptchaChange}
                />
            </div>
            
            <div className="mb-4 text-sm">
                <NavLink to={`/${firstSegment}/signin/forgotpassword`}  className="text-blue-500 underline">Forgot your password?</NavLink>
            </div>
            {/* && loginData.recaptchaToken */}
            {/* && loginData.recaptchaToken */}
            <button 
            disabled={!(loginData.email && loginData.password )} 
            type="submit" 
            className={`w-full ${loginData.email && loginData.password ? 'hover:bg-orange-600 opacity-100': 'opacity-60'} bg-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                Sign In
            </button>
            <div className="mt-4 text-sm">
                <p>Don't have an account? <button onClick={handleSignUp} className="text-blue-500 underline">Sign up</button></p>
            </div>
        </div>
        
    );
}
