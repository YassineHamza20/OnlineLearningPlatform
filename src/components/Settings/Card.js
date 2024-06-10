import {NavLink} from 'react-router-dom'
function Card(props) {
    return (
        <NavLink 
        to={props.route}
        className="border cursor-pointer border-darkg p-5 rounded-md flex flex-col space-y-2 hover:bg-lightg transition-colors duration-200 flex-1 min-w-[250px] max-w-[270px]">
            {props.icon}
            <div className="flex text-black items-center">
                <span className="">{props.title}</span>
                {props.next}
            </div>
            <span className="text-sm text-darkg">
                {props.description}
            </span>
        </NavLink>
    );
}

export default Card;