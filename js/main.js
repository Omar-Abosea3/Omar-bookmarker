var BMName=document.getElementById("BMName");
var BMLink=document.getElementById("BMLink");
var Btn=document.getElementById("Btn");
var validName=document.querySelector("#validNameMessage");
var validLink=document.querySelector("#validLinkMessage");
var trs=document.getElementById("Trs");
var nameRegEx=/^\S.{1,40}$/i;
var linksRegEx=/^(https\:\/\/).+/i;
// array of Bookmarks.
var allWebsites=[];
var bookMark;
// get element of array from local storage and display it.
if(localStorage.getItem("allWebsites")!=null){
    allWebsites=JSON.parse(localStorage.getItem("allWebsites"));
    displayAllWebsites();
}
// adding code
Btn.addEventListener("click",function bookMarkBtn(){
    bookMark={
        bookMarkName:BMName.value,
        bookMarkLinks:BMLink.value,
        };
    if(nameRegEx.test(bookMark.bookMarkName)&&linksRegEx.test(bookMark.bookMarkLinks)){
        validName.setAttribute("class","d-none");
        validLink.setAttribute("class","d-none");
        allWebsites.push(bookMark);
        localStorage.setItem("allWebsites",JSON.stringify(allWebsites));
        console.log(allWebsites);
        displayAllWebsites();
        ClearForm();
    }else if(nameRegEx.test(bookMark.bookMarkName)==true&&linksRegEx.test(bookMark.bookMarkLinks)==false){
        validName.setAttribute("class","text-light bg-success bg-opacity-50 border-1 border border-dark text-center rounded-1 w-75 m-auto py-2 my-2 d-block");
        validName.innerHTML="<h4>Name is valid</h4>";
        validLink.setAttribute("class","text-dark bg-danger bg-opacity-50 border-1 border border-dark text-center  rounded-1 w-75 m-auto py-2 my-2 d-block");
        validLink.innerHTML="<h4>Link is invalid</h4>";
    }else if(nameRegEx.test(bookMark.bookMarkName)==false&&linksRegEx.test(bookMark.bookMarkLinks)==true){
        validName.setAttribute("class","text-dark bg-danger bg-opacity-50 border-1 border border-dark text-center rounded-1 w-75 m-auto py-2 my-2 d-block");
        validName.innerHTML="<h4>Name is required</h4>";
        validLink.setAttribute("class","text-light bg-success bg-opacity-50 border-1 border border-dark text-center  rounded-1 w-75 m-auto py-2 my-2 d-block");
        validLink.innerHTML="<h4>Link is valid</h4>";
    }else{
        validName.setAttribute("class","text-dark bg-danger bg-opacity-50 border-1 border border-dark text-center rounded-1 w-75 m-auto py-2 my-2 d-block");
        validName.innerHTML="<h4>Name is required</h4>";
        validLink.setAttribute("class","text-dark bg-danger bg-opacity-50 border-1 border border-dark text-center  rounded-1 w-75 m-auto py-2 my-2 d-block");
        validLink.innerHTML="<h4>Url Field is required</h4>";
    }
})

// clraring input’s values.
function ClearForm(){
    BMName.value="";
    BMLink.value="";
}

// display the array of websites in table in this page after adding.
function displayAllWebsites(){
    var cartoona="";
    for(var i=0;i<allWebsites.length;i++){
         cartoona+=`<tr class='d-flex justify-content-between align-items-center px-2'>
        <td class="TdFont fw-bold fs-5">${allWebsites[i].bookMarkName}</td>
        <td><a href="${allWebsites[i].bookMarkLinks}" target="_blank" class="link-light TdFont btn btn-primary me-2 text-decoration-none">Visit</a>
        <button class="btn btn-danger TdFont" onclick="DelBookMark(${i})">Delete</button>
        </td>
    </tr>`
    }
    trs.innerHTML=cartoona;
}

// delete website from array.
function DelBookMark(index){
    allWebsites.splice(index,1);
    localStorage.setItem("allWebsites",JSON.stringify(allWebsites));
    displayAllWebsites();
}
