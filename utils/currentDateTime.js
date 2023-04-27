export const currentDateTime = () => {
    var today = new Date(new Date().setHours(new Date().getHours() + 5, new Date().getMinutes() + 30));
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}