import React from 'react'

export default function Features() {
  return (
    <div className='px-[20px] lg:px-[120px] py-8'>
       {/* feature highlighting */}
    <div className="flex flex-col text-center items-center bg-backg">
     <div className="text-black font-bold items-center text-4xl mt-32">
       Unleash Your Linguistic Potential: Discover the Benefits of <span className="text-button2">LUNGUIFY</span>
     </div>
     <div className="text-gray-500 text-xl mt-2">
       Empower your teaching and learning experience with all-in-one tools and resources, tailored for dynamic educational environments.
     </div>
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
       {/* Replace the icons and texts with your own */}
       <div className="flex flex-col items-center">
         <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 14 14">
           <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
             <path d="M3.48 10.533a1.141 1.141 0 1 0 0-2.283a1.141 1.141 0 0 0 0 2.283m-2.055 2.946a2.06 2.06 0 0 1 .267-.993a2.077 2.077 0 0 1 1.788-1.045a2.077 2.077 0 0 1 1.787 1.045c.172.303.263.645.267.993m4.991-2.946a1.141 1.141 0 1 0 0-2.283a1.141 1.141 0 0 0 0 2.283M8.47 13.479a2.06 2.06 0 0 1 .267-.993a2.077 2.077 0 0 1 1.787-1.045a2.058 2.058 0 0 1 2.055 2.037m-5.58-9.431a1.065 1.065 0 1 0 0-2.13a1.065 1.065 0 0 0 0 2.13M5.008 6.718c.003-.337.092-.668.258-.962A2.013 2.013 0 0 1 7 4.743c.71.001 1.383.394 1.733 1.013c.166.294.255.625.259.962"></path>
             <path d="M11.782.545H2.218a.718.718 0 0 0-.718.718V6c0 .397.322.718.718.718h9.564A.718.718 0 0 0 12.5 6V1.263a.718.718 0 0 0-.718-.718"></path>
           </g>
         </svg>
         <div className="text-sm">Unlimited Webinairs</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 2 20 20">
         <path fill="currentColor" d="m17.331 3.461l.11.102l.102.11a1.928 1.928 0 0 1-.103 2.606l-3.603 3.617a1.892 1.892 0 0 1-.794.477l-1.96.591a.841.841 0 0 1-1.047-.567a.851.851 0 0 1 .005-.503l.621-1.942c.093-.289.252-.55.465-.765l3.612-3.625a1.904 1.904 0 0 1 2.592-.1m-1.884.806l-3.611 3.626a.906.906 0 0 0-.221.363l-.533 1.664l1.672-.505c.14-.042.27-.12.374-.224l3.603-3.617a.929.929 0 0 0 .06-1.24l-.06-.065l-.064-.06a.904.904 0 0 0-1.22.058M12.891 4H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7.134l-1 1.004V13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.23c.573-.486 1.34-1.11 2.074-1.535c.41-.237.772-.39 1.062-.439c.281-.048.423.01.51.098a.327.327 0 0 1 .106.185a.59.59 0 0 1-.04.276c-.093.276-.31.602-.602 1.01l-.094.132c-.252.35-.538.747-.736 1.144c-.225.447-.392.995-.204 1.557c.17.508.498.845.926 1.011c.402.156.844.144 1.236.073c.785-.14 1.584-.552 2.02-.813a.5.5 0 0 0-.515-.858c-.399.24-1.075.578-1.681.687c-.303.054-.537.042-.698-.021c-.136-.053-.26-.153-.34-.395c-.062-.188-.03-.435.15-.793c.16-.32.396-.649.656-1.01l.093-.131c.276-.386.587-.832.737-1.273c.077-.229.122-.486.08-.753a1.323 1.323 0 0 0-.386-.736c-.397-.396-.914-.456-1.386-.376c-.462.079-.945.3-1.394.559c-.546.315-1.096.722-1.574 1.104V7a2 2 0 0 1 2-2h6.895z"></path>
       </svg>
       <div className="text-sm">White Board</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 36 36">
         <path fill="currentColor" d="M30 9H16.42l-2.31-3.18A2 2 0 0 0 12.49 5H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2m0 20H6V13h7.31a2 2 0 0 0 2-2H6V7h6.49l2.61 3.59a1 1 0 0 0 .81.41H30Z" className="clr-i-outline clr-i-outline-path-1"></path>
         <path fill="currentColor" d="M21.91 22.48a2.06 2.06 0 0 0-1.44.62l-5.72-2.66V20l5.66-2.65a2.08 2.08 0 1 0 .06-2.94a2.12 2.12 0 0 0-.64 1.48v.23l-5.64 2.66a2.08 2.08 0 1 0-.08 2.95l.08-.08l5.67 2.66v.3a2.09 2.09 0 1 0 2.08-2.1Z" className="clr-i-outline clr-i-outline-path-2"></path>
         <path fill="none" d="M0 0h36v36H0z"></path>
       </svg>

         <div className="text-sm">File Sharing</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 512 512">
         <circle cx="256" cy="56" r="40" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"></circle>
         <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" d="M204.23 274.44c2.9-18.06 4.2-35.52-.5-47.59c-4-10.38-12.7-16.19-23.2-20.15L88 176.76c-12-4-23.21-10.7-24-23.94c-1-17 14-28 29-24c0 0 88 31.14 163 31.14s162-31 162-31c18-5 30 9 30 23.79c0 14.21-11 19.21-24 23.94l-88 31.91c-8 3-21 9-26 18.18c-6 10.75-5 29.53-2.1 47.59l5.9 29.63l37.41 163.9c2.8 13.15-6.3 25.44-19.4 27.74S308 489 304.12 476.28l-37.56-115.93q-2.71-8.34-4.8-16.87L256 320l-5.3 21.65q-2.52 10.35-5.8 20.48L208 476.18c-4 12.85-14.5 21.75-27.6 19.46s-22.4-15.59-19.46-27.74l37.39-163.83Z"></path>
       </svg>

         <div className="text-sm">Accessibility</div>
       </div>
     </div>
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 lg:mt-12 mb-12">
       {/* Replace the icons and texts with your own */}
       <div className="flex flex-col items-center ">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
         <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 11V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h4m4 5v-4a2 2 0 1 1 4 0v4m-4-2h4m3-4v6"></path>
       </svg>

         <div className="text-sm">Virtual Assistant</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 48 48">
         <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
           <circle cx="24" cy="11" r="7"></circle>
           <path d="M4 41c0-8.837 8.059-16 18-16m5 6h14v10H27zm10 0v-3a3 3 0 1 0-6 0v3"></path>
         </g>
       </svg>

         <div className="text-sm">User Privacy</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
         <path fill="currentColor" d="M13.09 20c.12.72.37 1.39.72 2H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h8l6 6v5.09c-.33-.05-.66-.09-1-.09c-.34 0-.67.04-1 .09V9h-5V4H6v16zM23 17l-3-2.5V16h-4v2h4v1.5zm-5 1.5L15 21l3 2.5V22h4v-2h-4z"></path>
       </svg>
         <div className="text-sm">File Transfer</div>
       </div>
       <div className="flex flex-col items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
         <path fill="currentColor" d="M23 2H1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m-1 18h-2v-1h-5v1H2V4h20zM10.29 9.71A1.71 1.71 0 0 1 12 8c.95 0 1.71.77 1.71 1.71c0 .95-.76 1.72-1.71 1.72s-1.71-.77-1.71-1.72m-4.58 1.58c0-.71.58-1.29 1.29-1.29a1.29 1.29 0 0 1 1.29 1.29c0 .71-.58 1.28-1.29 1.28c-.71 0-1.29-.57-1.29-1.28m10 0A1.29 1.29 0 0 1 17 10a1.29 1.29 0 0 1 1.29 1.29c0 .71-.58 1.28-1.29 1.28c-.71 0-1.29-.57-1.29-1.28M20 15.14V16H4v-.86c0-.94 1.55-1.71 3-1.71c.55 0 1.11.11 1.6.3c.75-.69 2.1-1.16 3.4-1.16c1.3 0 2.65.47 3.4 1.16c.49-.19 1.05-.3 1.6-.3c1.45 0 3 .77 3 1.71"></path>
       </svg>

         <div className="text-sm">Innovative Classrooms</div>
       </div>
     </div>
   </div>
   </div>
  )
}