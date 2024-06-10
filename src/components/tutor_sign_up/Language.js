import { IoIosArrowDown } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { setListOfLanguages, deleteLanguageItem } from '../../state/slices/listSlice';


function Language(props) {
    const languages = [
        'English',
        'French',
        'Arabic',
    ]

    
    const listOfLanguages = useSelector(state => state.listData.listOfLanguages)
    const dispatch = useDispatch()
    
    //changing the value of the language
    const handleSelectChange = (e) => {
        dispatch(setListOfLanguages({id:props.index, language:e.target.value}))
    }

    //deleting the language
    const handleDelete =() => {
        dispatch(deleteLanguageItem({id:props.index}))
    }
    return (
        <>
            <div className="flex h-full w-full justify-between items-center">
                <div className="relative flex flex-col w-[70%]">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        name="languages" value={listOfLanguages[props.index]?.language} onChange={handleSelectChange}
                    >
                        {
                            languages.map((language, index)=> {
                                return <option key={index} value={language}>{language}</option>
                            })
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IoIosArrowDown></IoIosArrowDown>
                    </div>
                </div>
                {
                    props.index === 0?
                    null
                    :
                    <MdCancel onClick={handleDelete} size="23" color="#767676" className="cursor-pointer"></MdCancel>

                }
            </div>
            {
                props.error?
                <span className="text-sm px-4 -translate-y-3 text-errortext">{props.error}</span>
                :
                null
            }
            <hr className="h-1 w-full"></hr>
        </>
    );
}

export default Language;