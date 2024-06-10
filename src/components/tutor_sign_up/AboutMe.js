import ProfileField from "./ProfileField";

function AboutMe(props) {
    return (
        <ProfileField icon={props.icon} title={props.title} placeholder={props.placeholder}></ProfileField>
    );
}

export default AboutMe;