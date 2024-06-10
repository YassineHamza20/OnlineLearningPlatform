import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { arraysEqualUnordered } from "../Global/functions";
import { changeGoals } from "../../state/slices/userSlice";


function LearningGoals(props) {

    const [editing, setEditing] = useState(false)

    const learning_goals= useSelector(state => state.userData.goals) //transforming the string array into an object

    const [learningGoal, setLearningGoal] = useState([])


    const dispatch = useDispatch()
    

    //list of goals
    const goals = [
        "Grow your career", 
        "Thrive at university",
        "Just for fun",
        "Travel abroad",
        "Prepare for a test",
        "Other"
    ]


    

    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }
    const handleSave = async() => {
        if(editing) {
            if(learningGoal && !arraysEqualUnordered(learningGoal, learning_goals)) {
                console.log("api called ");
                try {
                    await props.modifyCall(learningGoal, 'learningGoals')
                    dispatch(changeGoals(learningGoal))
                } catch (error) {
                    console.log(error);
                }
                
            }
            setEditing(false)
        }
    }

    const handleLearningGoalsChange = (goal) => {
        console.log("goal:", goal);
        if(!learningGoal.includes(goal)) {
            setLearningGoal(prevValue => [...prevValue, goal])
        }else {
            setLearningGoal(prevValue => prevValue.filter(item => item !== goal));
        }
    }


    const handleInput=() => {
        const learningGoals = goals.map((goal, index) => {
            return  <div key={index} className="flex flex-wrap gap-2 self-start">
            <label
                className="flex items-center space-x-2 h-7"
                onClick={(e) => { if (!editing) e.preventDefault(); }}
            >
                <input
                    disabled={!editing}
                    checked={learningGoal.includes(goal)}
                    type="checkbox"
                    onChange={() => handleLearningGoalsChange(goal)}
                    className={`appearance-none border-button h-5 w-5 border-2 rounded-md checked:bg-button checked:border-button checked:after:content-['✔'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center focus:outline-none transition duration-300 ${!editing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
                <span className={`text-sm ${editing ? "cursor-pointer" : "cursor-default"}`}>{goal}</span>
            </label>
        </div>
        })

        return learningGoals
    }


    useEffect(()=> {
        if(learning_goals && learning_goals.length>0){
            try {
                console.log("learning_goals: ", learning_goals);
                
                setLearningGoal(learning_goals)
            } catch (error) {
                console.error("Failed to parse learning_goals:", error);
            }
        }

    }, [learning_goals])


    console.log("learningGoals :", learningGoal);
  
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

export default LearningGoals;