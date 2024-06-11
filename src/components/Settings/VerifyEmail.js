import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"


function VerifyEmail(props) {
     //getting the token from the url
     const param = useParams()

    const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(true)//to assure that we got the answer from the socket before displaying the html code 
    const [role, setRole] = useState("")
    
    
    useEffect(()=> {
        const verifyEmail =  async () => {
            try {
                const response = await axios.post('https://onlinelearningplatform-d9w2.onrender.com/user/verifEmail', {
                    type : 'Settings'
                },{
                    headers: {
                        'Authorization': `Bearer ${param.token}`
                    }
                })
                setRole(response.data.role)
                //showing that the verification succeeded
                setIsValid(true)
                setIsLoading(false)
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
        <div className="flex flex-col space-y-3 justify-center h-screen w-screen items-center">
             {
                !isLoading?
                (isValid? 
                <>
                    <img src="/verifiedD.png"  className=" w-96 object-cover  h-96" ></img>
                    <span className="text-black text-2xl font-bold">Email verified successfully</span>
                    {
                        role && role ==="Learner" ? 
                        <NavLink to="/learner/profile/Settings/account" className=" px-4 py-2 rounded-lg bg-elements text-white cursor-pointer"> Go back to Settings</NavLink>
                        : 
                        (
                            role && role === "Tutor" ?
                            <div className=" px-4 py-2 rounded-lg bg-elements text-white cursor-pointer"> Go back to Settings</div>
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

export default VerifyEmail;