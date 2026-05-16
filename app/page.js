"use client";

import { useState, useRef } from "react";

export default function RhythmOS() {
  const [mode, setMode] = useState("home");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const [ideas, setIdeas] = useState([]);
  const [input, setInput] = useState("");

  const weeklyPlan = {
    1: [
      { time: "10-13", task: "Studio profondo" },
      { time: "14-16", task: "Studio leggero" },
      { time: "18-20", task: "Musica" }
    ],
    2: [
      { time: "10-13", task: "Studio" },
      { time: "21-23:30", task: "Volley" }
    ],
    3: [
      { time: "10-13", task: "Studio profondo" },
      { time: "17-19", task: "Musica" }
    ],
    4: [
      { time: "10-13", task: "Studio" },
      { time: "21-23:30", task: "Volley" }
    ],
    5: [
      { time: "10-13", task: "Studio" },
      { time: "17-20", task: "Musica" }
    ],
    6: [
      { time: "12-14", task: "Studio leggero" },
      { time: "16-18", task: "Musica libera" }
    ],
    0: [
      { time: "giorno", task: "Reset / idee / ascolto" }
    ]
  };

  const today = weeklyPlan[new Date().getDay()];

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  const format = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

  const addIdea = () => {
    if (!input) return;
    setIdeas([{ text: input, time: new Date().toLocaleString() }, ...ideas]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>

      <h1>RhythmOS</h1>

      {/* NAV */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setMode("home")}>Home</button>
        <button onClick={() => setMode("study")}>Studio</button>
        <button onClick={() => setMode("music")}>Musica</button>
        <button onClick={() => setMode("ideas")}>Idee</button>
      </div>

      {/* HOME */}
      {mode === "home" && (
        <div>
          <h2>Oggi</h2>
          {today.map((t,i) => (
            <div key={i}>
              {t.time} — {t.task}
            </div>
          ))}

          <h2>Timer</h2>
          <div>{format(seconds)}</div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      )}

      {/* IDEE */}
      {mode === "ideas" && (
        <div>
          <input value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={addIdea}>Aggiungi</button>

          {ideas.map((i, idx) => (
            <div key={idx}>
              {i.text} ({i.time})
            </div>
          ))}
        </div>
      )}

      {/* STUDY / MUSIC */}
      {mode === "study" && <div>Sezione studio</div>}
      {mode === "music" && <div>Sezione musica</div>}

    </div>
  );
}
