import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ViewSubject = () => {
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)

  const navigate = useNavigate()
  const [Subject, setSubject] = useState([])
  const [Edit, setEdit] = useState('')
  useEffect(async () => {
    let data = localStorage.getItem('admin-info')
    if (!data) {
      navigate('/login')
    }
    let data1 = JSON.parse(localStorage.getItem('admin-info'))
    // console.log(data1.token)
    await fetch('http://localhost:5000/api/user/allSubject', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${data1.token}`,
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        // alert(resp)
        setSubject(resp)
        // alert(Subject)
      })
    })
  }, [])

  const deleteSubject = async (subject_id) => {
    // alert(id)
    let data = { subject_id }
    // alert(data.subject_id)
    let data1 = JSON.parse(localStorage.getItem('admin-info'))
    // alert(data1.token)
    let result = await fetch('http://localhost:5000/api/user/chanageSubjectStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${data1.token}`,
      },
      body: JSON.stringify(data),
    })

    alert('Subject Deleted')
    window.location.reload()
    // result = await result.json()
    // console.log(result)
    // if (result.ok) {

    // } else {
    //   alert(result.message)
    // }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Subjects</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Subject.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      {/* //edit subject name */}
                      <CTableDataCell>
                        {/* delete button  */}
                        <CButton
                          onClick={() => deleteSubject(item._id)}
                          color="danger"
                          variant="outline"
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
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

export default ViewSubject
