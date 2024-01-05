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
