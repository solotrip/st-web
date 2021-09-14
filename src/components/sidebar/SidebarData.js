import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import {
  CircleEdit24Regular,
  Alert28Regular,
  Bookmark28Regular,
  Star28Regular,
  Heart28Regular,
} from "@fluentui/react-icons";

export const SidebarData = [
  {
    title: "Recommendations",
    path: "/recommendations",
    icon: <Star28Regular />,
    cName: "navText",
  },

  {
    title: "Wishlist",
    path: "/wishlist",
    icon: <Heart28Regular />,
    cName: "navText",
  },
  {
    title: "Saved",
    path: "/saved",
    icon: <Bookmark28Regular />,
    cName: "navText",
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <Alert28Regular />,
    cName: "navText",
  },
  {
    title: "Preferences",
    path: "/recommendations/preferences/2",
    icon: <CircleEdit24Regular />,
    cName: "navText",
  },
];
