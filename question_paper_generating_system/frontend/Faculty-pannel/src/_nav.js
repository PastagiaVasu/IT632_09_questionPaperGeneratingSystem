import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // cilBell,
  cilCalculator,
  cilCloudDownload,
  // cilChartPie,
  // cilCursor,
  // cilDrop,
  // cilNotes,
  cilPencil,
  cilPlaylistAdd,
  cilPlus,
  cilPrint,
  cilPuzzle,
  cilRowing,
  cilTextSquare,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Faculty Pannel',
  },
  {
    component: CNavGroup,
    name: 'Questions',
    to: '/',
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New Questions',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'View All Questions',
        to: '/',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Download Papers',
    to: '/',
    icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
  },
]

export default _nav
