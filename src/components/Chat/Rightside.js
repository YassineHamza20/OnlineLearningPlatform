import React, { useEffect, useRef } from "react";
import Receivemsg from "./Receivemsg";
import Sendmsg from "./Sendmsg";
import Typemsg from "./Typemsg";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptors/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { appendMessage, setConvo } from "../../state/slices/chatSlice";
import io from 'socket.io-client'


export default function Rightside() {
  const learnerData = useSelector(state => state.userData)
  const tutorData = useSelector(state => state.tutorData)
  const dispatch = useDispatch()
  
  const path = window.location.pathname;
  
  // Split the path by "/"
  const segments = path.split('/');
  
  const userId = segments[1] === "learner"? learnerData.id : tutorData.id 

  const uuid = segments[1] === "learner"? learnerData.uuid : tutorData.uuid

  const convo =  useSelector(state => state.chatData.convo)

  const chatContainerRef = useRef(null);
  
  

  //getting the uuid from the url
  const param = useParams()

  useEffect(() => {
    // Scroll to the bottom whenever convo changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [convo]);

useEffect(() => {
  const fetchConvo = async() => {

    try {
      const response = await axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${segments[1]}/getMessages`, {
      uuid: param.uuid
    })
    console.log("RESULT", response.data)
    dispatch(setConvo(response.data))
    console.log("this is a response about convo", response)
    } catch (error) {
      console.log(error)
    }
  }
  fetchConvo()
}, [])

const handleReceiveMessage = (data) => {
  console.log("receiving message: ", data);
  console.log("adheya current uuid, ", uuid, "adheya uuid mel msg: ", data.uuid);
  if(uuid === data.uuid && data.otherUuid === param.uuid){
    console.log("working");
    dispatch(appendMessage(data))
  }
}

useEffect(() => {
  if(userId) {
      const socket = io('https://onlinelearningplatform-d9w2.onrender.com', {
      auth: {
          token: localStorage.getItem('accesstoken')
      }
      })

      
      socket.emit('createRoom', userId)
      
      //reject lesson error notification listener 
      socket.on('recieve_message', handleReceiveMessage)

      return () => {
          socket.disconnect();
        }
  }
}, [userId])


return (
<div className="flex flex-col flex-auto h-full p-6">
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl border border-gray-200 bg-gray-100 h-full p-4"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4" ref={chatContainerRef}>
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {
                  convo.map((msg, index ) => {
                    if ( msg.Sender.toLowerCase() === segments[1].toLowerCase() ) {
                      return <Sendmsg key={index} img= {segments[1]==="learner"? (learnerData.pic==="user.png" ? "/" +learnerData.pic: learnerData.pic ) : (tutorData.displayableImage)} msg={msg} ></Sendmsg>
                    }
                    else{
                      return <Receivemsg key={index} msg={msg} ></Receivemsg>
                    }
                  })
                }
                

              </div>
            </div>
          </div>
                <Typemsg></Typemsg>
        </div>
      </div>
)
}