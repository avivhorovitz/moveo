import React, { useState, useEffect } from "react";
import Pads from "./Pads";
import { Button } from "react-bootstrap";





const importAll = async (r) => {
  return r.keys().map(r);
};

const LoopMachine = () => {
  const [isLoop, setIsLoop] = useState(false); //
  const [currentSong, setCurrentSong] = useState(0);
  const [songsData, setSongsData] = useState([]);
  const [skipSong, setSkipSong] = useState(new Set());
  const [nextSong, setNextSong] = useState(currentSong + 1);

  useEffect(() => {
    let allData = [];

    const initSongs = async () => {
      let songs = await importAll(
        require.context("../sounds", false, /\.mp3$/)
      );

      await songs.map((s, i) => {
        allData.push({
          name: `Song  ${i + 1}`,
          url: s.default,
          audio: new Audio(s.default),
          isPlay: false,
        });
      });

      setSongsData(allData);
    };

    initSongs();
  }, []);

  useEffect(() => {
    let tempSongsState = songsData;
    if (tempSongsState === undefined || tempSongsState.length === 0) return;

    let tempSong = songsData[currentSong];
    if (tempSong === undefined) return;

    let skip = skipSong.has(currentSong);
    if (skip) {
      let tempSet = new Set(skipSong);
      tempSet.delete(currentSong);
      setSkipSong(tempSet);
      setCurrentSong((currentSong + 1) % 9);
      return;
    }

    if (isLoop) {
      tempSong.isPlay = true;

      tempSong.audio.play();
      tempSongsState[currentSong] = tempSong;

      tempSong.audio.addEventListener("ended", handleSongEnded);
    } else {
      tempSong.isPlay = false;
      tempSong.audio.pause();
      tempSongsState[currentSong] = tempSong;
    }
    setSongsData([...tempSongsState]);

    return tempSong.audio.removeEventListener("ended", () =>
      console.log(`remove ${tempSong.url} listener`)
    );
  }, [isLoop, currentSong, nextSong]);

  const handleSongEnded = () => {
    console.log(`song number ${currentSong} ended`);
    let tempCurrent = currentSong;

    setCurrentSong((currentSong + 1) % 9);
  };

  const handlSongPause = (index) => {
    let tempSet = new Set(skipSong);
    tempSet.add(index);
    setSkipSong(tempSet);
    console.log(skipSong, "current index to be skipped");
  };

  const handleSongClicked = (index) => {
    let tempSet = new Set();
    let start = currentSong;
    let end = index;

    if (start >= end) {
      end = end + songsData.length;
    }

    for (start; start < end; start++) {
      tempSet.add(start % 9);
    }
    setSkipSong(tempSet);
    //
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "HoneyDew",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <h1
          style={{
            color: "#7c795d",
            fontFamily: "Trocchi serif",
            fontSize: "45px",
            fontWeight: "normal",
            lineHeight: "48px",
            margin: "0",
          }}
        >
          Loop Machine
        </h1>
        <div style={{ background: "Lavender" }}>
          <Pads
            _songData={songsData}
            _currentSong={currentSong}
            _handleSongClick={handleSongClicked}
            _handlSongPause={handlSongPause}
          />
        </div>

        <div>
          <Button
            styles={{ margin: "10px" }}
            variant='primary'
            onClick={() => {
              setIsLoop(true);
            }}
          >
            Play loop
          </Button>
          <Button
            styles={{ margin: "10px" }}
            variant='primary'
            onClick={() => {
              setIsLoop(false);
            }}
          >
            Pause Loop
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoopMachine;
