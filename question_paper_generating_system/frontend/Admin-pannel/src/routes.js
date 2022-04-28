import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))
const ViewFaculty = React.lazy(() => import('./views/view-faculty/ViewFaculty'))
//manage-question
const AddQuestion = React.lazy(() => import('./views/manage-question/add-question/AddQuestion'))
const ViewQuestion = React.lazy(() => import('./views/manage-question/view-question/ViewQuestion'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage-question', name: 'Manage Question', element: ViewQuestion, exact: true },
  { path: '/manage-question/add-question', name: 'Add Question', element: AddQuestion },
  { path: '/manage-question/view-question', name: 'View Question', element: ViewQuestion },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
  { path: '/view-faculty', name: 'View Faculty', element: ViewFaculty },
]

export default routes