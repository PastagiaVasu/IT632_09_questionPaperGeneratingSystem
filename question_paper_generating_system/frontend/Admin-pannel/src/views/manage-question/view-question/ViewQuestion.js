import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow, CForm, CFormLabel, CFormTextarea, CFormInput, CButton, CTableRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell} from '@coreui/react'
import './view-question.css';
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil } from '@coreui/icons';

class ViewQuestion extends React.Component {
    constructor() {
      super();
      this.state = {
        items: [
          {ques: "Which animal is known as the 'Ship of the Desert?", ans: "Camel", weightage: 1, difficulty: "Easy"},
          {ques: "How many days are there in a week?", ans: "7 days", weightage: 1, difficulty: "Easy"},
          {ques: " How many hours are there in a day?", ans: " 24 hours", weightage: 1, difficulty: "Easy"},
          {ques: "How many letters are there in the English alphabet?", ans: "26 letters", weightage: 1, difficulty: "Easy"},
          {ques: "Rainbow consist of how many colours?", ans: "7 colours", weightage: 1, difficulty: "Easy"},
        ]
      }
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

 editQues = (e) =>{
   alert(e.target.value);
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
              <CTableHeaderCell scope="col">Answer</CTableHeaderCell>
              <CTableHeaderCell scope="col">Weightage</CTableHeaderCell>
              <CTableHeaderCell scope="col">Difficulty</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {this.state.items.map(item=>(
              <CTableRow color="light">
                <CTableDataCell>{item.ques}</CTableDataCell>
                <CTableDataCell>{item.ans}</CTableDataCell>
                <CTableDataCell>{item.weightage}</CTableDataCell>
                <CTableDataCell>{item.difficulty}</CTableDataCell>
                <CTableDataCell><CIcon icon={cilPencil} onClick={this.editQues} size="xl"/></CTableDataCell>
                <CTableDataCell><CIcon icon={cilDelete} size="xl"/></CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      
      <div id="obj">obj</div>
     </div>
   )
 }
}

export default ViewQuestion