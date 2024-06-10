
import { useEffect, useState } from 'react';
import {IoIosArrowDown} from 'react-icons/io'
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { setCountry } from '../../state/slices/userSlice';
import {setCountry as SetTutorCountry, setCountryFlag} from '../../state/slices/tutorSlice'
import { fetchCountryData } from '../Global/functions';
import ReactLoading from 'react-loading';

function Country(props) {
    //list of countries 
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Côte d'Ivoire",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czechia (Czech Republic)",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        `Eswatini (fmr. "Swaziland")`,
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (formerly Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];
    const learnerData = useSelector(state => state.userData)
    const tutorData = useSelector(state => state.tutorData)

    const Country = props.role === "learner"? learnerData.country : tutorData.Country
    const [countryLocal, setCountryLocal] = useState('')
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()


    //enter edit mode
    const handleClick = () => {
        if(!editing ){
            setEditing(true)
        }
    }
    const handleSave = async() => {
        if(editing) {
            if(countryLocal !== Country){
                try {
                    await props.modifyCall(countryLocal, 'From')
                    if(props.role ==="learner") {
                        dispatch(setCountry(countryLocal))
                    }else {
                        dispatch(SetTutorCountry(countryLocal))
                        setLoading(true)
                        const data = await fetchCountryData(countryLocal)
                        dispatch(setCountryFlag(data))
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
            }
            setEditing(false)
        }
    }

    const handleCountryChange = (e) => {
        setCountryLocal(e.target.value)
    }

    useEffect(() => {
        if(Country){
            setCountryLocal(Country)
        }
    }, [Country])

    console.log("editing from Country Tutor: ", editing);
    return (
        <div onClick={handleClick} className="border-b px-2 hover:bg-lightg cursor-pointer justify-between items-center flex border-lightg py-2">
            <span className="text-black font-bold">
                {props.title}
            </span>
            {
                !editing?
                <>
                    <span className="">{countryLocal}</span>
                    <MdEdit size="17" className=""></MdEdit>
                </>
                :
                <>
                    <div className="flex items-center w-[50%] space-x-3 ">
                        <div className="relative flex flex-col w-full">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                name="Country" value={countryLocal} onChange={handleCountryChange}
                            >
                                <option disabled value="">Select your country</option>
                                {
                                    countries.sort().map((country, index)=> {
                                        return <option key={index} value={country}>{country}</option>
                                    })
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <IoIosArrowDown></IoIosArrowDown>
                            </div>
                        </div>
                        {
                            loading?
                            <ReactLoading type="spin" color="#FFA447" height={'50px'} width={'50px'} />
                            :
                            <div onClick={handleSave} className="px-4 py-2 rounded-md bg-elements text-white"> Save</div>
                        }
                    </div>
                </> 
            }
        </div>
    );
}

export default Country;