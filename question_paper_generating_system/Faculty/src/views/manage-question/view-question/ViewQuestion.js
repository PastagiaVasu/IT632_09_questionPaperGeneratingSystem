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
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'
import './view-question.css'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil } from '@coreui/icons'
import { Navigate } from 'react-router-dom'
import EditQuestion from '../edit-question/EditQuestion'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

class ViewQuestion extends React.Component {
  constructor() {
    super()
    // const navigate = useNavigate()
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      // history.push("/login")
      ;<Navigate replace to="/login" />
      // navigate('/ogin')
    }
    this.state = {
      questions: null,
      questionID: null,
      que_status: false,
    }
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    console.log(data.token)
    fetch('http://localhost:5000/api/user/allQuestions', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    }).then((resp) => {
      resp.json().then((result) => {
        console.warn(result)
        this.setState({ questions: result })
        console.log(this.state.questions.result)
      })
    })

    // let data2 = JSON.parse(localStorage.getItem('faculty-info'))
    // alert(data2.token)
    // console.log(this.state)

    // let result = fetch('http://localhost:5000/api/paper/fetchAnswerFromQuestion', {
    //   method: 'POST',
    //   headers: {
    //     authorization: `Bearer ${data2.token}`,
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify(this.state.questionID),
    // })

    // result = result.json()
    // console.log(result)
  }

  divstatus = (e) => {
    this.setState({ value: e.target.value })
    if (e.target.value == 'sub') {
      document.getElementById('sub').style.display = 'block'
      document.getElementById('obj').style.display = 'none'
    } else {
      document.getElementById('obj').style.display = 'block'
      document.getElementById('sub').style.display = 'none'
    }
  }

  editQues = (e) => {
    alert(e)
    ReactDOM.render(<EditQuestion name1={() => e} />, document.getElementById('d1'))
  }

  async delQues(e) {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    // alert(data.token)
    // console.log(this.state)
    let que_status = this.state.que_status
    let question_id = e
    let data1 = { question_id, que_status }
    // alert(questionAns)
    let result = await fetch('http://localhost:5000/api/question/editSubjectiveQuestion', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data1),
    })

    window.location.reload()
    // result = await result.json()
    // console.log(result)
  }

  render() {
    return (
      <div>
        <CFormSelect aria-label="question type" onChange={this.divstatus}>
          <option>Select the question type</option>
          <option value="sub">Subjective</option>
          <option value="obj">Objective</option>
        </CFormSelect>
        <br />

        <div id="sub">
          <CTable>
            <CTableHead>
              <CTableRow color="light">
                <CTableHeaderCell scope="col">Question</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Answer</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Weightage</CTableHeaderCell>
                <CTableHeaderCell scope="col">Difficulty</CTableHeaderCell>
                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {this.state.questions
                ? this.state.questions.map((item, i) => {
                    let d
                    if (item.difficulty == '1') d = 'Easy'
                    else if (item.difficulty == '2') d = 'Medium'
                    else if (item.difficulty == '3') d = 'Hard'

                    if (item.type == true && item.status == true)
                      return (
                        <CTableRow color="light" key={i}>
                          <CTableDataCell>{item.question}</CTableDataCell>
                          {/* <CTableDataCell>{item.answer}</CTableDataCell> */}
                          <CTableDataCell>{item.mark}</CTableDataCell>
                          <CTableDataCell>{d}</CTableDataCell>
                          <CTableDataCell>
                            <Link to="/manage-question/edit-question">
                              <CIcon icon={cilPencil} size="xl" />
                            </Link>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <CIcon icon={cilDelete} size="xl" onClick={this.delQues(item._id)} /> */}
                            <CButton
                              onClick={() => this.delQues(item._id)}
                              color="danger"
                              variant="outline"
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                  })
                : null}
            </CTableBody>
          </CTable>
        </div>

        <div id="obj">
          <CTable>
            <CTableHead>
              <CTableRow color="light">
                <CTableHeaderCell scope="col">Question</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Answer</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Weightage</CTableHeaderCell>
                <CTableHeaderCell scope="col">Difficulty</CTableHeaderCell>
                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {this.state.questions
                ? this.state.questions.map((item, i) => {
                    let d
                    if (item.difficulty == '1') d = 'Easy'
                    else if (item.difficulty == '2') d = 'Medium'
                    else if (item.difficulty == '3') d = 'Hard'

                    if (item.type == false && item.status == true)
                      return (
                        <CTableRow color="light" key={i}>
                          <CTableDataCell>{item.question}</CTableDataCell>
                          {/* <CTableDataCell>{item.answer}</CTableDataCell> */}
                          <CTableDataCell>{item.mark}</CTableDataCell>

                          <CTableDataCell>{d}</CTableDataCell>
                          <CTableDataCell>
                            <Link to="/manage-question/edit-question">
                              <CIcon icon={cilPencil} size="xl" />
                              {/* <CButton color="success">
                              Create Account
                            </CButton> */}
                            </Link>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <CIcon icon={cilDelete} size="xl" /> */}
                            <CButton
                              onClick={() => this.delQues(item._id)}
                              color="danger"
                              variant="outline"
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )
                  })
                : null}
            </CTableBody>
          </CTable>
        </div>
      </div>
    )
  }
}

export default ViewQuestion
