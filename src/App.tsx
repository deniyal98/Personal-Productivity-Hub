/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Zap, Calendar, ArrowRight, Settings, Info } from "lucide-react";
import { motion } from "motion/react";
import FocusTimer from "./components/FocusTimer";
import TaskManager from "./components/TaskManager";

export default function App() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-100"
            >
              <Zap size={12} fill="currentColor" />
              FOCUSFLOW PRO
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
              Personal Productivity <span className="text-indigo-600 italic">Hub</span>
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" />
              {today}
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
              <Info size={20} />
            </button>
            <button className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
              <Settings size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all group active:scale-95">
              Dashboard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </nav>
        </header>

        {/* Main Content Grid */}
        <main className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Focus Engine</h3>
              <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
            </div>
            <FocusTimer />
            
            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Did you know?</h4>
                <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                  The Pomodoro Technique helps you maintain focus by breaking work into 25-minute intervals.
                </p>
                <button className="text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-full transition-colors inline-flex items-center gap-2">
                  Learn more <ArrowRight size={14} />
                </button>
              </div>
              <Zap className="absolute -bottom-8 -right-8 w-32 h-32 text-indigo-500 opacity-20 rotate-12" />
            </div>
          </section>

          <section className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Task Workflow</h3>
              <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
            </div>
            <TaskManager />
            
            {/* Footer Tagline */}
            <div className="mt-auto pt-8 flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              <span>Built for efficiency</span>
              <span>v1.0.4 - Local State</span>
            </div>
          </section>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
}
