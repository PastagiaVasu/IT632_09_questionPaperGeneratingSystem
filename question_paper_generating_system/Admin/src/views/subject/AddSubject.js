import React, { useState } from 'react'
import {
  CCol,
  CFormInput,
  CButton,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CFormLabel,
  CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AddSubject = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  useEffect(async () => {
    let data = localStorage.getItem('admin-info')
    if (!data) {
      navigate('/login')
    }
  }, [])

  const addSubject = async () => {
    // alert(name)
    let data = { name }
    // alert(data)
    let data1 = JSON.parse(localStorage.getItem('admin-info'))
    // alert(data1.token)
    let result = await fetch('http://localhost:5000/api/user/newSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${data1.token}`,
      },
      body: JSON.stringify(data),
    })

    result = await result.json()
    // console.log(result)
    // if (result.ok) {
    alert('Subject added')
    navigate('/view-subject')
    // } else {
    //   alert(result.message)
    // }
  }

  return (
    <>
      <CRow>
        <CCol xs={8}>
          <CCard className="mt-3">
            <CCardBody>
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    Subject Name:
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Subject Name"
                      aria-label="Subject Name"
                    />
                  </CCol>
                </CRow>
                <CButton onClick={addSubject} color="primary" variant="outline">
                  Add
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow className="g-3">
        <CCol xs>
          <CFormInput placeholder="Subject ID" aria-label="Subject ID" />
        </CCol>
        <CCol xs>
          <CFormInput placeholder="Subject Name" aria-label="Subject Name" />
        </CCol>
      </CRow>
      <br></br>
      <div className="d-grid gap-2 col-6 mx-auto">
        <CButton color="success" shape="rounded-pill" onClick={() => setVisible(!visible)}>
          Add
        </CButton>
        <CButton onClick={() => setVisible(!visible)} color="primary" variant="outline">
          Add
        </CButton>
      </div> */}
    </>
  )
}

export default AddSubject
