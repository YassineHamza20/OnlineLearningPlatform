import React, { useEffect, useState } from "react";
import { fetchFile, isGoogleProfilePicture } from "../Global/functions";

const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');

    const Receivemsg = (props) => {

    const [imgUrl, setImgUrl] = useState(null) 
    useEffect(() => {
      const fetchData = async() => {
              try {
                let imageUrl = props.msg.pfp
                      if(imageUrl) {
                          if (!isGoogleProfilePicture(imageUrl)) {
                              imageUrl = await fetchFile(props.msg.pfp, 'images',segments[1]==="learner"? "Tutor" : "Learner" , segments[1]==="learner"?  props.msg.IdTutor: props.msg.IdLearner);
                          }
                          setImgUrl(imageUrl)
                      }
              } catch (error){
                console.log("HEREEEE", error)
              }
      } 
      fetchData() 
      
      })

      const handleTime= () => {
        const date = new Date(props.msg.MessageTime);
    
        // Get the day, month, year, hours, minutes, and seconds from the Date object
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
        return formattedDate
      }

  return (
    <div className="col-start-1 group col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img className=" h-10 w-10 self-start rounded-full object-cover" src={imgUrl} alt="friendsImage">
        </img>
        <div className="relative max-w-full sm:max-w-sm md:max-w-full lg:max-w-lg xl:max-w-xl ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl break-words">
          <div>{props.msg.message} </div>
        </div>
        <div className="text-xs transition-all duration-150 group-hover:block hidden ml-3 text-darkg">
            {
              handleTime()
            }
        </div>
      </div>
    </div>
  );
};

export default Receivemsg;
