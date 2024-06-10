import { useDispatch, useSelector } from "react-redux";
import { setfilterOptions } from "../../../state/slices/userSlice";


function Proficiency(props) {

    const filterOption = useSelector(state => state.userData.filterOptions)
    const dispatch = useDispatch()
    
   //list of tags
   const Tags = [
        'Education',
        'It',
        'Advertising',
        'Agriculture',
        'Entrepreneurship',
        'Government',
        'Law',
        'Customer Support',
    ]

    const handleProficiencySelection = (e) => {
        dispatch(setfilterOptions({
            type: "proficiency",
            value: e.target.value
        }))
        const data = {...filterOption, proficiency:e.target.value}
        //getting data from server
        props.fetchData(data)
    }

    return (
        <div className="rounded-2xl h-auto flex flex-wrap">
            {
                Tags.map((tag, index)=> {
                    return <option onClick={handleProficiencySelection} key={index} value={tag} className={`px-4 ${filterOption.proficiency === tag? "bg-elements text-white" : "bg-lightGreen text-elements"} border border-elements transition-colors duration-300 text-sm cursor-pointer py-2 rounded-lg mr-2 mb-2`}>{tag}</option>
                })
            }
            
        </div> 
    );
}

export default Proficiency;