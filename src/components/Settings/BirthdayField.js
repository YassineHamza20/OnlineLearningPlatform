import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { setBirthday as setBday} from "../../state/slices/userSlice";
import { setBirthday } from "../../state/slices/tutorSlice";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useDispatch } from "react-redux";



function BirthdayField(props) {
    const [editing, setEditing] = useState(false)

    const [value, setValue] = useState(props.value)

    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');

    const dispatch = useDispatch()



    const modifyCall = async () => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${props.role}/Update`, {
                type: "Bday",
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
    
    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }


    const handleSave = async (e) => {
        e.preventDefault()
        if(editing) {
            if(value===props.value) {
                setValue()
            }
            else if(value){
                try {
                    await modifyCall()
                    if(props.role === "learner"){
                        dispatch(setBday(value))
                    }else {
                        dispatch(setBirthday(value))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            setEditing(false)
        }
    }

    const handleBirthdayChange = (e) => {
        setValue(e.target.value)
    }

    // defininig the min and max values from the date, it should be later than 150 years from now
    //and it should not max 5 earlier or more
    useEffect(() => {
        const today = new Date();
        const maxDate = today.toISOString(today.setFullYear(today.getFullYear() - 5)).split('T')[0];
        
        const minDate = new Date(today.setFullYear(today.getFullYear() - 150)).toISOString().split('T')[0];
        
        setMaxDate(maxDate);
        setMinDate(minDate);
    }, []);
    

    useEffect(() => {
        if(props.value){
            console.log("props.value:", props.value);
            const date = new Date(props.value);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const birthd= `${year}-${month}-${day}`;
            console.log("birthdayddd: ", birthd);
            setValue(birthd)
        }
    }, [props.value])


    return (
        <form onSubmit={handleSave} onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between items-center flex border-lightg py-2">
            <span className="text-black w-40 font-bold">
                Birthday
            </span>
            {
                !editing?
                <>
                    <span className=""> {value}</span>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex items-center w-[50%] space-x-3 ">
                        <input
                            className=" cursor-text text-sm appearance-none border border-darkg rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-button transition-colors duration-300"
                            type="date"
                            required
                            max={maxDate}
                            min={minDate}
                            value={value}
                            onChange={handleBirthdayChange}
                            
                        />
                        <button type="submit" className="px-4 py-2 rounded-md bg-elements text-white"> Save</button>
                    </div>
                </> 
            }
        </form>
    );
}

export default BirthdayField;