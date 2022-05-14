import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GeneratePaper = React.lazy(() => import('./views/qenerate-paper/GeneratePaper'))
const ViewFacultyRequest = React.lazy(() =>
  import('./views/view-faculty-request/ViewFacultyRequest'),
)
const ViewFaculty = React.lazy(() => import('./views/view-faculty/ViewFaculty'))
const ViewSubject = React.lazy(() => import('./views/subject/ViewSubject'))
const AddSubject = React.lazy(() => import('./views/subject/AddSubject'))
const Feedback = React.lazy(() => import('./views/feedback/Feedback'))

const routes = [
  { path: '/home', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/generate-paper', name: 'Generate Paper', element: GeneratePaper },
  { path: '/view-faculty-request', name: 'View Faculty Request', element: ViewFacultyRequest },
  { path: '/view-faculty', name: 'View Faculty', element: ViewFaculty },
  { path: '/view-subject', name: 'View Subject', element: ViewSubject },
  { path: '/add-subject', name: 'Add Subject', element: AddSubject },
  { path: '/feedback', name: 'feedback', element: Feedback },
]

export default routes
