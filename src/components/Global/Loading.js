import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div className="flex flex-col space-y-2 items-center justify-center h-full w-full">
            <ReactLoading type="spin" color="#FFA447" height={'40px'} width={'40px'} />
            <span className="text-button text-center font-bold text-base">Hang tight, we're working...</span>
            <span className="text-button text-center text-sm">We're double-checking your informations</span>
        </div>
    );
}

export default Loading;