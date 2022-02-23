import axios from "axios";

const API_URL = process.env.UPLOAD_API_URL;
const MULTIPLE = process.env.REACT_APP_UPLOAD_MULTIPLE_API_URL;

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