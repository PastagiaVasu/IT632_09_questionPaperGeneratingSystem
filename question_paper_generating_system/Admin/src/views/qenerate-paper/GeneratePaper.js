import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  // CCardHeader,
  CCol,
  // CForm,
  // CFormInput,
  // CFormLabel,
  // CFormTextarea,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormCheck,
  CFormSelect,
} from '@coreui/react'
import { CCollapse } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const GeneratePaper = () => {
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const navigate = useNavigate()
  const [Subject, setSubject] = useState([])
  const [subSelect, setSubSelect] = useState('')
  const [Diffculty, setDiffculty] = useState('')
  const [marks, setMarks] = useState('')
  const [type, setType] = useState('')
  const [noOf2s, setNoOf2s] = useState(0)
  const [noOf3s, setNoOf3s] = useState(0)
  const [noOf5s, setNoOf5s] = useState(0)

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
        // console.log(resp)
        // alert(resp.message)
        setSubject(resp)
        // alert(Subject)
      })
    })
  }, [])

  const autoGenerate = async () => {
    let data = { subSelect, Diffculty, marks, type }
    // alert(data.subSelect+ " "+ data.type)
    console.log(data)
    // alert(name)
    // let data = { name }
    // // alert(data)
    // let data1 = JSON.parse(localStorage.getItem('admin-info'))
    // // alert(data1.token)
    // let result = await fetch('http://localhost:5000/api/user/newSubject', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     authorization: `Bearer ${data1.token}`,
    //   },
    //   body: JSON.stringify(data),
    // })

    // result = await result.json()
    // console.log(result)
    // if (result.ok) {
    // alert('Subject added')
    // navigate('/view-subject')
    // } else {
    //   alert(result.message)
    // }
  }

  const customeGenerate = () => {
    // alert('generate paper validation failed: All fields are required')
    let data = { subSelect, Diffculty, type, noOf2s, noOf3s, noOf5s }
    // alert(data.subSelect+ " "+ data.type)
    console.log(data)
  }

  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        className="me-md-4"
        onClick={() => {
          setVisibleA(!visibleA)
          setVisibleB(false)
        }}
      >
        Auto Generate
      </CButton>
      <CButton
        color="success"
        variant="outline"
        onClick={() => {
          setVisibleA(false)
          setVisibleB(!visibleB)
        }}
      >
        Custom Generate
      </CButton>
      <CRow>
        <CCol xs={10}>
          <CCollapse visible={visibleA}>
            <CCard className="mt-3">
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                      Select Subject
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect
                        aria-label="subject"
                        onChange={(e) => setSubSelect(e.target.value)}
                      >
                        <option>Select Subject</option>
                        {Subject.map((item, index) => (
                          <option value={item._id} key={index}>
                            {item.name}
                          </option>
                        ))}
                        {/* <option value="627de3ed50e53cc2a890f6c6">IT632: Software Engineering</option>
                        <option value="2">SP</option>
                        <option value="3">SE</option> */}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Diffculty Level
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect
                        aria-label="subject"
                        onChange={(e) => setDiffculty(e.target.value)}
                      >
                        <option>Diffculty level</option>
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Total Marks
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect aria-label="marks" onChange={(e) => setMarks(e.target.value)}>
                        <option>Select Marks</option>
                        <option value="1">50</option>
                        <option value="2">100</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="questionType" className="col-sm-2 col-form-label">
                      Question Type
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormCheck
                        onClick={(e) => setType('Subjective')}
                        type="radio"
                        name="type"
                        id="subjective"
                        label="Subjective"
                      />
                      <CFormCheck
                        onCLick={(e) => setType('Objective')}
                        type="radio"
                        name="type"
                        id="objective"
                        label="Objective"
                        defaultChecked
                      />
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="primary" variant="outline" onClick={autoGenerate}>
                    Generate
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCollapse>
        </CCol>
      </CRow>
      {/* custom generate */}
      <CRow>
        <CCol xs={10}>
          <CCollapse visible={visibleB}>
            <CCard className="mt-3">
              <CCardBody>
                <CForm>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                      Select Subject
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect
                        aria-label="subject"
                        onChange={(e) => setSubSelect(e.target.value)}
                      >
                        <option>Select Subject</option>
                        {Subject.map((item, index) => (
                          <option value={item._id} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Diffculty Level
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect
                        aria-label="subject"
                        onChange={(e) => setDiffculty(e.target.value)}
                      >
                        <option>Diffculty level</option>
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      Question Type
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormCheck
                        onCLick={(e) => setType('Subjective')}
                        type="radio"
                        name="type"
                        id="subjective"
                        label="Subjective"
                      />
                      <CFormCheck
                        onCLick={(e) => setType('Objective')}
                        type="radio"
                        name="type"
                        id="objective"
                        label="Objective"
                        defaultChecked
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      No. of 2 Marks
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        onChange={(e) => setNoOf2s(e.target.value)}
                        min={0}
                        max={10}
                        type="number"
                        aria-label="no of 2 marks"
                        defaultValue={0}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      No. of 3 Marks
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        onChange={(e) => setNoOf3s(e.target.value)}
                        min={0}
                        max={10}
                        type="number"
                        aria-label="no of 3 marks"
                        defaultValue={0}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                      No. of 5 Marks
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        onChange={(e) => setNoOf5s(e.target.value)}
                        min={0}
                        max={10}
                        type="number"
                        aria-label="no of 5 marks"
                        defaultValue={0}
                      />
                    </CCol>
                  </CRow>
                  <CButton
                    type="submit"
                    color="success"
                    variant="outline"
                    onClick={customeGenerate}
                  >
                    Generate
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCollapse>
        </CCol>
      </CRow>
    </>
  )
}

export default GeneratePaper
