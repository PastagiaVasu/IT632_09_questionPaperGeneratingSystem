import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // cilBell,
  cilCalculator,
  // cilChartPie,
  // cilCursor,
  // cilDrop,
  // cilNotes,
  cilPencil,
  cilPuzzle,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Actions',
  },
  {
    component: CNavItem,
    name: 'Generate Paper',
    to: '/generate-paper',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View Faculty Request',
    to: '/',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View Faculty List',
    to: '/view-faculty',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Subject',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add new subject',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'View all sujects',
        to: '/',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Feedback',
    to: '/',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
]

export default _nav
