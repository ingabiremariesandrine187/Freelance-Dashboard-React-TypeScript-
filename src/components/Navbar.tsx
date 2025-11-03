import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Home, Package, Users, DollarSign, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: Package },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Payments", path: "/payments", icon: DollarSign }
  ];