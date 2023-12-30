// import React, { useEffect, useState } from 'react';
// import { Howl, Howler } from 'howler';
// import Image from 'next/image';

// const AudioPlayer = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const src = "/audio/bg-forest-lullaby.mp3"

//   const icon = {
//     'play': {
//       name: 'play',
//       src: '/play.svg'
//     },
//     'pause': {
//       name: 'pause',
//       src: '/pause.svg'
//     }
//   }

//   useEffect(() => {
//     // Create a Howl sound instance when the component mounts
//     const sound = new Howl({
//       src: [src],
//       autoplay: true,
//       loop: true,
//       // mute: isMuted,
//     });

//     // Start playing the sound
//     sound.play();
//     Howler.volume(0.3);

//     // Clean up the sound instance when the component unmounts
//     return () => {
//       sound.unload();
//     };
//   }, [src, isMuted]);

//   const toggleMute = () => {
//     Howler.mute(!isMuted);
//     setIsMuted(!isMuted);
//   };

//   return (
//     <div>
//       <button onClick={toggleMute}>{
//         isMuted ?
//           <Image
//             src={icon.play.src}
//             alt={icon.play.name}
//             width={30}
//             height={30}
//           />
//           :
//           <Image
//             src={icon.pause.src}
//             alt={icon.pause.name}
//             width={30}
//             height={30}
//           />
//       }</button>
//     </div>
//   );
// };

// export default AudioPlayer;

import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import Image from "next/image";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState(null);
  const src = "/audio/bg-forest-lullaby.mp3";

  const howlConfig = {
    src: [src],
    autoplay: true,
    loop: true,
    volume: 0.5, //volume
  };



  useEffect(() => {
    const storedPlaybackState = localStorage.getItem("audioPlaybackState");
    const initialIsPlaying = storedPlaybackState
      ? JSON.parse(storedPlaybackState)
      : true;
    setIsPlaying(initialIsPlaying);



    const newSound = new Howl(howlConfig);
    setSound(newSound);

    return () => {
      newSound.unload();
    };
  }, [src]);



  useEffect(() => {
    if (sound) {
      isPlaying ? sound.play() : sound.pause();
      localStorage.setItem("audioPlaybackState", JSON.stringify(isPlaying));
    }
  }, [isPlaying, sound]);



  // const { play, pause } = {
  //   play: { name: "play", src: "/play.svg" },
  //   pause: { name: "pause", src: "/pause.svg" },
  // };


  const { play, pause } = {
    play: { name: "play", src: "/play.png" },
    pause: { name: "pause", src: "/pause.png" },
  };


  const togglePlayPause = () => {
    if (sound) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <button onClick={togglePlayPause}>
        <Image
          src={isPlaying ? pause.src : play.src}
          alt={isPlaying ? pause.name : play.name}
          width={35}
          height={35}
          className="pt-2"
        />
      </button>
    </div>
  );
};

export default AudioPlayer;
