import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))
const ViewFaculty = React.lazy(() => import('./views/view-faculty/ViewFaculty'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
  { path: '/view-faculty', name: 'View Faculty', element: ViewFaculty },
]

export default routes