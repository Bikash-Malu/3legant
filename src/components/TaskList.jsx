import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bell, Calendar as CalendarIcon, RefreshCcw, Star } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  setLoading,
  setTasks,
  toggleTaskCompletion,
  toggleTaskImportance,
  deleteTask,
} from "./redux/tasksSlice";
import { toast } from "sonner";

import { useLocation } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const { list: tasks } = useSelector((state) => state.tasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [newTask, setNewTask] = useState("");
  const location = useLocation();
  const query = location.state?.query || "";

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(query.toLowerCase())
  );
  const generateTaskId = () => {
    if (tasks.length === 0) {
      return 1;
    }
    const maxId = Math.max(...tasks.map((task) => task.id));
    return maxId + 1;
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: generateTaskId(),
        text: newTask.trim(),
        completed: false,
        important: false,
        date: new Date().toISOString(),
      };
      dispatch(setTasks([...tasks, newTaskObject]));
      setNewTask("");
      toast.success(`Task "${newTask.trim()}" added successfully!`);
    } else {
      toast.error("Task cannot be empty!");
    }
  };
  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        confirmButton: "btn-green",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(taskId));
        toast.success("Task deleted successfully");
      }
    });
  };
  const showMessgae = (name) => {
    // toast.success(` you make ${name} as favourite`)
  };
  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      <div
        className="mb-6"
    
      >
        <input
          type="text"
          autoFocus={false}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(53, 121, 55, 0.1) 0%, rgba(208, 255, 210, 0.1) 100%)",
          }}
          className="w-full px-4  dark:bg-[#2F3630] outline-none rounded-none border-none h-20 focus:ring-0 dark:text-white dark:placeholder-white"
          placeholder="Add A Task"
        />

        <div className="flex items-center justify-between   py-2" style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(53, 121, 55, 0.1) 0%, rgba(208, 255, 210, 0.1) 100%)",
          }}>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4 text-[#232323] dark:text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                fetchTasks();
              }}
            >
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:stroke-white"
              >
                <path
                  d="M16.5001 7.19901V5.00001H7.50008C6.47897 4.99991 5.47473 5.26041 4.58243 5.75685C3.69012 6.25329 2.93928 6.96924 2.40097 7.83693C1.86267 8.70462 1.55471 9.69533 1.50626 10.7153C1.4578 11.7352 1.67045 12.7507 2.12408 13.6655C2.16801 13.7538 2.19412 13.8498 2.20093 13.9481C2.20775 14.0465 2.19512 14.1452 2.16378 14.2387C2.13244 14.3321 2.083 14.4185 2.01828 14.4928C1.95356 14.5672 1.87483 14.6281 1.78658 14.672C1.69833 14.7159 1.60229 14.742 1.50395 14.7489C1.40561 14.7557 1.30689 14.743 1.21343 14.7117C1.11997 14.6804 1.03359 14.6309 0.95924 14.5662C0.884885 14.5015 0.824006 14.4228 0.780079 14.3345C0.212439 13.1909 -0.0538583 11.9213 0.00640834 10.646C0.066675 9.37066 0.451511 8.13184 1.12447 7.04685C1.79742 5.96186 2.73621 5.06663 3.85193 4.44594C4.96764 3.82525 6.22334 3.49966 7.50008 3.50001H16.5001V1.30101C16.5001 1.22975 16.5204 1.15998 16.5587 1.09986C16.5969 1.03974 16.6515 0.99176 16.716 0.961541C16.7806 0.931322 16.8524 0.920114 16.923 0.929228C16.9937 0.938343 17.0603 0.967404 17.1151 1.01301L20.6551 3.96201C20.8351 4.11201 20.8351 4.38801 20.6551 4.53801L17.1151 7.48701C17.0603 7.53261 16.9937 7.56167 16.923 7.57079C16.8524 7.5799 16.7806 7.56869 16.716 7.53847C16.6515 7.50825 16.5969 7.46028 16.5587 7.40016C16.5204 7.34004 16.5001 7.27026 16.5001 7.19901ZM22.2151 7.32801C22.3931 7.23959 22.599 7.22547 22.7874 7.28875C22.9759 7.35204 23.1315 7.48755 23.2201 7.66551C23.7877 8.80912 24.054 10.0787 23.9937 11.354C23.9335 12.6294 23.5486 13.8682 22.8757 14.9532C22.2027 16.0382 21.2639 16.9334 20.1482 17.5541C19.0325 18.1748 17.7768 18.5004 16.5001 18.5H7.50008V20.699C7.50005 20.7703 7.47972 20.84 7.44148 20.9002C7.40323 20.9603 7.34864 21.0083 7.28411 21.0385C7.21958 21.0687 7.14778 21.0799 7.07711 21.0708C7.00644 21.0617 6.93983 21.0326 6.88508 20.987L3.34508 18.038C3.30288 18.0028 3.26892 17.9588 3.24562 17.909C3.22232 17.8592 3.21025 17.805 3.21025 17.75C3.21025 17.6951 3.22232 17.6408 3.24562 17.591C3.26892 17.5412 3.30288 17.4972 3.34508 17.462L6.88508 14.513C6.93983 14.4674 7.00644 14.4383 7.07711 14.4292C7.14778 14.4201 7.21958 14.4313 7.28411 14.4615C7.34864 14.4918 7.40323 14.5397 7.44148 14.5999C7.47972 14.66 7.50005 14.7298 7.50008 14.801V17H16.5001C17.5213 17.0004 18.5257 16.74 19.4182 16.2437C20.3108 15.7474 21.0618 15.0315 21.6003 14.1637C22.1388 13.296 22.4469 12.3052 22.4954 11.2851C22.5439 10.265 22.3313 9.24943 21.8776 8.33451C21.7892 8.15646 21.775 7.9506 21.8383 7.76216C21.9016 7.57371 22.0371 7.41659 22.2151 7.32801Z"
                  fill="#1B281B"
                  className="dark:stroke-white"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
             
              className="dark:text-white"
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:stroke-white"
              >
                <path
                  d="M13 3V1M13 3V5M13 3H8.5M1 9V18C1 18.5304 1.21071 19.0391 1.58579 19.4142C1.96086 19.7893 2.46957 20 3 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V9M1 9H19M1 9V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H5M19 9V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H16.5M5 1V5"
                  stroke="#1B281B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-white"
                />
              </svg>
            </Button>
          </div>
          <Button
            onClick={addTask}
            className="bg-green-100 text-green-500 hover:bg-green-200 dark:bg-green-900 dark:text-white dark:hover:bg-green-700 mx-2"
          >
            ADD TASK
          </Button>
        </div>
      </div>
    
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonTheme
              baseColor="#dbd9d9"
              highlightColor="#6b6969"
              key={index}
            >
              <Skeleton height={50} className="rounded" />
            </SkeletonTheme>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300">
              No tasks found
            </div>
          ) : (
            <>
              {/* Incomplete Tasks */}
              {filteredTasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b-2 bg-white dark:bg-[#232323] dark:border-gray-700 p-3 sm:p-2 sm:w-full sm:h-12 w-auto h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => dispatch(toggleTaskCompletion(task.id))}
                        className="task-checkbox"
                      />
                      <span className="dark:text-white">{task.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(toggleTaskImportance(task.id))}
                      >
                        <Star
                          onClick={showMessgae(task.text)}
                          className={
                            task.important
                              ? "h-4 w-4 fill-current text-yellow-500 dark:text-yellow-400"
                              : "h-4 w-4"
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13h6m2 10.5H7a2 2 0 01-2-2V6h14v15.5a2 2 0 01-2 2z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
            </>
          )}

          {/* Completed Tasks */}
          <div className="mt-6 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Completed Tasks
          </div>
          {filteredTasks
            .filter((task) => task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b-2 bg-white dark:bg-[#232323] dark:border-gray-700 p-3 sm:p-2 sm:w-full sm:h-12 w-auto h-auto"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTaskCompletion(task.id))}
                    className="task-checkbox"
                  />
                  <span className="line-through dark:text-white">
                    {task.text}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(toggleTaskImportance(task.id))}
                  >
                    <Star
                      className={
                        task.important
                          ? "h-4 w-4 fill-current text-yellow-500 dark:text-yellow-400"
                          : "h-4 w-4"
                      }
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m2 10.5H7a2 2 0 01-2-2V6h14v15.5a2 2 0 01-2 2z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </main>
  );
};

export default TaskList;