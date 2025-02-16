import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore ,collection , getDocs,addDoc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


 async function getEmployees(db){
    const empCol = collection(db,'employees')
    const empSnapshot = await getDocs(empCol)
    return empSnapshot
 }

 function showData(employee){
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const ageCol = row.insertCell(1)
    nameCol.innerHTML = employee.data().name
    ageCol.innerHTML = employee.data().age
 }


(async function(){
    const data = await getEmployees(db)

    data.forEach(employee => {
        showData(employee)
    })
})();

//ดึงข้อมูลจากฟอร์ม
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  addDoc(collection(db,'birthday'),{
    birthday:form.birthday.value,
  })
  form.birthday.value = ""
  alert("บันทึกข้อมูลแล้ว")
})


async function submitForm() {
    const form = document.getElementById("addForm");
    const message = form.birthday.value;

    if (message.trim() === "") {
        alert("กรุณากรอกข้อความ");
        return;
    }

    try {
        await addDoc(collection(db, 'birthday'), {
            birthday: message,
            timestamp: new Date()
        });
        
        document.getElementById("thankyou-message").style.display = "block";
        form.birthday.value = "";
        
        setTimeout(() => {
            document.getElementById("exampleModal").classList.remove('show');
            document.querySelector('.modal-backdrop').remove();
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
        }, 2000);

    } catch (error) {
        console.error("Error adding document: ", error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
}

// อัพเดทฟังก์ชัน showThankYouMessage
function showThankYouMessage() {
    submitForm();
}


console.log("Firebase initialized:", app);
console.log("Firestore initialized:", db);
