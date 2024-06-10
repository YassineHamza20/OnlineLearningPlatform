import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setError, setDisplayableImage, setServerImage} from '../../state/slices/tutorSlice'
import { useRef, useState } from 'react'
import axiosInstance from '../../interceptors/axiosInterceptor';
import ReactLoading from 'react-loading';



function Image() {

    //handling the image loading 
    const [loading, setLoading] = useState(false)
    
    //handling the image upload
    const pictureRef = useRef(null)

    //imageError 
    const [imageError, setImageError] = useState('')

    //getting tutorData from redux slice
    const tutorData = useSelector(state => state.tutorData)

    const dispatch = useDispatch()

    //handling the image upload and ai check for face
    const handleImageChange = async (event) => {
        const reader = new FileReader() 
        if (event.target.files.length > 0) {
            setLoading(true)
            const imageFile = event.target.files[0]
            console.log(imageFile)
            const formData = new FormData()
            formData.append('image', imageFile)
            //sending the image to server so that ai checks if it contains a face
            try {
                const response = await axiosInstance.post('http://localhost:5000/imageFaceDetection', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                //if the server responds with true then it contains a face else it doesn't so we show error 
                if(response.data.message){
                    reader.readAsDataURL(imageFile)
                    dispatch(setServerImage(imageFile))
                    reader.onload = () => {
                      dispatch(setDisplayableImage(reader.result))
                    }
                    reader.onerror = error => {
                        const err = 'Cannot load image!'
                        dispatch(setError(err))
                        setImageError(err)
                        console.log("Error", error)
                    }
                }
                else {
                    const error = 'No face Detected'
                    dispatch(setError(error))
                    setImageError(error)
                }
            } catch (err) {
                if(err.response.data.message){
                    dispatch(setError(err.response.data.message))
                    setImageError(err.response.data.message)
                }
                console.log(err);
            }
            finally{
                setLoading(false)
            }
        }
    }


    //handle the click button on the image
    const handleSelectedImage = () => {
        pictureRef.current.click()
    }
    return (
        <div className="rounded-xl flex flex-col h-[46%] m-auto w-[80%] md:w-[50%] relative">
            <div className="bg-button h-[50%] w-full rounded-t-xl"></div>
            <div className="bg-lightg w-full p-[13px] h-[50%] rounded-b-xl flex flex-col justify-end">
                <span className="text-black font-bold">Your photo</span>
                <span className="text-darkg text-sm">Click the picture to upload your own.</span>
                <span className={`text-sm ${tutorData.displayableImage? 'text-green-600 font-bold' : (imageError? 'text-errortext font-bold' : 'text-darkg')}`}>{
                    tutorData.displayableImage?
                    'Great, Looking good!'
                    :
                    (imageError?
                    imageError
                    :
                    'Please ensure your face is visible.')
                }</span>
            </div>
            {
                loading?
                <div className="absolute flex justify-center items-center shadow cursor-pointer bg-white top-1/2 object-cover border-2 border-backg left-3 transform -translate-y-1/2 h-20 w-20 rounded-full ">
                    <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                </div>
                :
                <img onClick={handleSelectedImage} src={tutorData.displayableImage? tutorData.displayableImage: '/add.png'} alt="user" className="absolute shadow cursor-pointer bg-white top-1/2 object-cover border-2 border-backg left-3 transform -translate-y-1/2 h-20 w-20 rounded-full"></img>  
            }
            <input type="file" onChange={handleImageChange} ref={pictureRef} accept="image/*" className="hidden"/>
        </div>
    );
}

export default Image;