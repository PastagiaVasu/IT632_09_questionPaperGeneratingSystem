import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import {
  // CAvatar,
  CButton,
  // CButtonGroup,
  CCard,
  CCardBody,
  // CCardFooter,
  CCardHeader,
  CCol,
  // CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
// import { CChartLine } from '@coreui/react-chartjs'
// import { getStyle, hexToRgba } from '@coreui/utils'
// import CIcon from '@coreui/icons-react'
// import {
//   cibCcAmex,
//   cibCcApplePay,
//   cibCcMastercard,
//   cibCcPaypal,
//   cibCcStripe,
//   cibCcVisa,
// cibGoogle,
// cibFacebook,
// cibLinkedin,
//   // cifBr,
//   cifEs,
//   cifFr,
//   cifIn,
//   cifPl,
// cifUs,
// cibTwitter,
// cilCloudDownload,
// cilPeople,
// cilUser,
// cilUserFemale,
// } from '@coreui/icons'

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Feedback = () => {
  const navigate = useNavigate()
  const [FeedbackData, setFeedbackData] = useState([])
  useEffect(async () => {
    let data = localStorage.getItem('admin-info')
    if (!data) {
      navigate('/login')
    }
    let data1 = JSON.parse(localStorage.getItem('admin-info'))
    await fetch('http://localhost:5000/api/user/allFeedback', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${data1.token}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setFeedbackData(resp)
      })
    })
  }, [])

  // function confirmSubmit() {
  //   confirmAlert({
  //     title: 'Are you Confirm?',
  //     message: 'Are you sure to confirm this request ?',
  //   })
  // }
  // const deleteFeedback = (id) => {
  //     await fetch(`http://localhost:5000/api/user/allFeedback/${id}`, {
  //       method: 'DELETE'
  //   }).then((result) =>{
  //     result.json().then((resp)=>{
  //       console.warn(resp)
  //     })
  //   }
  //   )
  // }
  // function deleteSubmit(id) {
  //   confirmAlert({
  //     title: 'Do you want to Delete?',
  //     message: 'Are you sure to Delete this request ?',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: deleteFeedback(id),
  //       },
  //       {
  //         label: 'No',
  //       },
  //     ],
  //   })
  // }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader> FACULTY REQUESTS</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Faculty Email</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Message</CTableHeaderCell>
                    {/* <CTableHeaderCell colSpan="2" className="text-center">
                      Action
                    </CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {FeedbackData.map((item, i) => (
                    <CTableRow v-for="item in tableItems" key={i}>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.title}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.message}</div>
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <CButton onClick={deleteSubmit(item.id)} coelor="danger" textColor="white">
                          Delete
                        </CButton>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Feedback

{
  /* <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.title}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.message}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={deleteSubmit}
                          color="danger"
                          textColor="white"
                          href="#/view-faculty-request"
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow> */
}
