export default function IndividualData({individualExcelData}){
    return (
        <>
        <th>{individualExcelData.EmpCode}</th>
        <th>{individualExcelData.Name}</th>
        <th>{individualExcelData.Location}</th>
        <th>{individualExcelData.Age}</th>
        <th>{individualExcelData.Designation}</th>
        </>
    )

}