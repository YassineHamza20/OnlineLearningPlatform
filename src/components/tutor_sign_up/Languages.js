import Modal from '../Global/modal'
import { MdLanguage } from "react-icons/md";
import Language from '../tutor_sign_up/Language';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { setListOfLanguages, resetLanguageList, setListOfLanguagesVisibility, setListOfLanguagesSaved, getListOfLanguages } from '../../state/slices/listSlice';
import { MdEdit } from "react-icons/md"
import { setLanguages } from '../../state/slices/tutorSlice';

function Languages(props) {
    const listOfLanguages = useSelector(state => state.listData.listOfLanguages)

    const listOfLanguagesVisibility = useSelector(state => state.listData.listOfLanguagesVisibility)
    
    const listOfLanguagesSaved = useSelector(state => state.listData.listOfLanguagesSaved)

    const languages = useSelector(state => state.tutorData.languages)

    const dispatch = useDispatch()
    
    //add item into the language array
    const handleAddLanguage = () => {
        dispatch(setListOfLanguages({id:listOfLanguages.length, language:'English'}));
    }
    
    //remove new changes and remove the modal
    const handleCancel = () => {
        dispatch(setListOfLanguagesVisibility(false))
        dispatch(getListOfLanguages(languages))

    }
    
    //checking wether the list is unique or not 
    const listUnicityChecker = (list) => {
        // Use a Set to store unique language names
        const uniqueLanguages = new Set();
    
        // Use the some method to iterate over each object in the array
        const isLanguageRepeated = list.some(obj => {
        // If the language is already in the Set, return true to indicate repetition
        if (uniqueLanguages.has(obj.language)) {
            return true;
        } else {
            // Otherwise, add the language to the Set and continue iteration
            uniqueLanguages.add(obj.language);
            return false;
        }
        });
        return isLanguageRepeated
    }

    //in case of saving with correct fields, we remove the modal and save the final list 
    const handleSave = (e) => {
        e.preventDefault()
        if(!listUnicityChecker(listOfLanguages)) {
            dispatch(setListOfLanguagesVisibility(false))
            dispatch(setLanguages(listOfLanguages))
            dispatch(setListOfLanguagesSaved(true))   
        }
    }
    
    
    //the content of the language modal
    const content = [
        <div key="0" className="h-full w-full flex flex-col justify-between overflow-y-auto space-y-5">
            {listOfLanguages.map((field, index) => {
                //checking whether the language selected is already picked or not 
                const language = listOfLanguages.filter(item => item.language === field.language && item.id !== field.id)
                var err = ''
                if(language.length>0){
                    err = 'Please remove duplicate fields'
                }
                return <Language key={index} index={field.id} error={err} ></Language>
            })}
        </div>,
        <button key="1" onClick={handleAddLanguage} type="button" className="text-button self-start px-4 py-2">
                ADD LANGUAGE
        </button>,
        <div key="2" className="flex justify-end space-x-4">
            <button onClick={handleCancel} type="button" className="text-button  px-4 py-2">
                CANCEL
            </button>
            <button onClick={handleSave} type="button" className={`bg-button px-4 py-2 rounded-lg text-white ${listUnicityChecker(listOfLanguages)? 'opacity-60 cursor-default': 'cursor-pointer hover:shadow'}`}>
                Save
            </button>
        </div>
    ]

    //show the languages modal
    const handleLanguageModal = (e) => {
        e.preventDefault()
        dispatch(getListOfLanguages(languages))
        dispatch(setListOfLanguagesVisibility(true))
    }
 

    return (
        <>
            <div className="w-[80%] md:w-[50%] h-auto flex-col m-auto flex space-y-2 p-[13px] bg-lightg rounded-xl">
                <div className="w-full h-[15%] flex items-center">
                {
                    listOfLanguagesVisibility?
                    <Modal content={content} title={props.title} icon={<MdLanguage size="22" color="#FFA447"></MdLanguage>}></Modal>
                    :
                    null
                }
                    <div className="flex items-center space-x-2">
                        {props.icon}
                        <span className="text-black font-bold text-sm">{props.title}</span>
                    </div>
                    {
                        listOfLanguagesSaved?
                        <div onClick={handleLanguageModal} className="ml-auto h-6 w-6 cursor-pointer bg-darkg opacity-75 rounded-full flex justify-center items-center">
                            <MdEdit size="17" color="#ffffff"></MdEdit>
                        </div>
                        :
                        null
                    }
                </div>
                    <span className="text-darkg h-full text-sm">{props.placeholder}</span>
                    {
                            listOfLanguagesSaved?
                            <div className="rounded-2xl h-auto flex flex-wrap">
                                {
                                    languages.map((item, index) => {
                                        return <span key={index} className="bg-white rounded-2xl border mr-2 mb-2 border-darkg px-2 py-1 text-sm">{item.language}</span>
                                    })
                                }
                            </div>
                            :
                            null
                        }
                    {
                        !listOfLanguagesSaved?
                        <button onClick={handleLanguageModal} className=" bg-elements text-sm text-white w-36 h-10 rounded-lg">
                            ADD LANGUAGES
                        </button>
                        :
                        null
                    }
            </div>
        </>
    );
}

export default Languages;