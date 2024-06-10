import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./logo_welcome_text";
import axios from 'axios'
import Loading from "../Global/Loading";

function ForgotPasswordContent(props) {

    //knowing whether it's a tutor or learner signing up
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/')

    // Get the value of the first segment
    const firstSegment = segments[1]

    const [email, setEmail]= useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    //handling the reset call to backend server 
    const handleReset = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:5000/forgotpassword', {
                role: firstSegment,
                email: email,
            })
            console.log(response)
            setEmailSent(true)
            setIsLoading(false)
        }catch(err) {
            console.log(err)
            setIsLoading(false)
        }
    }
    
    //handling the email input from the user
    const handleEmailChange =(e) => {
        setEmail(e.target.value)
    }

    console.log(email);
    return (
        <div className="bg-backg w-screen h-screen flex justify-center items-center overflow-y-auto py-7">
            <form onSubmit={handleReset} className={`bg-white m-auto ${isLoading? "min-h-[90%]": ""} relative rounded-3xl shadow-lg px-6 py-2 flex flex-col space-y-7 w-[97%] md:w-[30%] lg:w-[25%]`}>
                <Logo></Logo>
                    <img src="/forgotpword.png" alt="forgotpassword" className="w-24 h-24 self-center object-cover"></img>
                    <div className="flex flex-col space-y-1 justify-center w-full items-center">
                        <span className="text-xl font-bold self-center">Trouble Logging In?</span>
                        <span className="text-sm text-center self-center">Enter your email address below, if we have it on file, we will send you a reset email.</span>
                    </div>
                    {
                        isLoading?
                        <Loading></Loading>
                        :
                        <>
                            <div className="w-full">
                            <label className="block text-[#000] text-sm font-semibold mb-2">Email</label>
                            <input
                                className="shadow mb-2 text-sm appearance-none border rounded-lg w-full h-10 py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                                type="email"
                                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="Email"
                            />
                            {
                                emailSent?
                                <span className={`text-elements text-sm`}> Email Sent Successfully !</span>
                                :
                                null
                            }
                        </div>
                        <div className="flex space-x-3 self-center">
                                <button type="submit" className={`bg-button border border-button flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-white hover:shadow`}>Reset</button>
                                <NavLink to={`/${firstSegment}/signup`} className={`bg-backg  border border-button flex justify-center items-center text-center font-semibold px-4 py-2 rounded-full text-button hover:shadow`}>Signup</NavLink>
                        </div>
                        <div className="text-center">
                            <p>Return to <NavLink to={`/${firstSegment}/signin`} className="text-blue-500 underline">Login</NavLink></p>
                        </div>
                    </>
                    }
            </form>
        </div>
    );
}

export default ForgotPasswordContent;