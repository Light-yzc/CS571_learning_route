function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!
    job1 = document.getElementsByTagName('input');

    for (let i of job1){
        if (document.getElementById(i.id).checked == true){
            alert('thanks for applying to be a ' + i.value + '!')
            return 0
        }
    }
    // alert
    // TODO: Alert the user of the job that they applied for!
}
// document.getElementById('job_bt').addEventListener('click', () => {
//     submitApplication()
        
// })