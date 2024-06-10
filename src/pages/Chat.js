import Leftside from '../components/Chat/Leftside';
import Rightside from '../components/Chat/Rightside';
function Chat () {
return ( <div className="flex h-[90%] antialiased text-gray-800"> {/* Outer container */}
    <div className="flex h-full w-full overflow-x-hidden"> {/* Outer container */}
      <Leftside></Leftside>
      <Rightside></Rightside>
  </div>
  </div>)
}
export default Chat ;