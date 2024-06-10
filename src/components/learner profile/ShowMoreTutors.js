import { useDispatch, useSelector } from 'react-redux';
import { appendTutorSearchList, incrementPageNumber, setMaxPageNumber } from '../../state/slices/userSlice'
import axiosInstance from '../../interceptors/axiosInterceptor';
import ReactLoading from 'react-loading';
import { useState } from 'react';



function ShowMoreTutors(props) {

    const dispatch = useDispatch()

    const pageNumber = useSelector(state => state.userData.tutorSearchPageNumber)
    const filterOptions = useSelector(state => state.userData.filterOptions)
    const [loading, setLoading] = useState(false)

    const handleShowMore = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.post('http://localhost:5000/SearchTutors', {
                page: pageNumber+1,
                pageSize: 3,
                filterOptions: filterOptions
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            console.log('showMore: ', response.data.tutorsList);
            dispatch(appendTutorSearchList(response.data.tutorsList))
            dispatch(incrementPageNumber())
            dispatch(setMaxPageNumber(response.data.tutorsNumber))

            setLoading(false)
        }catch(err) {
            console.log(err)
            setLoading(false)
        }
    }
 
    return (
        loading?
        <div className="w-full flex items-center justify-center">
            <ReactLoading  type="spin" color="#FFA447" height={'40px'} width={'40px'} />
        </div>
        :
        <div onClick={handleShowMore} className="w-full py-3 cursor-pointer hover:bg-button2 hover:text-white transition-colors duration-300 border rounded-sm text-center border-button2 text-button2">
                Show More
        </div>
    );
}

export default ShowMoreTutors;