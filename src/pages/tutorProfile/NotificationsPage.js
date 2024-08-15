import Notification from "../../components/Global/Notification"
import { useEffect, useState } from "react"
import axiosInstance from "../../interceptors/axiosInterceptor"
import { NotificationLoading } from "../../components/Global/LoadingCards"
import { useSelector, useDispatch } from "react-redux"
import { setNotificationsList, setMaxPageNumber, setPageNumber, setSelectedOption, setFetchedNotifications, setUnreadNotifications, markAllAsRead } from '../../state/slices/NotificationSlice'
import ShowMoreNotifications from "../../components/learner profile/ShowMoreNotifications"
import ReactLoading from 'react-loading';
import { IoIosCheckmarkCircle } from "react-icons/io";



function Notifications(props) {
    const dispatch = useDispatch()
    

    const notificationsList = useSelector(state=> state.notificationsData.notificationsList)
    const UnreadNotifications = useSelector(state => state.notificationsData.unreadNotifs)
    const maxPageNumber = useSelector(state => state.notificationsData.maxPageNumber)
    const [loading, setLoading] = useState(false)
    const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false)
    const selectedOption = useSelector(state => state.notificationsData.selectedOption)

    const notifiationFilterOption = [
        "All", 
        "Pending",
        "Accepted",
        "Rejected"
    ]
    

    //getting notifications from server
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true)
                const notifications = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/getNotifications`, {
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

        fetchNotifications()
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
        }
        else if (value === 3) {
            accepted = 0
        }
        console.log("accepted: ", accepted);
        try {
            const notifications = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/getNotifications`, {
                page: 1,
                pageSize: 5,
                Accepted: accepted
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            dispatch(setNotificationsList(notifications.data.notification))
            dispatch(setMaxPageNumber(notifications.data.max))
            dispatch(setPageNumber(1))
            dispatch(setMaxPageNumber(0))
        }catch (err) {
            console.log(err)
        }
      }

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
    
        //console.log("hide showMore condition: ", notificationsList.length === maxPageNumber, " listLength: ", notificationsList.length, " maxPageNumber: ", maxPageNumber)


        //marking all notification as Unread
        const handleMarkAllAsRead = async () => {
            try {
                setMarkAllAsReadLoading(true)
                const reponse = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/markAllAsRead`, {

                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                //updating it in the ui
                dispatch(setUnreadNotifications(0))
                dispatch(markAllAsRead("Tutor"))
                setMarkAllAsReadLoading(false)
            }catch(err) {
                console.log(err)
            }
        }

    return (
            <div 
                className={`h-[90%] bg-white overflow-x-hidden`}
                >
                <div className="flex flex-col p-2 overflow-y-auto">
                    <div className="flex px-2 items-center border-b justify-between">
                        <div className="py-5 font-bold">Notifications</div>
                        <button disabled={UnreadNotifications <=0 || markAllAsReadLoading? true : false} onClick={handleMarkAllAsRead} className={`rounded-lg flex p-2 items-center hover:bg-lightg text-darkg  space-x-3 ${UnreadNotifications <=0|| markAllAsReadLoading? "cursor-not-allowed" : "cursor-pointer" }`} >
                            {
                                markAllAsReadLoading?
                                <ReactLoading type="spin" color="#FFA447" height={'20px'} width={'20px'} />
                                :
                                (UnreadNotifications <=0?
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
                                <ShowMoreNotifications role="tutor" Accepted={selectedOption}></ShowMoreNotifications>
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

export default Notifications;