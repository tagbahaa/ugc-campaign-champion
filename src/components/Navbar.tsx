import { useState } from "react";
import { Bell, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [notificationCount] = useState(3);

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                VairuVision
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/campaigns/new"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </Link>

            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-200">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
