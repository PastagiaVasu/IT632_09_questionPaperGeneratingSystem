import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  // CTable,
  // CTableBody,
  // CTableDataCell,
  // CTableHead,
  // CTableHeaderCell,
  // CTableRow,
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
//   cibGoogle,
//   cibFacebook,
//   cibLinkedin,
//   cifBr,
//   cifEs,
//   cifFr,
//   cifIn,
//   cifPl,
//   cifUs,
//   cibTwitter,
//   cilCloudDownload,
//   cilPeople,
//   cilUser,
//   cilUserFemale,
// } from '@coreui/icons'

// import avatar1 from 'src/assets/images/avatars/1.jpg'
// import avatar2 from 'src/assets/images/avatars/2.jpg'
// import avatar3 from 'src/assets/images/avatars/3.jpg'
// import avatar4 from 'src/assets/images/avatars/4.jpg'
// import avatar5 from 'src/assets/images/avatars/5.jpg'
// import avatar6 from 'src/assets/images/avatars/6.jpg'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'

const ViewOldPapers = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      //history.push("/")

      navigate('/login')
    }
    // console.log(data)
  }, [])
  return (
    <>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        <CCol xs>
          <CCard color="info" textColor="white">
            <CCardBody>
              <CCardTitle>IT632 - Software Engineering</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2020-21</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="danger" textColor="white">
            <CCardBody>
              <CCardTitle>IT694 - Computer Network</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2020-21</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="warning" textColor="white">
            <CCardBody>
              <CCardTitle>IT629 - Web Programming</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2020-21</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="success" textColor="white">
            <CCardBody>
              <CCardTitle>IT632 - Software Engineering</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2019-20</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="secondary" textColor="white">
            <CCardBody>
              <CCardTitle>IT694 - Computer Network</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2019-20</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="light">
            <CCardBody>
              <CCardTitle>IT602 - Object Oriented Programming</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2020-21</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard color="dark" textColor="white">
            <CCardBody>
              <CCardTitle>IT629 - Web Programming</CCardTitle>
              <CCardText>Winter Semester</CCardText>
              <CCardText>Year: 2019-20</CCardText>
              <CButton href="#/download-papers">Download Paper</CButton>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Last updated 3 mins ago</small>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ViewOldPapers
