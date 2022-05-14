import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CButton,
  CTableRow,
  CTable,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
// import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// const Login = React.lazy(() => import('./views/pages/login/Login'))

class EditQuestion extends React.Component {
  constructor(props) {
    super(props)
    // alert(props.name1)
    // const navigate = useNavigate()
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      ;<Navigate replace to="/login" />
    }

    this.state = {
      subject_id: '625dda1a655da04c79ceb756',
      question: '',
      mark: '',
      difficulty: '',
      answer: '',
    }
  }

  async addSubjective() {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    alert(data.token)
    console.log(this.state)
    let result = await fetch('http://localhost:5000/api/question/newSubjectiveQuestion', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(this.state),
    })

    result = await result.json()
    console.log(result)
  }

  render() {
    return (
      <div>
        <CForm>
          <div className="mb-3">
            <CFormLabel htmlFor="question">Question</CFormLabel>
            <CFormTextarea
              id="questionBox"
              rows="3"
              onChange={(e) => {
                this.setState({ question: e.target.value })
              }}
              placeholder="Enter question"
            ></CFormTextarea>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="answer">Answer</CFormLabel>
            <CFormTextarea
              id="answerBox"
              rows="3"
              onChange={(e) => {
                this.setState({ answer: e.target.value })
              }}
              placeholder="Enter answer"
            ></CFormTextarea>
          </div>
          <div>
            <CFormLabel htmlFor="marks">Weightage</CFormLabel>
            <CFormInput
              type="number"
              id="marksBox"
              onChange={(e) => {
                this.setState({ mark: e.target.value })
              }}
              placeholder="Enter marks"
            />
          </div>
          <br />
          <div>
            <CFormLabel htmlFor="difficulty">Difficulty</CFormLabel>
            <CFormSelect
              aria-label="difficulty options"
              onChange={(e) => {
                this.setState({ difficulty: e.target.value })
              }}
            >
              <option>Select the difficulty</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </CFormSelect>
          </div>
          <br />
          <div className="mx-auto text-center">
            <CButton color="primary" size="lg" onClick={() => this.addSubjective()}>
              Submit
            </CButton>
          </div>
        </CForm>
      </div>
    )
  }
}

export default EditQuestion
