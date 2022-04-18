import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))
const DownloadPapers = React.lazy(() => import('./views/download-papers/DownloadPapers'))
const ViewOldPapers = React.lazy(() => import('./views/view-old-papers/ViewOldPapers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
  { path: '/download-papers', name: 'Download Papers', element: DownloadPapers },
  { path: '/view-old-papers', name: 'View Old Papers', element: ViewOldPapers },
]

export default routes
