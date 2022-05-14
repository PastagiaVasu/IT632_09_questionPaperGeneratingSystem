import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DownloadPapers = React.lazy(() => import('./views/download-papers/DownloadPapers'))
const ViewOldPapers = React.lazy(() => import('./views/view-old-papers/ViewOldPapers'))
const Feedback = React.lazy(() => import('./views/feedback/Feedback'))
//manage-question
const AddQuestion = React.lazy(() => import('./views/manage-question/add-question/AddQuestion'))
const ViewQuestion = React.lazy(() => import('./views/manage-question/view-question/ViewQuestion'))
const profile = React.lazy(() => import('./views/profile/profile'))
const EditQuestion = React.lazy(() => import('./views/manage-question/edit-question/EditQuestion'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/download-papers', name: 'Download Papers', element: DownloadPapers },
  { path: '/view-old-papers', name: 'View Old Papers', element: ViewOldPapers },
  { path: '/feedback', name: 'Feedback', element: Feedback },
  { path: '/manage-question', name: 'Manage Question', element: ViewQuestion, exact: true },
  { path: '/manage-question/add-question', name: 'Add Question', element: AddQuestion },
  { path: '/manage-question/view-question', name: 'View Question', element: ViewQuestion },
  { path: '/profile', name: 'Profile', element: profile },
  { path: '/manage-question/edit-question', name: 'Edit Question', element: EditQuestion },
]

export default routes
