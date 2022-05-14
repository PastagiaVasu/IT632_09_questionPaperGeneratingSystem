import React, { useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contact_number, setContactNo] = useState('')
  const [subject, setSubject] = useState([])

  const navigate = useNavigate()

  useEffect(async () => {
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      navigate('/login')
    }
    data = JSON.parse(localStorage.getItem('faculty-info'))
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setEmail(data.email)
    // await fetch('http://localhost:5000/api/user/allSubject', {
    //   method: 'GET',
    //   headers: {
    //     authorization: `Bearer ${data.token}`,
    //   },
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.log(resp)
    //     setSubject(resp)
    //   })
    // })
  }, [])

  const saveData = async () => {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    // let id = data.id
    let data1 = { firstName, lastName }
    // alert(data1.firstName)
    await fetch('http://localhost:5000/api/user/editProfile', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data1),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        if (resp.ok) alert('data updated..!')
        else alert(result.message)
      })
    })

    // alert(subject)
    // let sub = { subject }
    // alert(sub.subject)
    // let result = await fetch('http://localhost:5000/api/user/addSubject', {
    //   method: 'POST',
    //   headers: {
    //     authorization: `Bearer ${data.token}`,
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify(sub),
    // })

    // result = await result.json()
    // if (result.ok) alert('Subject added..!')
    // else alert(result.message)
  }

  return (
    <div className="bg-light min-vh-80 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Edit Profile</h1>
                  <p className="text-medium-emphasis"> Profile </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      defaultValue={firstName}
                      // value={firstName}
                      placeholder="First Name"
                      autoComplete="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      defaultValue={lastName}
                      placeholder="Last name"
                      autoComplete="Last name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      defaultValue={email}
                      placeholder="Email"
                      autoComplete="email"
                      disabled={true}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option>Select Subject</option>
                      <option value="627c97d9d3ff067777f40e2f">SE</option>
                      <option value="627c0383609928278df3e6f2">CN</option>
                      <option value="627c039e609928278df3e6f">Wp</option>
                      <option value="627c0607609928278df3e6fe">OOP</option>
                    </CFormSelect>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={saveData}>
                      Save
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
