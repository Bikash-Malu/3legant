import React, { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bell, Calendar, RefreshCcw, Star } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch tasks (simulating API call)
  const fetchTasks = () => {
    setLoading(true); // Show skeleton loaders
    setTimeout(() => {
      setTasks([
        { id: 1, text: "Buy groceries", completed: false, important: false },
        { id: 2, text: "Finish project report", completed: false, important: true },
        { id: 3, text: "Call the bank", completed: false, important: false },
        {
          id: 4,
          text: "Schedule dentist appointment",
          completed: false,
          important: false,
        },
        { id: 5, text: "Plan weekend trip", completed: false, important: false },
        { id: 6, text: "Read a book", completed: true, important: false },
        { id: 7, text: "Clean the house", completed: true, important: false },
        { id: 8, text: "Prepare presentation", completed: true, important: false },
        { id: 9, text: "Update blog", completed: true, important: false },
      ]);
      setLoading(false); // Hide skeleton loaders
    }, 2000); // 2-second delay
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      <div className="mb-6">
        <Input
          className="bg-green-50 mb-1 dark:bg-[#2F3630] outline-none rounded-none border-none h-20 focus:ring-0 dark:text-white dark:placeholder-white"
          placeholder="Add A Task"
        />
        <div className="flex items-center justify-between bg-green-50 dark:bg-[#2F3630] py-2">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4 text-[#232323] dark:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                fetchTasks(); // Refresh tasks and show skeleton loaders
              }}
            >
              <RefreshCcw className="h-4 w-4 text-[#232323] dark:text-white" />
            </Button>
            <Button variant="ghost" size="icon">
              <Calendar className="h-4 w-4 text-[#232323] dark:text-white" />
            </Button>
          </div>
          <Button className="bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-500 dark:hover:bg-green-700 mx-2">
            ADD TASK
          </Button>
        </div>
      </div>

      {loading ? (
        // Show skeleton loaders while loading
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonTheme baseColor="#242424" highlightColor="#f5f5f5" key={index}>
              <Skeleton height={50} className="rounded" />
            </SkeletonTheme>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b-2 bg-white dark:bg-[#232323] dark:border-gray-700 p-3 sm:p-2 sm:w-full sm:h-12 w-auto h-auto"
              >
                <div className="flex items-center gap-3">
                  <Checkbox className="h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 dark:border-gray-600 dark:checked:bg-green-600" />
                  <span className="dark:text-white">{task.text}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Star
                    className={
                      task.important
                        ? "h-4 w-4 fill-current text-yellow-500 dark:text-yellow-400"
                        : "h-4 w-4"
                    }
                  />
                </Button>
              </div>
            ))}

          <div className="mt-6 mb-2 text-sm font-medium text-gray-700 dark:text-white">
            Completed
          </div>

          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b-2 bg-white dark:bg-[#232323] dark:border-gray-700 p-3 sm:p-2 sm:w-full sm:h-12 w-auto h-auto"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked
                    className="h-4 w-4 border-gray-300 checked:bg-green-500 checked:border-green-500 dark:border-gray-600 dark:checked:bg-green-600"
                  />
                  <span className="line-through dark:text-gray-400">
                    {task.text}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </div>
            ))}
        </div>
      )}
    </main>
  );
};

export default Task;
