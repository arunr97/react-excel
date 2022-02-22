import IndividualData from "./IndividualData";
import React from "react";

export const Data = ({excelData}) =>{
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.EmpCode}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>
    ))
}