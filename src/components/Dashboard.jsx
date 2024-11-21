import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import {
    AlignVerticalJustifyEnd,
  Bell,
  Calendar,
  Grid,
  LayoutGrid,
  Menu,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  Star,
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
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="flex h-[100%] bg-gray-50 dark:bg-[#242424]">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 transform transition-transform duration-300  ${
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
              <div className="text-sm text-muted-foreground dark:text-gray-300">Hey,</div>
              <div className="font-medium dark:text-white text-black">Bikash</div>
            </div>

            <nav className="space-y-2 bg-white dark:bg-[#232323]">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-500">
                <LayoutGrid className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={'/task'}>
                All Tasks
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Calendar className="h-4 w-4 text-[#232323] dark:text-white" />
                <Link to={'/'}>
                Today
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Star className="h-4 w-4 text-[#232323] dark:text-white" />
                Important
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Grid className="h-4 w-4 text-[#232323] dark:text-white" />
                Planned
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <AlignVerticalJustifyEnd className="h-4 w-4 text-[#232323] dark:text-white" />
                Assigned to me
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
            <div className="mb-2 text-[#232323] dark:text-white">Today Tasks</div>
            <div className="flex justify-between">
              <div className="text-2xl font-bold mb-4 text-[#232323] dark:text-white">11</div>
              <div className="bg-gray-300 dark:bg-green-500 h-5 w-5 text-center rounded-full text-white font-bold flex items-center justify-center">
                !
              </div>
            </div>
            <div className="w-32 h-32 mx-auto">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
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
              animate={{ width: isSearchOpen ? 250 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex items-center overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              <input
                type="text"
                placeholder="Search..."
                className={`${
                  isSearchOpen ? "w-full p-2" : "w-0"
                } bg-transparent text-sm text-gray-700 dark:text-white outline-none transition-all duration-200`}
                style={{ visibility: isSearchOpen ? "visible" : "hidden" }}
              />
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="p-2"
              >
                <Search className="w-5 h-5 text-gray-700 dark:text-white" />
              </button>
            </motion.div>
            <Button variant="ghost" size="icon">
              <Grid className="h-4 w-4 text-gray-700 dark:text-white" />
            </Button>
          
            <ModeToggle />
          </div>
        </header>
<div className="scroll-auto">
  <Outlet/>
</div>

      </div>
    </div>
  );
}
