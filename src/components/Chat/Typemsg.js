import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { appendMessage } from "../../state/slices/chatSlice"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'



export default function Voicemsg() {
  const dispatch = useDispatch()
  const param = useParams()
  const [text, setText] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const path = window.location.pathname;
  const learnerData  = useSelector(state => state.userData)
  const tutorData = useSelector(state => state.tutorData)
  const pickerRef = useRef(null);


  // Split the path by "/"
  const segments = path.split('/');

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
    const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_URL}/${segments[1]}/saveMessages`, {
    id: param.uuid,
    msg: text
    })
    console.log(response.data)
    const TextId = response.data.messageUuid
    const friendUuid = param.uuid
    const Sender = segments[1] ==="learner"? "Learner" : "Tutor" 
    console.log("friends IDIDID", friendUuid)
    const message = text
    //generating current date object
    const currentDate = new Date();

    // Extract individual components of the date and time
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const MessageTime= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` 
    const myId = segments[1] === "learner" ? learnerData.id : tutorData.id
    const data = {
      TextId: TextId,
      friendUuid: friendUuid,
      Sender: Sender,
      message: message,
      MessageTime: MessageTime,
      myId: myId,
      pfp: response.data.pfp,
      lastname: segments[1] === "learner" ? learnerData.lastname : tutorData.lastname, 
      firstname: segments[1] === "learner" ? learnerData.firstname : tutorData.firstname,
      otherUuid: segments[1] === "learner" ? learnerData.uuid : tutorData.uuid 
    } 
    const socket = io('${process.env.REACT_APP_BACKEND_URL}/', {
            auth: {
                token: localStorage.getItem('accesstoken')
            }
            });
            dispatch(appendMessage(
              {TextID : TextId, 
                id: response.data.id,
                IdLearner: segments[1]==="learner"? myId: response.data.id,
                IdTutor: segments[1]==="Tutor"? myId: response.data.id,
                message: message,
                MessageTime: MessageTime,
                Sender: Sender,
                pfp: response.data.pfp,
                lastname: segments[1] === "learner" ? learnerData.lastname : tutorData.lastname, 
                firstname: segments[1] === "learner" ? learnerData.firstname : tutorData.firstname,
                uuid: friendUuid,
                otherUuid: segments[1] === "learner" ? learnerData.uuid : tutorData.uuid 
              }
              ))
    socket.emit('send_message', data)
      setText("")
    } catch (error) {
      console.log("this is an error", error)  
    }
  }


  const handleChange = (event) =>{
    setText (event.target.value)
  }

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);


return (<>
  {
    segments[1] === "learner"?
    (
      learnerData.firstname?
      (
        learnerData.subscribed?
        <form 
          onSubmit={handleSubmit}
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
              >
          <div className="flex-grow ml-4">
              <div className="relative w-full">
                  <input
                    onChange={handleChange}
                    value={text}
                    placeholder="Type..."
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button
                    type='button'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-2xl absolute right-1 top-1"
                  >
                    😀
                  </button>
                  {showEmojiPicker && (
                    <div ref={pickerRef}  className="absolute bottom-14 right-4">
                        <Picker 
                        data={data} 
                        theme="light"
                        onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
              </div>
          </div>
          <div className="ml-4">
            <button
              className="flex items-center justify-center bg-button2 hover:bg-button rounded-xl text-white px-4 py-1 flex-shrink-0" 
              type= "submit" 
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
        :
        <span className="w-full text-center">Subscribe to get access to chat!</span>
      )
      :
      null
    )
    :
    <form 
    onSubmit={handleSubmit}
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
              >
                <div className="flex-grow ml-4">
                    <div className="relative w-full">
                        <input
                          onChange={handleChange}
                          value={text}
                          placeholder="Type..."
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                        <button
                          type='button'
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="text-2xl absolute right-1 top-1"
                        >
                          😀
                        </button>
                        {showEmojiPicker && (
                          <div ref={pickerRef}  className="absolute bottom-14 right-4">
                              <Picker 
                              data={data} 
                              theme="light"
                              onEmojiSelect={handleEmojiSelect} />
                          </div>
                        )}
                    </div>
                </div>
                <div className="ml-4">
                  <button
                    className="flex items-center justify-center bg-button2 hover:bg-button rounded-xl text-white px-4 py-1 flex-shrink-0" 
                    type= "submit" 
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>

  }
  </>

          )}