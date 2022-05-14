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
import './add-question.css'
// import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// const Login = React.lazy(() => import('./views/pages/login/Login'))

class AddQuestion extends React.Component {
  constructor(props) {
    super(props)
    // const navigate = useNavigate()
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      // history.push("/login")
      // return <Redirect to="/login" />
      // this.props.navigate('/login')
      ;<Navigate replace to="/login" />
    }
    this.state = {
      subject_id: '627c0607609928278df3e6fe',
      question: '',
      mark: '',
      difficulty: '',

      answer1: { answer: null, right: null },
      answer2: { answer: null, right: null },
      answer3: { answer: null, right: null },
      answer4: { answer: null, right: null },
      subjects: null,
    }

    // let data1 = localStorage.getItem('admin-info')
    // console.log(data1.token)
    // fetch('http://localhost:5000/api/user/allSubject', {
    //   method: 'GET',
    //   headers: {
    //     authorization: `Bearer ${data1.token}`,
    //   },
    // }).then((resp) => {
    //   resp.json().then((result) => {
    //     console.warn(result)
    //     this.setState({ subjects: result })
    //     console.log(this.state.subjects.result)
    //   })
    // })
    // this.setState((prevState) => {
    //   let answer1 = Object.assign({}, prevState.answer1) // creating copy of state variable jasper
    //   answer1.answer = 'someothername' // update the name property, assign a new value
    //   return { answer1 } // return new object jasper object
    // })
    // this.setState((prevState) => ({
    //   answer1: {
    //     // object that we want to update
    //     ...prevState.answer1, // keep all other key-value pairs
    //     answer: 'something', // update the value of specific key
    //   },
    // }))
    // this.setState({ ...this.state.answer1, answer: 'someothername' })
    // alert(this.state.answer1.answer)
  }

  async addSubjective() {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    // alert(data.token)
    // console.log(this.state)

    // alert(questionAns)
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

  async addObjective() {
    let data = JSON.parse(localStorage.getItem('faculty-info'))
    alert(data.token)
    console.log(this.state)
    let questionAns = [
      this.state.answer1,
      this.state.answer2,
      this.state.answer3,
      this.state.answer4,
    ]
    let sub_id = this.state.subject_id
    let que = this.state.question
    let diff = this.state.difficulty
    let mark = this.state.mark
    let final = { sub_id, que, mark, diff, questionAns }
    console.log(final)
    let result = await fetch('http://localhost:5000/api/question/newObjectiveQuestion', {
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
                ro
                ws="3"
                onChange={(e) => {
                  this.setState({ answers: e.target.value })
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

        <div id="obj">
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
            <br />

            <div id="options">
              <CTable className="optionTable">
                <CTableBody id="optionsbody">
                  <CTableRow color="light">
                    <CTableDataCell>Option</CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        id="optionBox"
                        placeholder="Enter option"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer1: {
                              ...prevState.answer1,
                              answer: e.target.value,
                            },
                          }))
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="answer or not"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer1: {
                              ...prevState.answer1,
                              right: e.target.value,
                            },
                          }))
                        }}
                      >
                        <option>Select the correct answer</option>
                        <option value="wrong">Wrong</option>
                        <option value="right">Right</option>
                      </CFormSelect>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="success" shape="rounded-0" onClick={this.addRow}>
                        Add
                      </CButton>
                    </CTableDataCell> */}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>

            <div id="options">
              <CTable className="optionTable">
                <CTableBody id="optionsbody">
                  <CTableRow color="light">
                    <CTableDataCell>Option</CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        id="optionBox"
                        placeholder="Enter option"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer2: {
                              ...prevState.answer2,
                              answer: e.target.value,
                            },
                          }))
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="answer or not"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer2: {
                              ...prevState.answer2,
                              right: e.target.value,
                            },
                          }))
                        }}
                      >
                        <option>Select the correct answer</option>
                        <option value="wrong">Wrong</option>
                        <option value="right">Right</option>
                      </CFormSelect>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="success" shape="rounded-0" onClick={this.addRow}>
                        Add
                      </CButton>
                    </CTableDataCell> */}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>

            <div id="options">
              <CTable className="optionTable">
                <CTableBody id="optionsbody">
                  <CTableRow color="light">
                    <CTableDataCell>Option</CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        id="optionBox"
                        placeholder="Enter option"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer3: {
                              ...prevState.answer3,
                              answer: e.target.value,
                            },
                          }))
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="answer or not"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer3: {
                              ...prevState.answer3,
                              right: e.target.value,
                            },
                          }))
                        }}
                      >
                        <option>Select the correct answer</option>
                        <option value="wrong">Wrong</option>
                        <option value="right">Right</option>
                      </CFormSelect>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="success" shape="rounded-0" onClick={this.addRow}>
                        Add
                      </CButton>
                    </CTableDataCell> */}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>

            <div id="options">
              <CTable className="optionTable">
                <CTableBody id="optionsbody">
                  <CTableRow color="light">
                    <CTableDataCell>Option</CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        id="optionBox"
                        placeholder="Enter option"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer4: {
                              ...prevState.answer4,
                              answer: e.target.value,
                            },
                          }))
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="answer or not"
                        onChange={(e) => {
                          this.setState((prevState) => ({
                            answer4: {
                              ...prevState.answer4,
                              right: e.target.value,
                            },
                          }))
                        }}
                      >
                        <option>Select the correct answer</option>
                        <option value="wrong">Wrong</option>
                        <option value="right">Right</option>
                      </CFormSelect>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="success" shape="rounded-0" onClick={this.addRow}>
                        Add
                      </CButton>
                    </CTableDataCell> */}
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>

            <div>
              <CFormLabel htmlFor="marks">Weightage</CFormLabel>
              <CFormInput
                type="number"
                id="marksBox"
                placeholder="Enter marks"
                onChange={(e) => {
                  this.setState({ mark: e.target.value })
                }}
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
              <CButton color="primary" size="lg" onClick={() => this.addObjective()}>
                Submit
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    )
  }
}

export default AddQuestion
