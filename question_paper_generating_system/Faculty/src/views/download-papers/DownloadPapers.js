import React, { useRef } from 'react'
import { render } from 'react-dom'
import { useReactToPrint } from 'react-to-print'
import { Component } from 'react'
import { CButton } from '@coreui/react'
import { Navigate } from 'react-router-dom'

class DownloadPapers extends React.Component {
  constructor() {
    super()
    let data = localStorage.getItem('faculty-info')
    if (!data) {
      // history.push("/login")
      ;<Navigate replace to="/login" />
    }
  }
  state = {
    answerChoices: [
      {
        answers1: [
          {
            label: 'Project scheduling',
            value: true,
          },
          {
            label: 'Detailed schedule',
            value: false,
          },
          {
            label: 'Macroscopic schedule',
            value: false,
          },
          {
            label: 'None of the mentioned',
            value: false,
          },
        ],
      },
    ],
  }

  handleOptionChange = (event) => {
    event.preventDefault()
    console.log('clicked')
    // checked={true}
  }

  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  }

  render() {
    return (
      <div style={{ margin: '20px' }}>
        <div className="card card-outline card-primary rounded-0 shadow">
          <div className="card-header">
            <h5 className="card-title">
              <b></b>
            </h5>
          </div>
          <div className="card-body">
            <div id="outprint">
              <h4 className="m-0 text-center">
                <b>Sample Quetion Paper{/*Title*/}</b>
              </h4>
              <div className="m-0 text-center"></div>
              <h5 className="m-0 text-center">
                <b>Software Engineering{/*cource batch*/}</b>
                <br />
                <b>M.Sc IT - 2021-23{/*cource batch*/}</b>
              </h5>
              <hr />
              <small>
                <i>
                  <b>General Instruction:</b>
                  {/*General Instruction*/}
                </i>
              </small>
              <hr />
              <h5>
                <b> {/* Catagory (eg.A) */}A.</b> Select the correct answer from the choices for
                each question.
              </h5>
              <hr />
              {/*1. que fetch Query */}
              <div className="question-item mb-3">
                <div className="d-flex w-100 mb-1">
                  <div className="col-auto pr-1">
                    <b>1. {/* quetion number*/}</b>
                  </div>
                  <div className="col-auto flex-shrink-1 flex-grow-1">
                    {' '}
                    The activity that distributes estimated effort across the planned project
                    duration by allocating the effort to specific software developing tasks is
                    ____________
                  </div>
                </div>
                <div className="mx-2 mb-3">
                  <div className="row">
                    {/*1. choice list fetch Query(radio button) */}
                    <div className="col-md-6">
                      <div className="d-flex w-100 mb-1">
                        <div className="col-auto pr-1 align-middle pt-1">
                          <div className="radio-choice"></div>
                        </div>
                        <div className="col-auto flex-shrink-1 flex-grow-1">
                          {/*Options*/}

                          <div className="radio">
                            <form>
                              <br />
                              <input type="radio" id="op1" name="op" value="30" />
                              <label>Project scheduling</label>
                              <br />
                              <input type="radio" id="op2" name="op" value="60" />
                              <label>Detailed schedule</label>
                              <br />
                              <input type="radio" id="op3" name="op" value="100" />
                              <label>Macroscopic schedule</label>
                              <br />
                              <input type="radio" id="op4" name="op" value="100" />
                              <label>None of the mentioned</label>
                              <br />
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h5>
                <b>{/* Catagory (eg.B) */}B.</b> Select the correct answers from the choices for
                each question. You can choose more than 1.
              </h5>
              <hr />
              {/*2. que fetch Query */}
              <div className="question-item mb-3">
                <div className="d-flex w-100 mb-1">
                  <div className="col-auto pr-1">
                    <b>2. {/* quetion number*/}</b>
                  </div>
                  <div className="col-auto flex-shrink-1 flex-grow-1">
                    Which countries are located in asia?
                  </div>
                </div>
                <div className="mx-2 mb-3">
                  <div className="row">
                    {/*2. choice list fetch Query (checklist)*/}
                    <div className="col-md-6">
                      <div className="d-flex w-100 mb-1">
                        <div className="col-auto pr-1 align-middle pt-1">
                          <div className="check-choice"></div>
                        </div>
                        <div className="col-auto flex-shrink-1 flex-grow-1">
                          {/*Options*/}
                          <form>
                            <br />
                            <input type="checkbox" id="cop1" name="op" value="30" />
                            <label>Chaina</label>
                            <br />
                            <input type="checkbox" id="cop2" name="op" value="60" />
                            <label>England</label>
                            <br />
                            <input type="checkbox" id="cop3" name="op" value="100" />
                            <label>India</label>
                            <br />
                            <input type="checkbox" id="cop4" name="op" value="100" />
                            <label>Canada</label>
                            <br />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h5>
                <b>{/* Catagory (eg.C) */}C.</b> Write your Answer in the provided text field.
              </h5>
              <hr />
              {/*3. que fetch Query */}
              <div className="question-item mb-3">
                <div className="d-flex w-100 mb-1">
                  <div className="col-auto pr-1">
                    <b>3. {/* quetion number*/}</b>
                  </div>
                  <div className="col-auto flex-shrink-1 flex-grow-1">
                    Explain Software development process models
                  </div>
                </div>
                <div className="mx-2 mb-3">
                  <br />
                  <div className="text-field">
                    <textarea id="ans3" name="ans3" rows="7" cols="80"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Example = () => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const backToPage = () => {
    window.location.href = '#/view-old-papers'
    window.location.reload(false)
  }
  return (
    <div>
      <DownloadPapers ref={componentRef} />
      <CButton style={{ margin: '10px' }} onClick={handlePrint}>
        Print Paper
      </CButton>
      <CButton style={{ margin: '10px' }} onClick={backToPage}>
        Back
      </CButton>
    </div>
  )
}
render(<Example />, document.querySelector('#root'))

export default DownloadPapers
