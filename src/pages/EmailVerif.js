import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import {NavLink, useParams} from 'react-router-dom'

function EmailVerif() {
    //getting the token from the url
    const param = useParams()
    
    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)//to assure that we got the answer from the socket before displaying the html code 
    const [role, setRole] = useState("")
    
    
    useEffect(()=> {
        const verifyEmail =  async () => {
            try {
                const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/user/verifEmail', {
                    type: "Signup"
                },{
                    headers: {
                        'Authorization': `Bearer ${param.token}`
                    }
                })
                setRole(response.data.role)
                //showing that the verification succeeded
                setIsValid(true)
                setIsLoading(false)
                //update localStorage with tokens
                localStorage.clear();
                localStorage.setItem('accesstoken', response.data.accessToken)
                localStorage.setItem('refreshtoken', response.data.refreshToken)
            }catch(err){
                console.log(err)
                //showing that the link is invalid
                setIsValid(false)
                setIsLoading(false)
            }
        }
        verifyEmail()
    }, [])
    

    
    return (
        <div className="flex w-screen h-screen flex-col justify-center items-center space-y-2">
            {
                !isLoading?
                (isValid? 
                <>
                    <img src="/verified.png" alt="verified" className="object-cover h-44 w-44"></img>
                    <span className="text-black text-2xl font-bold">Email verified successfully</span>
                    {
                        role && role ==="Learner" ? 
                        <NavLink to='/learner/signup/personalize' className="rounded-md py-2 px-4 bg-elements text-white font-bold">Proceed</NavLink>
                        : 
                        (
                            role && role === "Tutor" ?
                            <NavLink to='/tutor/signup/personalization' className="rounded-md py-2 px-4 bg-elements text-white font-bold">Proceed</NavLink>
                            :
                            null
                        )

                    }
                </>
                :
                <>
                    <img src="/erreur-404.png" alt="verified" className="object-cover h-80 w-80"></img>
                    <div className="flex items-center space-x-2"> 
                        <NavLink to='/tutor/signup' className="rounded-md py-2 px-4 bg-white border-button2 border text-button2">Sign up As Tutor</NavLink>
                        <NavLink to='/learner/signup' className="rounded-md py-2 px-4 bg-button2 text-white">Sign up As Learner</NavLink>
                    </div>

                </>)
                :
                ""
                
            }
                
        </div>
        
    );
}

export default EmailVerif;