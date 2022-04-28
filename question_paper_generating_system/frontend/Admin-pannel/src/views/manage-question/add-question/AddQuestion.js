import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow, CForm, CFormLabel, CFormTextarea, CFormInput, CButton, CTableRow, CTable, CTableBody, CTableDataCell} from '@coreui/react'
import './add-question.css';


class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'show'};
  }
  divstatus = (e) =>{
    this.setState({value: e.target.value});
    if(e.target.value == "sub")
    {
      document.getElementById("sub").style.display = "block";
      document.getElementById("obj").style.display = "none";
    }
    else
    {
      document.getElementById("obj").style.display = "block";
      document.getElementById("sub").style.display = "none";
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
              <CFormTextarea id="questionBox" rows="3" placeholder="Enter question"></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="answer">Answer</CFormLabel>
              <CFormTextarea id="answerBox" rows="3" placeholder="Enter answer"></CFormTextarea>
            </div>
            <div>
              <CFormLabel htmlFor="marks">Weightage</CFormLabel>
              <CFormInput type="number" id="marksBox" placeholder="Enter marks" />
            </div><br />
            <div>
              <CFormLabel htmlFor="difficulty">Difficulty</CFormLabel>
              <CFormSelect aria-label="difficulty options">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </CFormSelect>
            </div><br />
            <div class="mx-auto text-center">
              <CButton color="primary" size="lg">Submit</CButton>
            </div>
          </CForm>
        
        </div>
        
        <div id="obj">
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="question">Question</CFormLabel>
              <CFormTextarea id="questionBox" rows="3" placeholder="Enter question"></CFormTextarea>
            </div>
            <div id="options">
              <CTable className='optionTable'>
                <CTableBody id="optionsbody">
                  <CTableRow color="light">
                    <CTableDataCell>Option</CTableDataCell>
                    <CTableDataCell><CFormInput type="text" id="optionBox" placeholder="Enter option" /></CTableDataCell>
                    <CTableDataCell>
                    <CFormSelect aria-label="answer or not">
                      <option value="wrong">Wrong</option>
                      <option value="right">Right</option>
                    </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell><CButton color="success" shape="rounded-0" onClick={this.addRow}>Add</CButton></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
            <div>
              <CFormLabel htmlFor="marks">Weightage</CFormLabel>
              <CFormInput type="number" id="marksBox" placeholder="Enter marks" />
            </div><br />
            <div>
              <CFormLabel htmlFor="difficulty">Difficulty</CFormLabel>
              <CFormSelect aria-label="difficulty options">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </CFormSelect>
            </div><br />
            <div class="mx-auto text-center">
              <CButton color="primary" size="lg">Submit</CButton>
            </div>
          </CForm>  
        </div>
      </div>
    );
  }
}

export default AddQuestion