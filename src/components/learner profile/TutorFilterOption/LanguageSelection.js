import { useDispatch, useSelector } from "react-redux";
import { setfilterOptions } from "../../../state/slices/userSlice";

function LanguageSelection(props) {

    const filterOption = useSelector(state => state.userData.filterOptions)
    const dispatch = useDispatch()
    const languages = [
        'French', 
        'English', 
        'Arabic'
    ]

    
    const handleLanguageChange = (e) => {
        dispatch(setfilterOptions({
            type: "language",
            value: e.target.value
        }))
        const data = {...filterOption, language:e.target.value}
        //getting data from server
        props.fetchData(data)
    }

   
    return (
        <select onChange={handleLanguageChange} value={filterOption.language} className="text-center p-[6px] rounded-lg cursor-pointer border border-darkg text-darkg">
            <option disabled value=''>Select Language</option>
            {
            languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
            ))}
        </select>
    );
}

export default LanguageSelection;