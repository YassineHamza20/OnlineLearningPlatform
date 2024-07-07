import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useLocation } from 'react-router-dom';


export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function VideoCall() {
      //getting the uuid from the url
      const param = useParams()
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const name = searchParams.get('name');
      const roomID = param.uuid;
      let myMeeting = async (element) => {
     // generate Kit Token
     //38617016
      const appID = 146632835;
      //347132c3e7f30ec57ce918f5bdf8b945
      const serverSecret = "f27207e2bb3d846aa514e8a4e9c11858";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), name);

     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({

        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: [ZegoUIKitPrebuilt.OneONoneCall], // To implement 1-on-1 calls, modify the parameter here to .
        },
      })



  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
    
  );
} 


















// import React, { useEffect, useRef } from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// export function getUrlParams(url = window.location.href) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
//   const maxPos = chars.length;
//   for (let i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export default function VideoCall() {
//   const { uuid: roomID } = useParams();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const name = searchParams.get('name');
//   const jitsiContainerRef = useRef(null);

//   console.log('Room ID:', roomID); // Debugging
//   console.log('Name:', name); // Debugging

//   useEffect(() => {
//     if (!roomID) {
//       console.error('Room ID is undefined');
//       return;
//     }

//     const domain = '8x8.vc';  // Use the correct domain for Jitsi Meet API
//     const options = {
//       roomName: `vpaas-magic-cookie-3b0bd970a46948c686edbc6becbcac23/${roomID}`,
//       parentNode: jitsiContainerRef.current,
//       userInfo: {
//         displayName: name || 'Guest'
//       },
//       configOverwrite: {
//         prejoinPageEnabled: false
//       },
//       interfaceConfigOverwrite: {
//         SHOW_JITSI_WATERMARK: false,
//         SHOW_WATERMARK_FOR_GUESTS: false,
//         SHOW_BRAND_WATERMARK: false,
//         SHOW_POWERED_BY: false,
//         TOOLBAR_BUTTONS: [
//           'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
//           'fodeviceselection', 'hangup', 'profile', 'chat', 'recording', 'settings', 'raisehand',
//           'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts', 'tileview',
//           'videobackgroundblur', 'download', 'help', 'mute-everyone'
//         ]
//       },
//       // Uncomment and set your JWT if required
//        jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtM2IwYmQ5NzBhNDY5NDhjNjg2ZWRiYzZiZWNiY2FjMjMvYWZhMjViLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjAzNjk4MTgsImV4cCI6MTcyMDM3NzAxOCwibmJmIjoxNzIwMzY5ODEzLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtM2IwYmQ5NzBhNDY5NDhjNjg2ZWRiYzZiZWNiY2FjMjMiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6Inlhc3NpbmUuaGFtemEiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTAwMjAxMzk0MTQ3MDA3MDk4MTYxIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ5YXNzaW5lLmhhbXphQGVzcHJpdC50biJ9fSwicm9vbSI6IioifQ.jgYZ-VodvmxVabD45KoR3dVYDNhoA4HFThC2ow6ZUrnNXXxSFkGLCCJbfgnduCali-KT83d_79ctVnYZN5vQcYRVlVLnq8ejiYJQNloX5OVu0DS0w7AIw2Xf1PPjvrbihEOziPGYEVzqaHTit5_IA-6c7RYyaerYiwEpgV2xwDG12wHVhYq8lDe2QitTzI5CLpeNddnOYG1eWh3o3WMFvckDnOrVwT2SZ6Z4AXk-_C2YfReO2HpVuG_p0MzlXSqoJglf8XZaY6JO7dOgGNbMcSQNHW0i9_QZTeJ1SQ9SFZqVMpZ-l74m0XsWrBncSJGmF-K9MW14Nbnv19T5KBFAIg"
//     };
//     const api = new window.JitsiMeetExternalAPI(domain, options);

//     return () => api.dispose();
//   }, [roomID, name]);

//   return (
//     <div
//       ref={jitsiContainerRef}
//       style={{ width: '100vw', height: '100vh' }}
//     />
//   );
// }

 