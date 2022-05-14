import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import {
  CAvatar,
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
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  // cibGoogle,
  // cibFacebook,
  // cibLinkedin,
  // cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  // cifUs,
  // cibTwitter,
  // cilCloudDownload,
  cilPeople,
  // cilUser,
  // cilUserFemale,
} from '@coreui/icons'

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'

const ViewFacultyRequest = () => {
  const navigate = useNavigate()
  const [FacultyRequest, setFacultyRequest] = useState([])
  useEffect(async () => {
    let data = localStorage.getItem('admin-info')
    if (!data) {
      navigate('/login')
    }
    let data1 = JSON.parse(localStorage.getItem('admin-info'))
    console.log(data1.token)
    await fetch('http://localhost:5000/api/user/allVerifiedFaculties', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${data1.token}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setFacultyRequest(resp)
      })
    })
  }, [])

  const approveFaculty = async (email, id) => {
    // alert(id)
    if (window.confirm('Sure, you want to remove faculty?') == true) {
      let data1 = JSON.parse(localStorage.getItem('admin-info'))
      await fetch('http://localhost:5000/api/user/changeStatus/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${data1.token}`,
        },
        body: JSON.stringify(id),
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp)
          window.location.reload()
          // navigate('/view-faculty')
        })
      })
    }
  }

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
                    <CTableHeaderCell>Faculty Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Contact No.</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2" className="text-center">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {FacultyRequest.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>
                          {item.firstName} {item.lastName}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.contact_number}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.role ? 'Admin' : 'Faculty'}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.status ? 'True' : 'False'}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          onClick={() => approveFaculty(item.email, item._id)}
                          color="primary"
                          variant="outline"
                        >
                          Disapprove
                        </CButton>
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <CButton
                          onClick={() => deleteFaculty(item._id)}
                          color="danger"
                          variant="outline"
                        >
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

export default ViewFacultyRequest
