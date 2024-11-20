import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-gray-100 text-blue-900 text-center py-2 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
          <span>30% off storewide — Limited time!</span>
          <Link to="/shop" className="text-blue-800 font-semibold underline ml-2">
            Shop Now &rarr;
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-[8%] py-4 bg-white shadow">
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold text-gray-800">3legant</h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-16 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Shop</li>
          <li className="hover:text-blue-600 cursor-pointer">Product</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
        </ul>

        {/* Search and Profile */}
        <div className="flex items-center space-x-4 relative">
          {/* Search Icon and Input */}
          <div className="flex items-center">
            <motion.div
              initial={{ width: 40 }}
              animate={{ width: isSearchOpen ? 200 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex items-center overflow-hidden bg-gray-100 rounded-full"
            >
              <input
                type="text"
                placeholder="Search..."
                className={`${
                  isSearchOpen ? "w-full p-2" : "w-0"
                } bg-transparent text-sm text-gray-700 outline-none transition-all duration-200`}
                style={{ visibility: isSearchOpen ? "visible" : "hidden" }}
              />
              <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="p-2"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            </motion.div>
          </div>

          {/* Calendar Icon */}
          <div className="hidden md:block">
            <CalendarDays className="w-6 h-6 text-gray-700 cursor-pointer" />
          </div>

          {/* Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Card className="p-2 cursor-pointer">
                <Avatar className="w-8 h-8 rounded-full">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIxMq-CYA33FW2zuhEiDebFP2ul0KkMmElNA&s" alt="User Avatar" />
                </Avatar>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md rounded-lg p-2 w-40">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="block text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={() => {
                    alert("Logged out!");
                  }}
                  className="block text-gray-700 hover:text-red-600 w-full text-left"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-around py-3 bg-gray-100 text-gray-700 text-sm font-medium border-t">
        <span className="hover:text-blue-600 cursor-pointer">Home</span>
        <span className="hover:text-blue-600 cursor-pointer">Shop</span>
        <span className="hover:text-blue-600 cursor-pointer">Product</span>
        <span className="hover:text-blue-600 cursor-pointer">Contact</span>
      </div>
    </div>
  );
}
