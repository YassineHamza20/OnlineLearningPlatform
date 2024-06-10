
export default function Sendmsg(props) {

  const handleTime= () => {
    const date = new Date(props.msg.MessageTime);

    // Get the day, month, year, hours, minutes, and seconds from the Date object
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate
  }

  return (
    <div  className="col-start-6 group col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <img
          className="object-cover self-start h-10 w-10 rounded-full"
          src={props.img}
          alt="Myimage"
        />
        <div className="relative max-w-full sm:max-w-sm md:max-w-full lg:max-w-lg xl:max-w-xl mr-3 text-sm bg-cellColor py-2 px-4 shadow rounded-xl break-words">
          <div>{props.msg.message}</div>
        </div>
        <div className="text-xs transition-all duration-150 group-hover:block hidden mr-3 text-darkg">
            {
              handleTime()
            }
        </div>
      </div>
    </div>
  );
}
