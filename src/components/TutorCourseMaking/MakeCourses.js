import Title from "./Title";
import UploadPDF from "./UploadPDF";
import Category from "./Category";
import Language from "./Language";
import Level from "./Level";
import Description from "./Description";
import Type from "./Type";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appendListOfCourses, resetCourseData, setFormError, setLoading } from "../../state/slices/CourseSlice";
import axiosInstance from "../../interceptors/axiosInterceptor";


function MakeCourses(props) {
    const [file, setFile] = useState(null)
    const courseData = useSelector(state => state.courseData)
    const tutorId = useSelector(state => state.tutorData.id)
    const dispatch = useDispatch()
    const [success, setSuccess] = useState('')
    const imageFiles = [
        '1.JPG', '2.jpg', '3.jpg', '4.png', '5.png', '6.png', '7.png'
      ];
    const inputRef = useRef(null)



    //generating random image for courses
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        return imageFiles[randomIndex];
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(file && !courseData.formError){
            const formData = new FormData()
            const randomImage = getRandomImage()
            formData.append('courseFile', file)
            formData.append('title', courseData.Title)
            formData.append('category', courseData.Category)
            formData.append('language', courseData.language)
            formData.append('level', courseData.level)
            formData.append('type', courseData.type)
            formData.append('description', courseData.description)
            formData.append('numberOfpages', courseData.numberOfpages)
            formData.append('courseCover', randomImage)
            try {
                
                dispatch(setLoading(true))
                const response = await axiosInstance.post('http://localhost:5000/tutor/CreateCrouse', formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                    }
                }
                    
                )
                dispatch(setLoading(false))
                //showing success indicator and clearing fields when insertion is done
                setSuccess("Course submitted successfully ")
                //generating current date object
                const currentDate = new Date();

                // Extract individual components of the date and time
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                dispatch(appendListOfCourses({
                    id: response.data.message,
                    tutorId: tutorId,
                    title: courseData.Title,
                    Category: courseData.Category,
                    Language: courseData.language,
                    Level: courseData.level,
                    Type: courseData.type,
                    description: courseData.description,
                    numberOfPages: courseData.numberOfpages,
                    Course: response.data.fileName,
                    courseCover: randomImage,
                    created_at: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                }))
                
                setTimeout(() => {
                    setSuccess('')
                }, 2000)
                dispatch(resetCourseData())
                inputRef.current.value = ''
                setFile(null)
            } catch (error) {
                console.log(error);
                dispatch(setLoading(false))
            }
        }else {
            console.log("else ");
            dispatch(setFormError("Please upload a valid PDF file."))
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="rounded-2xl px-6 py-5 h-auto flex-col flex justify-center shadow space-y-5 items-center bg-white">
             <div className="font-bold text-lg w-full text-left">
                Make Course
            </div>
            <Title></Title>
            <div className="flex items-center w-full justify-between flex-wrap">
                <Category></Category>
                <Language></Language>
                <Level></Level>
            </div>
            <Type></Type>
            <Description></Description>
            {
                success?
                <span className="text-elements">
                    {success}
                </span>
                :
                null
            }
            {
                courseData.formError?
                <span className="text-errortext">
                    {courseData.formError}
                </span>
                :
                null
            }
            <UploadPDF
            setFile={setFile}
            file = {file}
            inputRef = {inputRef}
            ></UploadPDF>
        </form>
    );
}

export default MakeCourses;