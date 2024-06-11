import { useDispatch, useSelector } from "react-redux";
import Title from "./Title";
import Field from "./Field";
import BirthdayField from "./BirthdayField";
import axios from "axios";
import { useState } from "react";
import ReactLoading from 'react-loading';





function Account(props) {
    const learnerData = useSelector(state => state.userData)
    const tutorData = useSelector(state => state.tutorData)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)


    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 
    
    const dispatch = useDispatch()


    const isVerified = firstSegment ==="learner"? learnerData.isVerified : tutorData.isVerified
    const bDay = firstSegment === "learner" ? learnerData.Birthday : tutorData.Birthday
    
    const handleVerifyEmail = async (e) => {
        e.preventDefault()
        try {
            let email = ''
            if(firstSegment === "learner") {
                email = learnerData.email
            }else {
                email = tutorData.email
            }
            setLoading(true)
            const response = await axios.post('https://onlinelearningplatform-d9w2.onrender.com/resend/verification_Link', {
                email: email,
                role : firstSegment ==="learner"? "Learner" : "Tutor",
                type:"Settings"
            })
            // Disable the button to prevent multiple clicks
            setDisabled(true)

            // Wait for 1 minute (60000 milliseconds) before enabling the button again
            setTimeout(() => {
                setDisabled(false)
            }, 60000);
            
            setLoading(false)
            console.log(response)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

     
    return (
        <div className="w-full overflow-y-auto flex flex-col m-auto space-y-7 h-[90%] px-2 sm:px-15 lg:px-28 py-7">
            <Title role={firstSegment} title="Account"></Title>
            <Field
             name="fName" 
             title="First Name" 
             field={firstSegment ==="learner"? learnerData.firstname : tutorData.firstname}></Field>
            <Field 
            name="lName" 
            title="Last Name" 
            field={firstSegment==="learner"? learnerData.lastname: tutorData.lastname}></Field>
            <form onSubmit={handleVerifyEmail} className={` ${isVerified? "opacity-70 cursor-not-allowed" :""} border-b px-2 hover:bg-lightg justify-between flex items-center border-lightg py-2`}>
                <span className="flex items-center">
                    <span className="text-black font-bold"> 
                        Email
                    </span>
                        {
                            !isVerified?
                            <div className="px-4 py-2 font-semibold rounded-lg text-errortext text-sm underline ">
                               ✗ Unverified
                            </div>
                            :
                           null
                        }
                </span>
                <div className="flex items-center space-x-2">
                    <span>
                        {
                            firstSegment==="learner"? learnerData.email: tutorData.email
                        }
                    </span>
                </div>
                {
                    !isVerified?
                    (
                        loading?
                        <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                        :
                        <button disabled={disabled} type="submit" className={`${disabled? "opacity-60" : "" } px-4 py-2 rounded-md bg-elements text-white`}> Verify email</button>
                    )
                    :
                    <div className="px-4 py-2 rounded-lg text-white bg-elements">
                        ✓ Verified
                    </div>
                }
            </form>
            <Field 
            name="Pword" 
            title="Password" 
            isVerified={isVerified}
            field="********"></Field>
            <Field
             name="MNumber" 
             title="Mobile Number" 
             field={firstSegment === "learner"? learnerData.tel : tutorData.tel}></Field>
            <BirthdayField value={bDay} role={firstSegment} name="Bday"></BirthdayField>
        </div>
    );
}

export default Account;