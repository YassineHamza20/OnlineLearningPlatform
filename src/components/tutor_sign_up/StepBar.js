import Phase from './Phase'

function StepBar() {
    const steps = [
        'Welcome!',
        'Intro',
        'Profile',
        'Wifi Test'
    ]
    return (
        <div className="w-full justify-between h-[10%] flex ">
            {
                steps.map((phase, index) => {
                    return <Phase key={index} index={index} label={phase} ></Phase>
                })
            }
        </div>
    );
}

export default StepBar;