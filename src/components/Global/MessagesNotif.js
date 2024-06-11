import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoChatbubbles } from "react-icons/io5"
import axiosInstance from "../../interceptors/axiosInterceptor"
import Message from "./Message"
import { NotificationLoading } from "./LoadingCards"
import { setChatNotification, setNewMessages } from "../../state/slices/chatSlice"


function MessagesNotif(props) {
    const notifRef = useRef(null)
    const dispatch = useDispatch()
    const [modalVisibility, setModalVisibility] = useState(false)
    const messages = useSelector(state => state.chatData.Notifications)
    const newMessages = useSelector(state => state.chatData.newMessages)
    const [loading, setLoading] = useState(false)

    const path = window.location.pathname

    // Split the path by "/"
    const segments = path.split('/');
    


    
    const handleOutsideClick = (event) => {
        if (notifRef.current && !notifRef.current.contains(event.target)) {
            setModalVisibility(false)
        }
    }

    //control the visibility of the modal
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [])

    //handle notifications visibility and api calls 
    const handleNotifications = async () => {
        try {
            if(!modalVisibility){
                setLoading(true)
                const response = await axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${segments[1]}/getLatestMessages`)
                console.log("message: ", response)
                dispatch(setChatNotification(response.data))
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        if(newMessages){
            dispatch(setNewMessages(false))
        }
        setModalVisibility(prevValue => !prevValue)
    }
    
    const handleContent = () => {
        if(messages) {
            const list = messages.map((message, index) => {
                return <Message role={segments[1]} message={message} key={index}></Message>
            })

            //if the list is empty return the empty image else return the list
            return list.length ===0? 
            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
            :
            list
        }

    }

    
      
    return (
        <div ref={notifRef} className="relative py-1">
            <div className="cursor-pointer" onClick={() => handleNotifications()}>
                {
                    newMessages?
                    <span className="absolute hidden lg:flex h-3 w-3 top-0 right-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elements opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-elements"></span>
                    </span>
                    :
                    null
                }
                
                <IoChatbubbles className="cursor-pointer text-darkg hidden lg:block" size="22"></IoChatbubbles>
            </div>
            <div 
                className={`absolute hidden lg:block right-0 w-96 mt-2 bg-white border border-lightg rounded-md shadow-lg z-10 ${modalVisibility ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
                >
                <div className="flex flex-col p-2 overflow-y-auto max-h-96">
                    <div className="flex px-2 items-center border-b justify-between">
                        <div className="py-5 font-bold">Messages</div>
                    </div>
                    {
                        loading?
                        <>
                            <NotificationLoading></NotificationLoading>
                            <NotificationLoading></NotificationLoading>
                            <NotificationLoading></NotificationLoading>
                        </>
                        :
                        (
                            messages.length === 0?
                            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
                            :
                            <>
                            {
                                handleContent()
                            }
                            </>
                        )
                    
                    }
                </div>
            </div>
        </div>
    );
}

export default MessagesNotif;