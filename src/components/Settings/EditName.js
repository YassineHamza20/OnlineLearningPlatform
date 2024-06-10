import { useSelector } from "react-redux";
import EditIcon from "./EditIcon";
import { useEffect, useState } from "react";


function EditName(props) {
    const learnerData = useSelector(state => state.userData);
    const tutorData = useSelector(state => state.tutorData);

    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    //setting the data initially to the current first name and last name of the user
    useEffect(() => {
        if (props.role === "learner") {
            setFirstName(learnerData.firstname || '');
            setLastName(learnerData.lastname || '');
        } else {
            setFirstName(tutorData.firstname || '');
            setLastName(tutorData.lastname || '');
        }
    }, [props.role, learnerData, tutorData]);
    
    const handleEditing = (e) => {
        e.preventDefault()
        if(editing) {
            //when submiting
            console.log("submiting")

            setEditing(false)
        }else {
            //when trying to edit
            console.log("Editing");
            setEditing(true)
        }
    }
    
    /*
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }*/
    
/*    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }*/
   
    return (
        <div className="flex flex-col items-center sm:items-start space-y-2">
            <form /*onSubmit={handleEditing}*/ className="flex justify-center items-center gap-3">
                {
                    /*
                    editing?
                    
                    <>
                    <input
                        minLength="3"
                        maxLength="30"
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="text"
                        required
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                    <input
                        minLength="3"
                        maxLength="30"
                        className="shadow text-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                        type="text"
                        required
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                    </>
                    :
                    */  
                    <span className="text-xl">
                        {
                            props.role === "learner"?
                            learnerData.firstname + " "+ learnerData.lastname
                            :
                            tutorData.firstname + " "+ tutorData.lastname

                        }
                    </span>
                }
                {
                    /*
                    !editing?
                    <div onClick={handleEditing}>
                        <EditIcon></EditIcon>
                    </div>
                    :
                    <button type="submit" className="px-4 py-2 bg-elements rounded-md cursor-pointer text-white ">Confirm</button>
                    */
                }
            </form>
            <span className="text-darkg">
                 Account ID: 
                 {
                    props.role === "learner"?
                    " "+learnerData.uuid
                    :
                    " "+tutorData.uuid
                 }
                 </span>
        </div>
    );
}

export default EditName;