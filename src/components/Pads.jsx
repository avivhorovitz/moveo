import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Grid = {
  display: "grid",
  gridColumnGap: "50px",
  gridTemplateColumns: "7em 7em 7em",
  gridTemplateRows: "6em 6em 6em",
  padding: "10px",
};

const Pads = ({
  _songData,
  _currentSong,
  _handleSongClick,
  _handlSongPause,
}) => {
  return (
    <>
      <div styles={Grid}>
        {_songData.map((s, index) => {
          return (
            <div
              styles={{ border: "12px", padding: "20px", textAlign: "center" }}
            >
              <h2
                styles={{
                  color: "#7c795d",
                  fontFamily: "source-sans-pro ",
                  fontSize: "10px",
                  fontWeight: "200",

                  margin: "0 0 24px",
                }}
              >
                {s.name}
              </h2>
              <Button
                style={{
                  background:
                    index == _currentSong ? "DarkOliveGreen" : "DarkRed",
                  margin: "10px",
                }}
                variant='dark'
                onClick={() => {
                  _handleSongClick(index);
                }}
              >
                Play
              </Button>
              <Button
                style={{
                  background:
                    index == _currentSong ? "DarkRed" : "DarkOliveGreen",
                }}
                onClick={() => _handlSongPause(index)}
              >
                Pause
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Pads;
