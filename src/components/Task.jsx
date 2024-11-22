import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bell, Calendar as CalendarIcon, RefreshCcw, Star } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios"; // Import Axios
import { setLoading, setTasks, toggleTaskCompletion, toggleTaskImportance } from "./redux/tasksSlice";
import { toast } from "sonner";
import { Calendar } from "./ui/calendar"; // Import ShadCN UI Calendar

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
    setCalendarVisible(false); // Close calendar after selecting the date
    toast.success(`Selected Date: ${date.toLocaleDateString()}`); // Show toast notification
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false); // Close the calendar when the close button is clicked
  };

  return (
    <main className="p-4 dark:bg-[#242424] z-10">
      {/* Input Field for New Tasks */}
      <div className="mb-6">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask(); // Add task when Enter is pressed
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
            <SkeletonTheme baseColor="#dbd9d9" highlightColor="#6b6969" key={index}>
              <Skeleton height={50} className="rounded" />
            </SkeletonTheme>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Incomplete Tasks */}
          {tasks
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
                    onChange={() => dispatch(toggleTaskCompletion(task.id))} // This toggles the task completion
                    className="task-checkbox"
                  />
                  <span className="dark:text-white">{task.text}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(toggleTaskImportance(task.id))} // Toggle importance
                >
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

          {/* Completed Tasks */}
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
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTaskCompletion(task.id))} // Toggle completion status
                    className="task-checkbox"
                  />
                  <span className="line-through dark:text-gray-400">
                    {task.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(toggleTaskImportance(task.id))} // Toggle importance
                >
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
