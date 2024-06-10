import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { arraysEqualUnordered } from "../Global/functions";
import { changeTopics } from "../../state/slices/userSlice";

function FocusTopics(props) {
    const [editing, setEditing] = useState(false)

    const focusTopics= useSelector(state => state.userData.topics) 

    const [topics, setTopics] = useState([])

    const dispatch = useDispatch()
    

     const listTopics =[
        "Music",
        "Sports",
        "Technology",
        "TOEFL",
        "Movies",
        "IELTS", 
        "Food",
        "Grammar",
        "Science",
        "Healthcare",
        "Art",
        "Business"
    ]


    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }
    const handleSave = async () => {
        if(editing) {
            console.log("focustopics: ", focusTopics, "topics: ", topics);
            try {
            if (topics && !arraysEqualUnordered(focusTopics, topics)) {
                    await props.modifyCall(topics, 'FocusTopics')
                    dispatch(changeTopics(topics))
                }
            } catch (error) {
                console.log(error);
            }
            setEditing(false)
        }
    }

    const handleFocusTopicsSelection = (topic) => {
        if(!topics.includes(topic)) {
            setTopics(prevValue => [...prevValue, topic])
        }else {
            setTopics(prevValue => prevValue.filter(item => item !== topic));
        }
    }

    const handleInput=() => {


        const learnerTopics = listTopics.map((topic, index) => {
            return  <div key={index} className="flex flex-wrap gap-2 self-start">
            <label
                className="flex items-center space-x-2 h-7"
                onClick={(e) => { if (!editing) e.preventDefault(); }}
            >
                <input
                    disabled={!editing}
                    type="checkbox"
                    onChange={() => handleFocusTopicsSelection(topic)}
                    checked={topics.includes(topic)}//if the item exists in the learner's topics, we check it
                    className={`appearance-none border-button h-5 w-5 border-2 rounded-md checked:bg-button checked:border-button checked:after:content-['✔'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center focus:outline-none transition duration-300 ${!editing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
                <span className={`text-sm ${editing ? "cursor-pointer" : "cursor-default"}`}>{topic}</span>
            </label>
        </div>
        })

        return learnerTopics
    }


    useEffect(()=> {
        if(focusTopics && focusTopics.length>0 ){
            try {
                setTopics(focusTopics);
            } catch (error) {
                console.error("Failed to parse focusTopics:", error);
            }
        }

    }, [focusTopics])


    console.log("topics: ", topics);
  
    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between  items-start flex border-lightg py-2">
            <span className="text-black font-bold w-40">
                {props.title}
            </span>
            {
                !editing?
                <>
                    <div className={`flex flex-col items-center justify-center w-[50%] ${!editing? "opacity-65" : "opacity-100"}`}>
                        {
                            handleInput()
                            
                        }
                    </div>
                    <div className="px-4 py-2 w-7">
                        <MdEdit  className="text-black" size="17"></MdEdit>

                    </div>
                </>
                :
                <>
                    <div className="flex flex-col items-start justify-center w-[50%] ">
                        {
                            handleInput()
                            
                        }
                    </div>
                    <div onClick={handleSave} className="px-4 py-2 rounded-md bg-elements text-white"> Save</div>
                </> 
            }
       
        </div>
    );
}

export default FocusTopics;