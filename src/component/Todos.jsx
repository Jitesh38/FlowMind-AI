import React, { useMemo } from "react";
import { useUser } from "../context/UserContextProvider";
import { setData } from "./fireFunctions";

const Spinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6"></div>
    <div className="text-xl text-blue-700 font-semibold">
      Loading your AI-generated tasks...
    </div>
  </div>
);

const parseTodos = (todos) => {
  const { user } = useUser();
  if (!todos) return null;
  if (typeof todos === "object") return todos;
  if (typeof todos === "string") {
    // Remove code block markers and trim
    let str = todos.trim();
    if (str.startsWith("```json")) str = str.slice(7);
    if (str.startsWith("```")) str = str.slice(3);
    if (str.endsWith("```")) str = str.slice(0, -3);
    try {
      let data = JSON.parse(str);
      setData("users", user.uid, data);
      return data;
    } catch (e) {
      return { error: "Could not parse AI response as JSON." };
    }
  }
  return { error: "Invalid tasks format." };
};

const Tasks = () => {
  const { todos, loading } = useUser();

  const parsedTodos = useMemo(() => parseTodos(todos), [todos]);

  if (loading) {
    return <Spinner />;
  }

  if (!parsedTodos || Object.keys(parsedTodos).length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-2xl shadow-2xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No AI-generated tasks yet
          </h2>
          <h2 className="text-gray-400">
            Your AI-generated goals will appear here by day.
          </h2>
        </div>
      </div>
    );
  }

  if (parsedTodos.error) {
    return (
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-2xl shadow-2xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-500">{parsedTodos.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 py-10  px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Your AI-Generated Tasks
        </h1>
        <p className="text-md text-slate-600">
          Each day, focus on a new goal. Stay consistent and watch your skills
          grow!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Object.entries(parsedTodos).map(([day, goal], idx) => (
          <div
            key={day}
            className="bg-slate-100 border border-slate-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700 bg-yellow-300 rounded-full px-3 py-1">
                {day.slice(0, 1).toUpperCase() + day.slice(1)}
              </span>
              <span className="text-xs text-gray-400">Task #{idx + 1}</span>
            </div>

            <h2 className="text-lg font-semibold text-slate-700 mb-1">
              {goal}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
