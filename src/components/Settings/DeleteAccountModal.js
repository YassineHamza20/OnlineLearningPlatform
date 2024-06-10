import {useEffect, useRef, useState} from 'react'
import axiosInstance from '../../interceptors/axiosInterceptor';
import ReactLoading from 'react-loading';
import { LogOut } from '../Global/functions';
import { resetUserData as resetTutor } from "../../state/slices/tutorSlice";
import {resetUserData as resetLearner} from '../../state/slices/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function DeleteAccountModal(props) {
    const modalRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    //when clicking outside of the modal we check if the list is saved or not, if it's saved w return the state of the final correct list else we reset the list
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          props.setVisibility(false)
        }
      };

    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);


      const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.post(`http://localhost:5000/${props.role}/DeleteAccount`,
            {}, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            }
            )
            LogOut()
            if(props.role === "tutor") {
                setTimeout(() => {
                    setLoading(false)
                    dispatch(resetTutor())
                    navigate(`/${props.role}/signin`)
                }, 1000)
            } else if (props.role === "learner") {
                setTimeout(() => {
                    setLoading(false)
                    dispatch(resetLearner())
                    navigate(`/${props.role}/signin`)
                }, 1000)
            }
            
        } catch (error) {
            console.log(error);
        }
      }
    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px] sm:backdrop-blur-[1px] z-50 flex justify-center items-center">
        <div ref={modalRef} className={`bg-backg w-[90%] px-5 py-3 md:w-[50%] lg:w-[30%] max-h-[80%] flex flex-col space-y-3 rounded-md `} >
            <div className="flex space-x-2 py-3 items-center">
                <span className="text-errortext font-bold text-lg w-full flex justify-center items-center"> Account Deletion Notice</span>
            </div>
            <span className="text-black">
                Upon deleting your account, you will permanently lose any subscriptions, purchase history, and all associated data. This action is irreversible, and your account cannot be restored. Please ensure you have saved any important information before proceeding.
            </span>
            {
                loading?
                <div className="flex w-full justify-center items-center">
                    <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                </div>

                :
                <div className="flex justify-center items-center space-x-3">
                    <button onClick={handleDelete} className="text-white px-4 py-2 hover:shadow-xl bg-errortext rounded-md">Delete</button>
                    <button onClick={() => props.setVisibility(false)} className="py-2 hover:shadow-xl px-4 text-white border bg-elements rounded-md">Cancel</button>
                </div>
            }
            
        </div>
    </div>
    );
}

export default DeleteAccountModal;