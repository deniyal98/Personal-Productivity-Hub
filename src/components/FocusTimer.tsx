import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      // Play a sound or notification could go here
      const nextMode = mode === "focus" ? "break" : "focus";
      const nextTime = nextMode === "focus" ? FOCUS_TIME : BREAK_TIME;
      setMode(nextMode);
      setTimeLeft(nextTime);
      setIsActive(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress =
    1 - timeLeft / (mode === "focus" ? FOCUS_TIME : BREAK_TIME);

  return (
    <div className="bg-[#151619] p-8 rounded-3xl shadow-2xl border border-[#2A2B2E] text-center max-w-sm w-full mx-auto">
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => switchMode("focus")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all shadow-md flex items-center gap-2 ${
            mode === "focus"
              ? "bg-[#2A2B2E] text-white border border-[#3A3B3E] shadow-inner"
              : "text-[#8E9299] hover:text-white"
          }`}
        >
          {mode === "focus" && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />}
          FOCUS
        </button>
        <button
          onClick={() => switchMode("break")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all shadow-md flex items-center gap-2 ${
            mode === "break"
              ? "bg-[#2A2B2E] text-white border border-[#3A3B3E] shadow-inner"
              : "text-[#8E9299] hover:text-white"
          }`}
        >
          {mode === "break" && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
          BREAK
        </button>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-10">
        {/* Simple Ring Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-[#2A2B2E]"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="10 5"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            className={mode === "focus" ? "stroke-indigo-500" : "stroke-orange-500"}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="553"
            initial={{ strokeDashoffset: 553 }}
            animate={{ strokeDashoffset: 553 * (1 - progress) }}
            transition={{ ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={timeLeft}
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`font-mono text-5xl font-bold tracking-tighter ${
              mode === "focus" ? "text-indigo-400" : "text-orange-400"
            }`}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="text-[10px] font-mono text-[#8E9299] mt-2 tracking-[0.2em] uppercase opacity-50">
            {isActive ? "Active" : "Paused"}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button
          onClick={toggleTimer}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? "bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20"
              : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 hover:bg-indigo-500/20"
          }`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-14 h-14 rounded-full bg-[#2A2B2E]/50 text-[#8E9299] border border-[#3A3B3E]/30 flex items-center justify-center hover:bg-[#2A2B2E] transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
      
      {mode === "break" && !isActive && timeLeft === BREAK_TIME && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl flex items-center gap-3 text-orange-200/70 text-sm italic justify-center"
        >
          <Coffee size={16} />
          Time for a breather
        </motion.div>
      )}
    </div>
  );
}
