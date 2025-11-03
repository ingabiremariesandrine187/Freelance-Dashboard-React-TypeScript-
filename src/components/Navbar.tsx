import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Home,
  Package,
  Users,
  DollarSign,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: Package },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Payments", path: "/payments", icon: DollarSign },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white shadow-lg hover:shadow-indigo-400/50 transition-all"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop sidebar */}
      <nav
        className={`hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-[#6a11cb] to-[#2575fc]`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all">
              <ShoppingBag className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-white">Freelance Hub</span>
            )}
          </Link>
        </div>

        {/* Links */}
        <div className="flex-1 py-6 px-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-white/20 text-white shadow-inner"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive(link.path) ? "scale-110" : "group-hover:scale-110"
                  } transition-transform`}
                />
                {!isCollapsed && <span>{link.name}</span>}
                {isActive(link.path) && !isCollapsed && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Collapse button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Toggle sidebar"
          >
            <ChevronRight
              className={`h-5 w-5 transition-transform ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile view */}
      {isMobileOpen && (
        <nav className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#6a11cb] to-[#2575fc] shadow-xl flex flex-col">
            <div className="p-6 border-b border-white/10">
              <Link
                to="/"
                className="flex items-center space-x-3"
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="p-2 bg-white/10 rounded-xl">
                  <ShoppingBag className="h-7 w-7 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Freelance Hub</span>
              </Link>
            </div>

            <div className="flex-1 py-6 px-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive(link.path)
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                    {isActive(link.path) && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
