import Notification from "./Notification"
import { useEffect, useRef, useState } from "react"
import { IoNotifications } from "react-icons/io5"
import axiosInstance from "../../interceptors/axiosInterceptor"
import { NotificationLoading } from "../Global/LoadingCards"
import { useSelector, useDispatch } from "react-redux"
import { markAllAsRead, setFetchedNotifications, setMaxPageNumber, setNotificationsList, setPageNumber, setSelectedOption, setUnreadNotifications } from '../../state/slices/NotificationSlice'
import ShowMoreNotifications from "./ShowMoreNotifications"
import ReactLoading from 'react-loading';
import { IoIosCheckmarkCircle } from "react-icons/io";


function LessonNotifications(props) {
    const notifRef = useRef(null)
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState(false)
    const notificationsList = useSelector(state=> state.notificationsData.notificationsList)
    const unreadNotifications = useSelector(state => state.notificationsData.unreadNotifs)
    const [loading, setLoading] = useState(false)
    const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false)
    const selectedOption = useSelector(state => state.notificationsData.selectedOption)
    const maxPageNumber = useSelector(state => state.notificationsData.maxPageNumber)
    const fetchedNotifications = useSelector(state => state.notificationsData.fetchedNotifications)



    const notifiationFilterOption = [
        "All", 
        "Pending",
        "Accepted",
        "Rejected"
    ]
    


    //handle notifications visibility and api calls 
    const handleNotifications = async (Accepted) => {
        if( !fetchedNotifications &&  !notifications ){
            console.log("fetching notifications again ");
            try {
                setLoading(true)
                const notifications = await axiosInstance.post('http://localhost:5000/learner/getNotifications', {
                    page: 1,
                    pageSize: 5,
                    Accepted: Accepted
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                dispatch(setFetchedNotifications(true))
                dispatch(setNotificationsList(notifications.data.notification))
                dispatch(setMaxPageNumber(notifications.data.max))
                setLoading(false)
            }catch(err) {
                console.log(err)
                setLoading(false)
            }
        }
        setNotifications(prevValue => !prevValue)
    }

    
    const handleOutsideClick = (event) => {
        if (notifRef.current && !notifRef.current.contains(event.target)) {
            setNotifications(false)
            dispatch(setPageNumber(1))
            dispatch(setMaxPageNumber(0))
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

      //handling the filter option of the notificaton (All, Accepted, Requests)
      const handleOptions = async (e) => {
        const value = parseInt(e.target.value)
        dispatch(setSelectedOption(value))
        let accepted = ""
        if(value === 1) {
            accepted=-1
        }else if (value === 2) {
            accepted = 1
        }else if ( value === 3){
            accepted = 0
        }
        console.log("accepted: ", accepted);
        try {
            const notifications = await axiosInstance.post('http://localhost:5000/learner/getNotifications', {
                page: 1,
                pageSize: 5,
                Accepted: accepted
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            dispatch(setNotificationsList(notifications.data.notification))
            dispatch(setPageNumber(1))
            dispatch(setMaxPageNumber(0))
            setLoading(false)
        }catch (err) {
            console.log(err)
        }
      }

      //handling the list to return based on the option object
      const handleContent = () => {
        if(notificationsList) {
            const list = notificationsList.map((notification, index) => {
                return <Notification notification={notification} key={index}></Notification>
            })

            //if the list is empty return the empty image else return the list
            return list.length ===0? 
            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
            :
            list
            }

        }

        //marking all notification as Unread
        const handleMarkAllAsRead = async () => {
            try {
                setMarkAllAsReadLoading(true)
                const reponse = await axiosInstance.post('http://localhost:5000/learner/markAllAsRead', {

                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                //updating it in the ui
                dispatch(setUnreadNotifications(0))
                dispatch(markAllAsRead("Learner"))
                setMarkAllAsReadLoading(false)
            }catch(err) {
                console.log(err)
            }
        }

        //console.log("hide showMore condition: ", notificationsList.length === maxPageNumber, " listLength: ", notificationsList.length, " maxPageNumber: ", maxPageNumber);
        
    return (
        <div ref={notifRef} className="relative py-1">
            <div className="cursor-pointer" onClick={() => handleNotifications("")}>
                {
                    unreadNotifications>0?
                    <span className="absolute hidden lg:flex h-3 w-3 top-0 right-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-elements opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-elements"></span>
                    </span>
                    :
                    null
                }
                
                <IoNotifications
                className="text-darkg hidden lg:block" 
                size="22"></IoNotifications>
            </div>
            <div 
                className={`absolute hidden lg:block right-0 w-96 mt-2 bg-white border border-lightg rounded-md shadow-lg z-10 ${notifications ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-transform duration-300 transform origin-top-right`}
                >
                <div className="flex flex-col p-2 overflow-y-auto max-h-96">
                    <div className="flex px-2 items-center border-b justify-between">
                        <div className="py-5 font-bold">Notifications</div>
                        <button disabled={unreadNotifications <=0 || markAllAsReadLoading? true : false} onClick={handleMarkAllAsRead} className={`rounded-lg flex p-2 items-center hover:bg-lightg text-darkg  space-x-3 ${unreadNotifications <=0 || markAllAsReadLoading? "cursor-not-allowed" : "cursor-pointer" }`} >
                            {
                                markAllAsReadLoading?
                                <ReactLoading type="spin" color="#FFA447" height={'20px'} width={'20px'} />
                                :
                                (unreadNotifications <=0?
                                <IoIosCheckmarkCircle 
                                size="20"
                                className="text-elements"></IoIosCheckmarkCircle>
                                :
                                null) 
                            }
                            <span>
                                Mark all as read 
                            </span>
                        </button>
                    </div>
                    <div className="flex relative px-2 py-2 items-center border-b space-x-4">
                        {
                            notifiationFilterOption.map((optionn, index) => {
                            return (
                                <div key={index} className="flex items-center space-x-1">
                                    <option onClick={handleOptions} className={`text-sm cursor-pointer ${selectedOption === index? "text-button font-bold border-b border-b-button" : "text-black"}`} value={index}>
                                        {optionn}
                                    </option>
                                </div>
                            )
                            })
                        }
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
                            notificationsList.length === 0?
                            <img alt="empty" src="/no-data.png" className="w-64 h-64 m-auto object-cover"></img>
                            :
                            <>
                            {
                                handleContent()
                            }
                            {
                                notificationsList.length !==0 && notificationsList.length !== maxPageNumber ?
                                <ShowMoreNotifications role="learner" Accepted={selectedOption}></ShowMoreNotifications>
                                :
                                null
                            }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default LessonNotifications