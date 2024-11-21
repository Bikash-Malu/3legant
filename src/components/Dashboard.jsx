import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import LoadingBar from "react-top-loading-bar";
import {
  AlignVerticalJustifyEnd,
  Bell,
  Calendar,
  Grid,
  LayoutGrid,
  Menu,
  Notebook,
  Plus,
  RefreshCcw,
  Repeat,
  Search,
  Settings,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ModeToggle } from "./ModeToggle";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tasks, setTasks] = useState([
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    setProgress(0);
    let progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#242424]">
      <LoadingBar
        color="#10B981"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className="z-50"
      />
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 border-r bg-white dark:bg-[#232323] p-4 lg:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-8">
          <button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-green-600 dark:text-white" />
          </button>
          <span className="text-2xl font-bold text-green-600 dark:text-white mx-auto mb-3">
            DoIt
          </span>
        </div>
        <div className="bg-[#EEF6EF] dark:bg-[#2C2C2C] rounded-xl p-2">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Avatar className="h-28 w-28 -mt-10">
                <AvatarImage
                  alt="User"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGqdwWyoJhC3d4YV83P9hDj_VBT4R8S5O-A&s"
                />
              </Avatar>
            </div>
            <div className="flex items-center gap-1 mb-6 justify-center">
              <div className="text-sm text-muted-foreground dark:text-gray-300">
                Hey,
              </div>
              <div className="font-medium dark:text-white text-black">
                Bikash
              </div>
            </div>

            <nav className="space-y-2 bg-white dark:bg-[#232323]">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-500"
              >
                <LayoutGrid className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={"/task"}>All Tasks</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={"/today"}>Today</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Star className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={"/importance"}>Important</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Grid className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={"/planned"}>Planned</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <AlignVerticalJustifyEnd className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={"/assign"}>Assigned to me</Link> 
              </Button>
            </nav>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 bg-white dark:bg-[#232323] py-14"
          >
            <Plus className="h-4 w-4 text-[#232323] dark:text-white" />
            Add list
          </Button>

          <Card className="mt-8 p-4 mb-14 dark:bg-[#232323]">
            <div className="mb-2 text-[#232323] dark:text-white">
              Today Tasks
            </div>
            <div className="flex justify-between">
              <div className="text-2xl font-bold mb-4 text-[#232323] dark:text-white">
                11
              </div>
              <div className="bg-gray-300 dark:bg-green-500 h-5 w-5 text-center rounded-full text-white font-bold flex items-center justify-center">
                !
              </div>
            </div>
            <div className="w-32 h-32 mx-auto">
              <CircularProgressbar
                value={progress||progressPercentage}
                text={`${Math.round(progressPercentage)}%`}
                strokeWidth={16}
                styles={buildStyles({
                  textColor: "#10B981",
                  pathColor: "#142E15",
                  trailColor: "#3F9142",
                })}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`fixed z-30 top-0 right-0 transform transition-transform duration-300 h-[100%] ${
          rightSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-64 border-l bg-white dark:bg-[#232323] p-4`}
      >
        <div className="mb-8 h-full ">
          <span className="text-sm border-b-2 max-h-full  text-black font-semibold dark:text-white mx-auto mb-3">
            <div className="flex justify-between items-center mb-4">
              <div> </div>
          
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border p-2   ">
                <Checkbox checked />
                <span>Buy groceries</span>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </li>
              <li className="flex items-center gap-2 border-b-2 border-b-gray-700 p-1    ">
                <Plus className="h-4 w-4" />
                <span>Add Step</span>
              </li>
              <li className="flex items-center  border-b-2 border-b-gray-700 p-1 space-x-2  ">
                <Bell className="h-4 w-4" />
                <span>Set Reminder</span>
              </li>
              <li className="flex items-center  border-b-2 border-b-gray-700 p-1  space-x-2 ">
                <Calendar className="h-4 w-4" />
                <span>Add Due Date</span>
              </li>
              <li className="flex items-center  border-b-2 border-b-gray-700 p-1 space-x-2   ">
                <Repeat className="h-4 w-4" />
                <span>Repeat</span>
              </li>
              <li className="flex items-center  border-b-2 border-b-gray-700 p-1 space-x-2    ">
                <Notebook className="h-4 w-4"/>
                <span>Add Notes</span>
              </li>
            </ul>

            <div className="flex justify-between w-[90%] items-center absolute bottom-0 mx-auto mb-5">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              <div>Created Today</div>
             
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between border-b bg-white dark:bg-[#232323] p-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-14 w-14 text-green-600 dark:text-white" />
          </Button>

          <div className="flex items-center gap-2 justify-end w-full">
            <motion.div
              initial={{ width: 40 }}
              animate={{ width: isSearchOpen ? 200 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex items-center overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              <input
                type="text"
                placeholder="Search..."
                className={`${
                  isSearchOpen ? "w-full p-2" : "w-0"
                } bg-transparent text-sm text-gray-500 dark:text-black outline-none transition-all duration-200 dark:bg-white bg-gray-800`}
                style={{ visibility: isSearchOpen ? "visible" : "hidden" }}
              />
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="p-2"
              >
                <Search className="h-5 w-5 text-green-600 dark:text-white" />
              </button>
            </motion.div>

            <Button
              onClick={() => setRightSidebarOpen(true)}
              variant="ghost"
              size="icon"
            >
              <Grid className="h-6 w-6 text-green-600 dark:text-white" />
            </Button>
            <ModeToggle />
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
