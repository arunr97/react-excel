
import './App.css';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Data } from './components/Data';
import { addRecords } from './services/upload-service';

function App() {

  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  const [excelData, setExcelData]=useState(null);

  const fileType = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e)=>{
    console.log('File Loaded');
    console.log(process.env.REACT_APP_APPLICATION_NAME);
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if(selectedFile&&fileType.includes(selectedFile.type)){
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload=(e)=>{
        setExcelFileError(null);
        setExcelFile(e.target.result);
        // console.log('file set');
      }

    }else{
      setExcelFileError('Please select only excel file type');
      setExcelFile(null);
    }
  }

  const handleSubmit=(e)=>{
    // 
    e.preventDefault();
    console.log('Conversion started');
    const d = new Date();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log(data);
      console.log('Conversion completed');
      const f = new Date();
      let diff = f-d;
      let diffInSec = Math.floor(diff/1000);
      console.log(`Time diff in seconds ${diffInSec} and milli seconds ${diff} in react`);
      let resultval = addRecords(data).catch(err => alert('Error in adding Records'+err));
      

    }
    else{
      setExcelData(null);
    }
  }


  return (
    <div className="Container">
      <div className='form'>
        <form className='form-group' autoComplete='off' onSubmit={handleSubmit}>
          <label><h5>Upload Excel File</h5></label>
          <br></br>
          <input type='file' className='form-control' onChange={handleFile} required></input>
          {excelFileError&&<div className='text-danger' style={{marginTop:5+'px'}}>{excelFileError}</div>}

          <button type='submit' className='btn btn-success' style={{marginTop:5+'px'}}>Submit</button>

        </form>

      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file Selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>
          </div>
        )}

      </div>
      
    </div>
  );
}

export default App;
