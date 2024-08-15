import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { setSelectedTutor } from '../../state/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryData, fetchFile, isGoogleProfilePicture } from '../../components/Global/functions';
import axiosInstance from '../../interceptors/axiosInterceptor';
export default function Friend() {

    //getting the uuid from the url
    const param = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [imgUrl, setImgUrl] = useState(null)
    const [countryFlag, setCountryFlag] = useState(null)
    const [name, setName] = useState('')
    const path = window.location.pathname;

    // Split the path by "/"
    const segments = path.split('/');
    useEffect(() => {
        const fetchData = async () => {
            try {

                setIsLoading(true)
                if(segments[1] === "learner"){
                    const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/learner/selectedTutor', {
                        uuid: param.uuid
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                        }
                    })
                    console.log("tutor:" , response.data.message)
      
        
                    //storing the tutor data
                    dispatch(setSelectedTutor(response.data.message))

                    setName(response.data.message.firstname + " "+ response.data.message.lastname)

      
                    //fetching the image from database
                    let imageUrl = response.data.message.pfp


                    if(!isGoogleProfilePicture(imageUrl)) {
                        const image = await  fetchFile(response.data.message.pfp, "images", "tutor", response.data.message.id)
                        imageUrl = image
                    }

                    //storing the img
                    setImgUrl(imageUrl)
                        
      
                    //fetching the country's flag
                    const flag = await fetchCountryData(response.data.message.country)
                    setCountryFlag(flag)
    
                    setIsLoading(false)
                }else {

                    const response = await axiosInstance.post('${process.env.REACT_APP_BACKEND_URL}/tutor/getLearner', {
                        uuid: param.uuid
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                        }
                    })
      
                    
                    setName(response.data.firstname + " "+ response.data.lastname)
                    console.log("getting Name:", response.data);
                    //fetching the image from database
                    let imageUrl = response.data.pfp

                    if(imageUrl!=="user.png") {
                        if(!isGoogleProfilePicture(imageUrl)) {
                            const image = await  fetchFile(response.data.message.pfp, "images", "tutor", response.data.message.id)
                            imageUrl = image
                        }
    
                    }
                    //storing the img
                    setImgUrl(imageUrl)
                        
                    //fetching the country's flag
                    const flag = await fetchCountryData(response.data.country)
                    setCountryFlag(flag)

                    setIsLoading(false)

                }
            }catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
return (<div
          className="flex flex-col space-y-2 h-full items-center justify-center bg-gray-100 border border-200 w-full py-6 px-4 rounded-lg"
        >
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src={
                imgUrl === "user.png"?
                "/user.png"
                :
                imgUrl}
              alt="Avatar"
              className="h-full object-cover w-full"
            />
          </div>
          <div className="items-center flex justify-center space-x-2 w-full">
            <div key="Country" className="flex items-center space-x-2">
                {countryFlag && countryFlag[0]?.flags && (
                    <img className="rounded-lg w-5 h-5 object-cover" src={countryFlag[0].flags.png} alt="Country" />
                )}
            </div>
            <div className="text-sm font-semibold mt-2">{name}</div>
          </div>
          
        </div>
)}