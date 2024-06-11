import { useSelector, useDispatch } from "react-redux"
import axiosInstance from "../../interceptors/axiosInterceptor"
import { appendNotifications, setMaxPageNumber, setPageNumber } from "../../state/slices/NotificationSlice"

function ShowMoreNotifications(props) {
    const dispatch = useDispatch()
    const pageNumber = useSelector(state => state.notificationsData.pageNumber) //this indicates the current page we're in, in notifications

    const handleShowMore = async() => {
        let accepted = ""
        const Accepted = parseInt(props.Accepted)
        if(Accepted === 1) {
            accepted = -1
        }else if (Accepted === 2) {
            accepted = 1
        }else if(Accepted === 3) {
            accepted = 0
        }
        try {
            const notifications = await axiosInstance.post(`https://onlinelearningplatform-d9w2.onrender.com/${props.role}/getNotifications`, {
                page: pageNumber+1,//getting the next page
                pageSize: 5,
                Accepted: accepted
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })

            dispatch(appendNotifications(notifications.data.notification))
            dispatch(setPageNumber(pageNumber+1))
            dispatch(setMaxPageNumber(notifications.data.max))
            
        }
        catch(err) {
            console.log("error", err)

        }

    }
    return (
        <div className="w-full text-center">
            <button onClick={handleShowMore} className="cursor-pointer w-auto p-2 text-center underline text-xs text-darkg">Show more</button>
        </div>
    );
}

export default ShowMoreNotifications;