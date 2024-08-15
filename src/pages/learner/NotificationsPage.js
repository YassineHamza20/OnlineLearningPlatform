import Notification from "../../components/learner profile/Notification"
import { useEffect, useRef, useState } from "react"
import axiosInstance from "../../interceptors/axiosInterceptor"
import { NotificationLoading } from "../../components/Global/LoadingCards"
import { useSelector, useDispatch } from "react-redux"
import { markAllAsRead, setFetchedNotifications, setMaxPageNumber, setNotificationsList, setPageNumber, setSelectedOption, setUnreadNotifications } from '../../state/slices/NotificationSlice'
import ShowMoreNotifications from "../../components/learner profile/ShowMoreNotifications"
import ReactLoading from 'react-loading';
import { IoIosCheckmarkCircle } from "react-icons/io";


function LessonNotifications(props) {
    const dispatch = useDispatch()
    const notificationsList = useSelector(state=> state.notificationsData.notificationsList)
    const unreadNotifications = useSelector(state => state.notificationsData.unreadNotifs)
    const [loading, setLoading] = useState(false)
    const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false)
    const selectedOption = useSelector(state => state.notificationsData.selectedOption)
    const maxPageNumber = useSelector(state => state.notificationsData.maxPageNumber)



    const notifiationFilterOption = [
        "All", 
        "Pending",
        "Accepted",
        "Rejected"
    ]
    



    //getting learner notifications from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const notifications = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/getNotifications', {
                    page: 1,
                    pageSize: 5,
                    Accepted: ""
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

        fetchData()
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
            const notifications = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/getNotifications', {
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
                const reponse = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/markAllAsRead', {

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
            <div 
                className={`h-[90%] bg-white overflow-x-hidden`}
                >
                <div className="flex flex-col p-2 overflow-y-auto">
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
    );
}

export default LessonNotifications