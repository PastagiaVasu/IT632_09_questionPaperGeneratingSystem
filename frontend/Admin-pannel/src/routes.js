import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))
const ViewFacultyRequest = React.lazy(() =>
  import('./views/view-faculty-request/ViewFacultyRequest'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
  { path: '/view-faculty-request', name: 'View Faculty Request', element: ViewFacultyRequest },
]

export default routes
