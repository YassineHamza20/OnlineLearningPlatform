import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import PhoneNumberInput from "./PhoneNumberInput"
import axiosInstance from '../../interceptors/axiosInterceptor'
import { useDispatch } from "react-redux";
import {
    setFirstName as setFirstNameLearner,
    setLastName as setLastNameLearner,
    setTel as setPhone,
} from '../../state/slices/userSlice'

import {
    setLastName,
    setFirstName, 
    setTel
} from '../../state/slices/tutorSlice'

function Field(props) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(() => (props.title === "Password" ? "" : props.field))
    const [passwordEditable, setPasswordEditable] = useState(props.isVerified)
    const dispatch = useDispatch()

    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    // Get the value of the first segment
    const firstSegment = segments[1]; 

    //trigger edit mode
    const handleClick = () => {
        if(!editing ){
            if(!(props.title==="Password" && !passwordEditable)){
                console.log("value: ");
                if(props.title === "Password"){
                    setValue('')
                }
                setEditing(true)
            }
        }
    }

    const modifyCall = async () => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`${process.env.REACT_APP_BACKEND_URL}/${firstSegment}/Update`, {
                type: props.name,
                newParameter: value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((response) => {
                
                console.log(response.data.message);

                resolve('updated')
            })
            .catch((err) => {
                reject('error')
                console.log(err);
            })
        })
    }

    //make api call to save modifications
    const handleSave = async (e) => {
        e.preventDefault()
        console.log("submiting");
        if(editing) {//if he's in editing mode
            if(!value){
                setValue(props.field)
            }else if(value !==props.field) {//if the input changed we make the api call else we just leave the edit mode
                try {
                    await modifyCall()//saving the value in the DB
                    switch (props.title){
                        case "First Name":
                            if(firstSegment === "learner"){
                                dispatch(setFirstNameLearner(value))
                            }else {
                                dispatch(setFirstName(value))
                            }
                            break
                        case "Last Name":
                            if(firstSegment === "learner"){
                                dispatch(setLastNameLearner(value))
                            }else {
                                dispatch(setLastName(value))
                            }
                            break
                        case "Mobile Number":
                            if(firstSegment === "learner") {
                                dispatch(setPhone(value))
                            }else {
                                dispatch(setTel(value))
                            }
                            break
                    }

                }catch(err) {
                    console.log(err);
                }
                //we save the input in redux store if it's not the password
                //UI update based on which field is updated
            }
            setEditing(false)
        }
    }

    
    const handleInput =() => {
        if(props.title ==="Mobile Number") {
            return <PhoneNumberInput 
             value={value}
             onChange={setValue}
             save={handleSave}></PhoneNumberInput>
        }else if(props.title === "Password") {
            return <input
            className={`"text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300`}
            type="password"
            minLength="8"
            disabled={!passwordEditable}
            maxLength="30"
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            pattern="^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]+$" // assuring the password contains at least one uppercase letter and one digit
            title={`${value? `Contains at least 8 characters (currently at ${value} characters), `:""}Contains at least an UpperCase letter and a digit`}
            placeholder= {props.title}
            />
        }else {
            return <input
            minLength="3"
            maxLength="30"
            className="text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
            type="text"
            required
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            placeholder={props.title}
            />
        }
                            
    }

    
     useEffect(() => {
        if(props.field) {
            setValue(props.field)
        }
     }, [props.field])

     useEffect(() => {
        if(!props.isVerified) {
            setPasswordEditable(false)
        }else {
            setPasswordEditable(true)
        }
     }, [props.isVerified])

    return (
        <form onSubmit={handleSave} onClick={handleClick} className={` ${!passwordEditable && props.title==="Password"? "cursor-not-allowed opacity-70" : "cursor-pointer"} border-b px-2 hover:bg-lightg justify-between items-center flex border-lightg py-2`}>
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                    <span className=""> {props.field}</span>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex items-center w-[50%] space-x-3 ">
                        {
                            handleInput()
                            
                        }
                        <button type="submit" className="px-4 py-2 rounded-md bg-elements text-white"> Save</button>
                    </div>
                </> 
            }
            
        </form>
    );
}

export default Field;