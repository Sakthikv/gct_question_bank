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
var arrayobj;
var arrayobj1 = [];
var testarrayobj;
var arrayobj2 = [];
var filearrayobj;
var idname;
document.getElementById("searchbtn").addEventListener('click', () => {
    let sem = document.getElementById("searchbar").value;
    let semstring = "12345678"

    if (semstring.includes(sem)) {
        const dbref = ref(db);
        let folder = document.getElementById("folderscon");
        folder.style.display = "flex";
        folder.innerHTML = "";
        let file = document.getElementById("filescon");
        file.style.display = "none";
        let testfolder = document.getElementById("nestedfolderscon");
        testfolder.style.display = "none";

        var student = [];

        get(child(dbref, `questionpapertable/${sem}`)).then((snapshot) => {
            // snapshot.forEach(childsnapshot => {
            //     var student = childsnapshot.val();
            //     const arrayobj = Object.entries(student).map(([key, value]) => ({ key, value }));
            //     console.log(arrayobj[0].key);

            //     //     // str = `name:${student.name}<br>age:${student.age}<br>`;
            //     //     // console.log(str);
            //     //     // result1.innerHTML += str;
            //     //     // console.log(result1.value);


            // });
            student = snapshot.val();
            arrayobj = Object.entries(student).map(([key, value]) => ({ key, value }));

            let n = arrayobj.length
            for (var i = 0; i < n; i++) {
                console.log(arrayobj[i].key);
                arrayobj1[i] = arrayobj[i].value;
                let foldertemplate = document.createElement("div");
                foldertemplate.className = "foldercon";

                foldertemplate.innerHTML = ` 
             <i class="fa-solid fa-folder"></i>
             <h4>${arrayobj[i].key}</h4 >`;
                folder.appendChild(foldertemplate);
                foldertemplate.id = i;

                let fo = document.getElementById(i);
                foldertemplate.addEventListener('click', function () {

                    console.log("folder", fo.id);
                    let nestedfolderscon1 = document.getElementById("nestedfolderscon");
                    nestedfolderscon1.innerHTML = "";
                    nestedfolderscon1.style.display = "flex";
                    let foldercon = document.getElementById("folderscon");
                    folderscon.style.display = "none";

                    testarrayobj = Object.entries(arrayobj1[fo.id]).map(([key, value]) => ({ key, value }))
                    console.log(testarrayobj);
                    for (var ni = 0; ni < testarrayobj.length; ni++) {
                        // console.log(testarrayobj[ni].key + "ni" + ni);
                        arrayobj2[ni] = testarrayobj[ni].value;
                        let nestedfolder = document.createElement("div");
                        nestedfolder.className = "nestedfolder";
                        nestedfolder.id = ni;
                        console.log("class id init");
                        nestedfolder.innerHTML = ` <i class="fa-solid fa-folder"></i>
                    <h4>${testarrayobj[ni].key}</h4>`
                        nestedfolderscon1.appendChild(nestedfolder);

                        nestedfolder.addEventListener('click', function () {
                            let filescon = document.getElementById("filescon");
                            filescon.innerHTML = "";
                            filescon.style.display = "flex";
                            let nestedfoldercon1 = document.getElementById("nestedfolderscon")
                            nestedfoldercon1.style.display = "none";
                            filearrayobj = Object.entries(arrayobj2[nestedfolder.id]).map(([key, value]) => ({ key, value }))
                            console.log(filearrayobj);
                            if (filearrayobj.length > 0) {
                                for (var fi = 0; fi < filearrayobj.length; fi++) {
                                    let filecon = document.createElement("div");
                                    filecon.id = fi;
                                    filecon.className = "filecon";
                                    filecon.innerHTML = `<i class="fa-solid fa-file-pdf"></i>
                            <h4>${filearrayobj[fi].key}</h4>
                           `
                                    filescon.appendChild(filecon);
                                    console.log(fi);
                                    filecon.addEventListener('click', function () {

                                        let pdfcon = document.getElementById("pdfcon");
                                        pdfcon.style.display = "block"
                                        pdfcon.innerHTML = "";
                                        console.log(filearrayobj.length)

                                        console.log(filearrayobj[filecon.id].value.url)
                                        var fileurl = filearrayobj[filecon.id].value.url
                                        console.log(fileurl)

                                        let pdfframe = document.createElement("iframe");
                                        pdfframe.src = fileurl;

                                        pdfframe.id = "pdfdata";
                                        let pdfbtn = document.createElement("i");
                                        pdfbtn.className = "fa-solid fa-xmark";
                                        pdfbtn.id = "pdfbtn";
                                        pdfbtn.addEventListener('click', () => {
                                            let pdfframe = document.getElementById("pdfdata");
                                            console.log("clicked pdfbtn")
                                            pdfframe.src = "";
                                            document.getElementById("pdfbtn").style.display = "none";
                                            document.getElementById("pdfcon").style.display = "none";
                                        })

                                        pdfcon.appendChild(pdfbtn)
                                        pdfcon.appendChild(pdfframe);
                                        console.log("completely displayed")

                                    })

                                }
                            }
                            else {
                                filescon.style.display = "flex";
                                filescon.innerHTML = "<h1>No Files</h1>";
                                console.log("no file");
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        window.open('main.html', 'self');
    }
})


let menubtn = document.getElementById("homebtn");
menubtn.addEventListener('click', () => {
    window.open('main.html', 'self');
})
document.getElementById("addbtn").addEventListener('click', () => {
    window.open('insertdata.html', 'self');
})



// let foldercon1 = document.getElementById("folderscon");
// for (var i = 0; i < arrayobj.length; i++) {
//     let fo = document.getElementById(i);
//     folder[i].addEventListener('click', function () {
//         console.log("folder", fo.id);
//         let nestedfolderscon1 = document.getElementById("nestedfolderscon");
//         nestedfolderscon1.style.display = "flex";
//         let foldercon = document.getElementById("folderscon");
//         folderscon.style.display = "none";

//     })


// }
let nestedfoldercon1 = document.getElementsByClassName("nestedfolder");
for (var j = 0; j < nestedfoldercon1.length; j++) {
    nestedfoldercon1[j].id = j;
    let nestedfo = document.getElementById(j);
    nestedfoldercon1[j].addEventListener('click', function () {
        console.log("nestedfolder", nestedfo.id);
        let file = document.getElementById("filescon");
        file.style.display = "flex";
        let nestedfoldercon = document.getElementById("nestedfolderscon");
        nestedfoldercon.style.display = "none";

    })


}

