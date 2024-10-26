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

let arrayobj, arrayobj1 = [], testarrayobj, arrayobj2 = [], filearrayobj;

document.getElementById("searchbtn")?.addEventListener('click', () => {
    let sem = document.getElementById("searchbar")?.value;
    let semstring = "12345678"; // Valid semesters

    // Check if semester input is valid
    if (semstring.includes(sem)) {
        const dbref = ref(db);
        let folder = document.getElementById("folderscon");
        let file = document.getElementById("filescon");
        let testfolder = document.getElementById("nestedfolderscon");

        // Reset folder, file, and test folder displays
        if (folder) folder.style.display = "flex";
        if (folder) folder.innerHTML = "";
        if (file) file.style.display = "none";
        if (testfolder) testfolder.style.display = "none";

        get(child(dbref, `questionpapertable/${sem}`)).then((snapshot) => {
            let student = snapshot.val();
            arrayobj = Object.entries(student).map(([key, value]) => ({ key, value }));

            arrayobj.forEach((item, i) => {
                arrayobj1[i] = item.value;

                // Create folder div for each item
                let foldertemplate = document.createElement("div");
                foldertemplate.className = "foldercon";
                foldertemplate.innerHTML = `<i class="fa-solid fa-folder"></i><h4>${item.key}</h4>`;
                foldertemplate.id = i;
                folder?.appendChild(foldertemplate);

                // Event listener for folder clicks
                foldertemplate.addEventListener('click', () => {
                    let nestedfolderscon1 = document.getElementById("nestedfolderscon");
                    nestedfolderscon1.innerHTML = "";
                    nestedfolderscon1.style.display = "flex";
                    folder.style.display = "none";

                    testarrayobj = Object.entries(arrayobj1[foldertemplate.id]).map(([key, value]) => ({ key, value }));
                    
                    // Nested folder creation
                    testarrayobj.forEach((nestedItem, ni) => {
                        arrayobj2[ni] = nestedItem.value;
                        let nestedfolder = document.createElement("div");
                        nestedfolder.className = "nestedfolder";
                        nestedfolder.id = ni;
                        nestedfolder.innerHTML = `<i class="fa-solid fa-folder"></i><h4>${nestedItem.key}</h4>`;
                        nestedfolderscon1.appendChild(nestedfolder);

                        // Event listener for nested folder
                        nestedfolder.addEventListener('click', () => {
                            let filescon = document.getElementById("filescon");
                            filescon.innerHTML = "";
                            filescon.style.display = "flex";
                            nestedfolderscon1.style.display = "none";

                            filearrayobj = Object.entries(arrayobj2[nestedfolder.id]).map(([key, value]) => ({ key, value }));
                            
                            if (filearrayobj.length > 0) {
                                // Create file icons for each PDF
                                filearrayobj.forEach((fileItem, fi) => {
                                    let filecon = document.createElement("div");
                                    filecon.className = "filecon";
                                    filecon.id = fi;
                                    filecon.innerHTML = `<i class="fa-solid fa-file-pdf"></i><h4>${fileItem.key}</h4>`;
                                    filescon.appendChild(filecon);

                                    // Event listener for file PDF click
                                    filecon.addEventListener('click', () => {
                                        let pdfcon = document.getElementById("pdfcon");
                                        pdfcon.innerHTML = "";
                                        pdfcon.style.display = "block";
                                        let fileurl = filearrayobj[filecon.id].value.url;
                                        
                                        // Create iframe for PDF display
                                        let pdfframe = document.createElement("iframe");
                                        pdfframe.src = fileurl;
                                        pdfframe.id = "pdfdata";
                                        pdfcon.appendChild(pdfframe);

                                        // Close button for PDF view
                                        let pdfbtn = document.createElement("i");
                                        pdfbtn.className = "fa-solid fa-xmark";
                                        pdfbtn.id = "pdfbtn";
                                        pdfbtn.addEventListener('click', () => {
                                            pdfcon.style.display = "none";
                                            pdfframe.src = ""; // Remove src to stop loading
                                        });

                                        pdfcon.appendChild(pdfbtn);
                                    });
                                });
                            } else {
                                filescon.innerHTML = "<h1>No Files</h1>";
                            }
                        });
                    });
                });
            });
        });
    } else {
        window.open('main.html', '_self');
    }
});

// Event listeners for home and add buttons
document.getElementById("homebtn")?.addEventListener('click', () => window.open('main.html', '_self'));
document.getElementById("addbtn")?.addEventListener('click', () => window.open('insertdata.html', '_self'));
