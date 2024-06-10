import { useEffect, useState } from "react";
import Card from "../learner profile/Card";
import { BiSolidHeartCircle } from "react-icons/bi";
import { RiChat1Fill } from "react-icons/ri";
import axiosInstance from "../../interceptors/axiosInterceptor";


function InformationalCard(props) {
    const [likeCount, setLikeCount] = useState(null)
    const [chats, setChats] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/Information`)
                setLikeCount(response.data.likeCount)
                setChats(response.data.chats)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    })

    //contains the content of this card
    const content = [
            <div key="Likes" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <BiSolidHeartCircle className="text-button2" size="25"></BiSolidHeartCircle>
                    <span className="font-bold">Likes</span>
                </div>
                <span>{likeCount}</span>
            </div>,
            <hr key="line2" className="w-full h-1"></hr>,
            <div key="Chat" className="flex justify-between w-full ">
                <div className="flex items-center space-x-2">
                    <RiChat1Fill className="text-button2" size="25"></RiChat1Fill>
                    <span className="font-bold">Chats</span>
                </div>
                <span>{chats}</span>
            </div>,
    ]


    return (
        <Card content={content}></Card>
    );
}

export default InformationalCard;