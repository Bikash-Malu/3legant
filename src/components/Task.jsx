import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bell, Calendar as CalendarIcon, RefreshCcw, Star } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios"; // Import Axios
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  setLoading,
  setTasks,
  toggleTaskCompletion,
  toggleTaskImportance,
  deleteTask,
} from "./redux/tasksSlice";
import { toast } from "sonner";
import { Calendar } from "./ui/calendar"; // Import ShadCN UI Calendar
import { useLocation } from "react-router-dom";

const Task = () => {
  const dispatch = useDispatch();
  const { list: tasks, loading } = useSelector((state) => state.tasks);

  // Local state for new task input
  const [newTask, setNewTask] = useState("");

  // Calendar state
  const [calendarVisible, setCalendarVisible] = useState(false); // Toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date

  // Fetch tasks from the API
  const fetchTasks = async () => {
    dispatch(setLoading(true)); // Show loading state immediately
    try {
      setTimeout(async () => {
        try {
          const response = await axios.get(
            "https://mocki.io/v1/ba43e6bf-766f-41da-9112-344ca76d2db2"
          );
          dispatch(setTasks(response.data)); // Assuming the API returns an array of tasks
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to fetch tasks");
        } finally {
          dispatch(setLoading(false)); // Hide loading state after the fetch is complete
        }
      }, 1000); // 1 second delay
    } catch (error) {
      dispatch(setLoading(false)); // Ensure loading is turned off if something fails
    }
  };
  const location = useLocation(); // Access location object

  // Get the query state from the location
  const query = location.state?.query || "";
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: tasks.length + 1,
        text: newTask.trim(),
        completed: false,
        important: false,
        date: selectedDate || new Date().toISOString(), // Use selected date or the current date
      };
      dispatch(setTasks([...tasks, newTaskObject]));
      setNewTask(""); // Clear input

      // Trigger Sonner toast notification
      toast.success(`Task "${newTask.trim()}" added successfully!`);
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
    toast.success(`Selected Date: ${date.toLocaleDateString()}`);
  };
  

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  // Handle task deletion with SweetAlert2 confirmation
  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        confirmButton: 'btn-green', // Add custom class to confirm button
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(taskId)); // Proceed with the task deletion if confirmed
        toast.success("Task deleted successfully");
      }
    });
  };
  
  return (
    <main className="p-4 dark:bg-[#242424] z-10">
    <div className="mb-6">
      <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
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
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCalendar} // Toggle calendar visibility
          >
            <CalendarIcon className="h-4 w-4 text-[#232323] dark:text-white" />
          </Button>
        </div>
        <Button
          onClick={addTask}
          className="bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-500 dark:hover:bg-green-700 mx-2"
        >
          ADD TASK
        </Button>
      </div>
    </div>
  
    {/* Display Calendar Modal with Close Button */}
    {calendarVisible && (
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black text-white shadow-lg rounded-md p-4 z-50">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg">Select a Date</h3>
          <button
            onClick={handleCloseCalendar}
            className="text-white text-sm "
          >
            X
          </button>
        </div>
        <Calendar mode="single" onDateChange={handleDateSelect} />
      </div>
    )}
  
    {/* Task List */}
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
        {/* Display filtered tasks */}
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
                      onClick={() => handleDeleteTask(task.id)} // Use SweetAlert2 confirmation
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
        {tasks
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
                <span className="line-through dark:text-white">{task.text}</span>
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
                  onClick={() => handleDeleteTask(task.id)} // Use SweetAlert2 confirmation
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

export default Task;
