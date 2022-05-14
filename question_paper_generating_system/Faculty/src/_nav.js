import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // cilBell,
  // cilCalculator,
  cilCloudDownload,
  // cilChartPie,
  // cilCursor,
  // cilDrop,
  // cilNotes,
  // cilPencil,
  cilPlaylistAdd,
  // cilPlus,
  // cilPrint,
  // cilPuzzle,
  // cilRowing,
  // cilTextSquare,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Faculty Pannel',
  },
  {
    component: CNavGroup,
    name: 'Manage Questions',
    to: '//manage-question',
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New Questions',
        to: '/manage-question/add-question',
      },
      {
        component: CNavItem,
        name: 'View All Questions',
        to: '/manage-question/view-question',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'View Old Papers',
    to: '/view-old-papers',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Give feedback',
    to: '/feedback',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  },
]

export default _nav
