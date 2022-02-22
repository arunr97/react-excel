import axios from "axios";

const API_URL = process.env.UPLOAD_API_URL;
const MULTIPLE = "http://localhost:5000/excelupload/multiple";

export async function getRecords(){
    return fetch(API_URL).then(response=>response.json());
}

export function addRecord(record){
    console.log(record);
    return axios.post(API_URL, record);
    
}

export function addRecords(records){
    console.log(records);
    console.log(MULTIPLE);
    
    return axios.post(MULTIPLE, records);
    
}