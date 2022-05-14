import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCommentSquare, cilUser, cilEnvelopeClosed } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Feedback = () => {
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const useEffect = async () => {
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      //history.push("/")

      navigate('/login')
    }
    // console.log(data)
  }

  const feedbackForm = async () => {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    // alert(data.token)
    // var x = ' + " + data.token + " + '
    // var x = `${data.token}`

    var x = `"${data.token}"`
    // alert(x)
    let feedbackData = { email, title, message }
    let result = await fetch('http://localhost:5000/api/user/newFeedback', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })

    result = await result.json()
    if (result.ok) alert('Feedback sent..!')
    else alert(result.message)
    // console.log(result)
  }

  return (
    <div className="bg-light min-vh-95 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Feedback</h1>
                    <p className="text-medium-emphasis">Share your Feedback</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Title"
                        type="text"
                        autoComplete="Title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilCommentSquare} />
                      </CInputGroupText>
                      <CFormTextarea
                        id="exampleFormControlTextarea1"
                        label="Example textarea"
                        rows="3"
                        text="Must be 8-20 words long."
                        placeholder="Feedback"
                        onChange={(e) => setMessage(e.target.value)}
                      ></CFormTextarea>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* <CButton color="primary" className="px-4">
                          Submit
                        </CButton> */}
                        <div className="d-grid gap-2  col-8 mx-auto">
                          <button className="btn btn-primary" type="button" onClick={feedbackForm}>
                            Submit
                          </button>
                        </div>
                      </CCol>
                      <CCol xs={6} className="text-right"></CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Feedback
