// ImportantTasks.js
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Important = () => {
  const { list: tasks } = useSelector((state) => state.tasks);

  const importantTasks = tasks.filter((task) => task.important); // Filter tasks by importance

  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      <div className="mb-6">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to All Tasks
        </Link>
      </div>

      {/* Display important tasks */}
      {importantTasks.length === 0 ? (
        <p className="text-center dark:text-white">No important tasks.</p>
      ) : (
        <div className="space-y-2">
          {importantTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b-2 bg-white dark:bg-[#232323] dark:border-gray-700 p-3 sm:p-2 sm:w-full sm:h-12 w-auto h-auto"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="task-checkbox"
                />
                <span className="dark:text-white">{task.text}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
              >
                <Star
                  className="h-4 w-4 fill-current text-yellow-500 dark:text-yellow-400"
                />
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Important;
