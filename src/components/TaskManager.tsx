import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("focus-flow-tasks", []);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setInputValue("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full min-h-[500px]">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ListTodo className="text-indigo-600" size={24} />
            Daily Tasks
          </h2>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {completedCount}/{tasks.length} Done
          </span>
        </div>
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500"
            animate={{ width: tasks.length > 0 ? `${(completedCount / tasks.length) * 100}%` : "0%" }}
          />
        </div>
      </header>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 opacity-30 select-none"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ListTodo size={32} />
              </div>
              <p className="text-sm font-medium">No tasks yet</p>
            </motion.div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-center gap-3 p-4 rounded-2xl transition-all border ${
                  task.completed
                    ? "bg-slate-50 border-slate-100"
                    : "bg-white border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`transition-colors ${
                    task.completed ? "text-emerald-500" : "text-slate-300 hover:text-indigo-400"
                  }`}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <span
                  className={`flex-1 text-sm font-medium transition-all ${
                    task.completed ? "text-slate-400 line-through" : "text-slate-700 font-semibold"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 p-2 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
