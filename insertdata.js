import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyC6jn_lmqJOF8xmETFJHTS_jfvNd6Ym6DU",
    authDomain: "demo9-b51ef.firebaseapp.com",
    databaseURL: "https://demo9-b51ef-default-rtdb.firebaseio.com",
    projectId: "demo9-b51ef",
    storageBucket: "demo9-b51ef.appspot.com",
    messagingSenderId: "1047300525018",
    appId: "1:1047300525018:web:df85e94803a87a4ecf0ee3",
    measurementId: "G-3BVVEH3CGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);
let url1 = "";
let shorturl;
const fileInput = document.getElementById("file");
fileInput.addEventListener('change', e => {
    let valid7 = document.getElementById("valid7");
    valid7.innerHTML = "";
    const file = fileInput.files[0];
    console.log(file.type);
    if (file.type == "application/pdf") {
        const reader = new FileReader();

        reader.addEventListener('load', () => {

            console.log(reader.result)
            if (reader.result.length < 809848) {
                url1 = reader.result;
            }
            else {
                valid7.innerHTML = "*the file size is large"
                url1 = "large"
            }
            //  short();

        })

        reader.readAsDataURL(file);

    }
    else {


        valid7.innerHTML = "*please choose a pdf file"

    }
})



document.getElementById("Insertbtn").addEventListener('click', () => {
    let semester1 = document.getElementById("semester").value;
    let department1 = document.getElementById("department").value;
    let test = document.getElementById("test").value;
    let filename = document.getElementById("filename").value;
    let year = document.getElementById("year").value;
    let insertkey = document.getElementById("insertkey").value;
    let valid1 = document.getElementById("valid1");
    let valid2 = document.getElementById("valid2");
    let valid3 = document.getElementById("valid3");
    let valid4 = document.getElementById("valid4");
    let valid5 = document.getElementById("valid5");
    let valid6 = document.getElementById("valid6");
    let valid7 = document.getElementById("valid7");
    valid1.innerHTML = "";
    valid2.innerHTML = "";
    valid3.innerHTML = "";
    valid4.innerHTML = "";
    valid5.innerHTML = "";
    valid6.innerHTML = "";
    valid7.innerHTML = "";




    console.log("clicked");

    console.log(url1)
    // console.log("short" + shorturl);
    if (insertkey == "Sky345@" && filename != "" && year != "" && test != "" && department1 != "" && semester1 != "" && url1 != "large") {
        console.log("clicked");

        set(ref(db, "questionpapertable/" + semester1 + '/' + department1 + '/' + test + '/' + filename
        ), {
            fileName: filename,
            Year: year,
            url: url1


        });
        let notice = document.getElementById("notificationcon");
        notice.style.display = "block"

        document.getElementById("filename").value = "";
        document.getElementById("semester").value = "";
        document.getElementById("department").value = "";
        document.getElementById("test").value = "";
        document.getElementById("year").value = "";
        document.getElementById("insertkey").value = "";
        document.getElementById("file").value = "";

        let notdata = document.createElement("h3")
        let notbtn = document.createElement("button");
        notdata.innerHTML = "inserted";
        notbtn.innerHTML = "<b>ok</b>";
        notbtn.id = "notificationbtn"
        notbtn.addEventListener('click', () => {
            notice.style.display = "none";

        });
        notice.appendChild(notdata);
        notice.appendChild(notbtn);


    }
    else {
        if (insertkey.length > 0) {
            if (insertkey != "Sky345@")
                valid1.innerHTML = "*enter correct insert key"


        }
        else {
            console.log("fill insertkey tag");
            valid1.innerHTML = "*fill the insert key"

        }
        if (filename == "") {
            console.log("fill filename");
            valid2.innerHTML = "*fill the filename"

        }
        if (year == "") {
            console.log("fill the year");
            valid3.innerHTML = "*fill the year"

        }
        if (test == "") {
            console.log("choose test");
            valid6.innerHTML = "*choose the test"
        }
        if (department1 == "") {
            console.log("choose department");
            valid5.innerHTML = "*choose the department"
        }
        if (semester1 == "") {
            console.log("choose sem");
            valid4.innerHTML = "*choose the semester"
        }
        if (url1.length == "") {
            console.log("choose file")
            valid7.innerHTML = "*choose the file"
        }
        if (url1 == "large") {
            valid7.innerHTML = "*the file size is large"
        }


    }
})
let menubtn = document.getElementById("homebtn");
menubtn.addEventListener('click', () => {
    window.open('main.html', 'self');
})
document.getElementById("addbtn").addEventListener('click', () => {
    window.open('insertdata.html', 'self');
})





