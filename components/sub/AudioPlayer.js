import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import Image from 'next/image';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const src = "/audio/bg-forest-lullaby.mp3"

  const icon = {
    'play': {
      name: 'play',
      src: '/play.svg'
    },
    'pause': {
      name: 'pause',
      src: '/pause.svg'
    }
  }

  useEffect(() => {
    // Create a Howl sound instance when the component mounts
    const sound = new Howl({
      src: [src],
      autoplay: true,
      loop: true,
      mute: isMuted,
    });

    // Start playing the sound
    sound.play();

    // Clean up the sound instance when the component unmounts
    return () => {
      sound.unload();
    };
  }, [src, isMuted]);

  const toggleMute = () => {
    Howler.mute(!isMuted);
    setIsMuted(!isMuted);
  };

  return (
    <div>
      <button onClick={toggleMute}>{
        isMuted ?
          <Image
            src={icon.play.src}
            alt={icon.play.name}
            width={30}
            height={30}
          />
          :
          <Image
            src={icon.pause.src}
            alt={icon.pause.name}
            width={30}
            height={30}
          />
      }</button>
    </div>
  );
};

export default AudioPlayer;