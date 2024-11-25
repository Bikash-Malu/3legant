import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Important = () => {
  const { list: tasks } = useSelector((state) => state.tasks);

  const [loading, setLoading] = useState(true);
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    NProgress.start();
    NProgress.configure({ showSpinner: false });
    const timeout = setTimeout(() => {
      setImportantTasks(tasks.filter((task) => task.important));
      setLoading(false);
      NProgress.done(); 
    }, 1000);
    return () => {
      NProgress.done();
      clearTimeout(timeout); 
    };
  }, [tasks]);

  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      <div className="mb-6 flex items-center gap-2">
        <Link to="/" className="flex items-center dark:text-white text-black hover:underline">
          <ArrowLeft className="h-5 w-5 dark:text-white text-black" />
          Back to All Tasks
        </Link>
      </div>
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
             <div className="mt-6 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Important Tasks
          </div>
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
