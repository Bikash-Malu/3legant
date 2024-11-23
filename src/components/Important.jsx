import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NProgress from "nprogress"; // Import NProgress
import "nprogress/nprogress.css"; // Import NProgress CSS

const Important = () => {
  const { list: tasks } = useSelector((state) => state.tasks);

  const [loading, setLoading] = useState(true);
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    // Start NProgress when loading begins
    NProgress.start();

    // Simulate loading delay
    const timeout = setTimeout(() => {
      setImportantTasks(tasks.filter((task) => task.important));
      setLoading(false);
      NProgress.done(); // Stop NProgress when loading ends
    }, 1000); // Adjust timeout duration as needed

    return () => {
      NProgress.done(); // Ensure NProgress stops if the component unmounts early
      clearTimeout(timeout); // Clear timeout
    };
  }, [tasks]);

  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      {/* Back to All Tasks with Arrow */}
      <div className="mb-6 flex items-center gap-2">
        <Link to="/" className="flex items-center text-blue-500 hover:underline">
          <ArrowLeft className="h-5 w-5 text-blue-500" />
          Back to All Tasks
        </Link>
      </div>

      {/* Display loading spinner or skeleton */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonTheme baseColor="#dbd9d9" highlightColor="#6b6969" key={index}>
              <Skeleton height={50} className="rounded" />
            </SkeletonTheme>
          ))}
        </div>
      ) : importantTasks.length === 0 ? (
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
              <Button variant="ghost" size="icon" onClick={() => {}}>
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
