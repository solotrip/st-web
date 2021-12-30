import React from 'react'
import {
  Alert28Regular,
  CircleEdit24Regular,
  Heart28Regular,
  Star28Regular,
  List28Regular
} from '@fluentui/react-icons'

export const SidebarData = [
  {
    title: 'Browse',
    path: '/browse',
    icon: <List28Regular />,
    cName: 'navText'
  },
  {
    title: 'Recommendations',
    path: '/recommendations',
    icon: <Star28Regular />,
    cName: 'navText'
  },

  {
    title: 'Wishlist',
    path: '/wishlist',
    icon: <Heart28Regular />,
    cName: 'navText'
  },
  {
    title: 'Notifications',
    path: '/notifications',
    icon: <Alert28Regular />,
    cName: 'navText'
  },
  {
    title: 'Preferences',
    path: '/recommendations/preferences',
    icon: <CircleEdit24Regular />,
    cName: 'navText'
  }
]
