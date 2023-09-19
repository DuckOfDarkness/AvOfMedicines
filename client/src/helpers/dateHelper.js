export function getFormattedData(dataSource){
    const dateObject = new Date(dataSource)
    return dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth()+1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2)
}