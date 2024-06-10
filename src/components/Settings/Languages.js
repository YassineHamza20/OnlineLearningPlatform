import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { compareLanguageLists } from "../Global/functions";
import { setLanguages } from "../../state/slices/tutorSlice";



function Languages(props) {
    const languages = useSelector(state => state.tutorData.languages)
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState([])
    const dispatch = useDispatch()

    const Langs = [
        "English", 
        "French",
        "Arabic"
    ]

      //trigger edit mode
      const handleClick = async () => {
        if(!editing ){
            setEditing(true)  
            }
            
        }
    
    
        
        //make api call to save modifications
        const handleSave = async (e) => {
            e.preventDefault()
            console.log("submiting");
            if(editing) {//if he's in editing mode
                if(!compareLanguageLists(value, languages)) {//if they are not the same we change them in DB
                    try {
                        await props.modifyCall(value, "langs")
                        dispatch(setLanguages(value))
                    } catch (error) {
                        console.log(error);
                    }
                }
                setEditing(false)
            }
        }

        const handleLanguagesChange = (lang) => {
            // Count the number of checked items
            const checkedItems = value.filter(languageObj => Langs.includes(languageObj.language)).length;
        
            // Check if the item is already checked
            const isCurrentlyChecked = value.some(languageObj => languageObj.language === lang);
        
            // Prevent unchecking if there's only one item checked
            if (checkedItems === 1 && isCurrentlyChecked) {
                return; // Prevent unchecking the last remaining item
            }
        
            // Proceed with updating the state
            if (isCurrentlyChecked) {
                // Remove the language from the state
                setValue(value.filter(languageObj => languageObj.language !== lang));
            } else {
                // Add the language to the state
                setValue([...value, { id: value.length, language: lang }]);
            }
        };

        const handleInput=() => {
            const learningGoals = Langs.map((lang, index) => {
                const isInLanguages = value.some(languageObj => languageObj.language === lang);
                return  <div key={index} className="flex flex-wrap gap-2 self-start">
                <label
                    className="flex items-center space-x-2 h-7"
                    onClick={(e) => { if (!editing) e.preventDefault(); }}
                >
                    <input
                        disabled={!editing} 
                        checked={isInLanguages}
                        type="checkbox"
                        onChange={() => handleLanguagesChange(lang)}
                        className={`appearance-none border-button h-5 w-5 border-2 rounded-md checked:bg-button checked:border-button checked:after:content-['✔'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center focus:outline-none transition duration-300 ${!editing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                    <span className={`text-sm ${editing ? "cursor-pointer" : "cursor-default"}`}>{lang}</span>
                </label>
            </div>
            })
    
            return learningGoals
        }



    useEffect(() => {
        setValue(languages)
    }, [languages])
    

    return (
         
        <form onSubmit={handleSave} onClick={handleClick} className={` cursor-pointer border-b px-2 hover:bg-lightg justify-between items-start flex border-lightg py-2`}>
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                     <div className="rounded-2xl h-auto flex flex-wrap">
                        {
                            languages.map((item, index) => {
                                return <span key={index} className="bg-white rounded-2xl border mr-2 mb-2 border-darkg px-2 py-1 text-sm">{item.language}</span>
                            })
                        }
                    </div>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex flex-col items-center relative w-[50%]  ">
                        {
                            handleInput()
                        }
                    </div>
                    <button type="submit" className="px-4 py-2 rounded-md bg-elements text-white"> Save</button>    
                </> 
            }
            
        </form>
    );
}

export default Languages;