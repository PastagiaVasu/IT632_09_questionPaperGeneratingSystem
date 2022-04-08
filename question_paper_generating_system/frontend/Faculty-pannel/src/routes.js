import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
]

export default routes
