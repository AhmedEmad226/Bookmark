var inputName = document.getElementById("inputName")
var inputUrl = document.getElementById("inputUrl")
var submitBtn = document.getElementById("submit")
var deleteBtn = document.getElementById("deleteBtn")
var nameAlert = document.querySelector(".nameAlert");
var urlAlert = document.querySelector(".urlAlert");
var markList = []



if (localStorage.getItem("marks") !== null) {
    markList = JSON.parse(localStorage.getItem("marks"))
    displayMark()
}


submitBtn.addEventListener("click" , addMark)
inputName.addEventListener("input" , checkName)
inputUrl.addEventListener("input" , checkUrl)



function addMark() {
    var bookMark = {
        name: inputName.value,
        url: inputUrl.value
    }

    markList.push(bookMark);
    localStorage.setItem("marks" , JSON.stringify(markList))

    displayMark();
}

function displayMark() {
        var container = ""
        var x;
        for(var i = 0; i < markList.length ; i++) {
            x = i;
            container += `
            
        <div class="line">
            <p class="w-25 text-center p-2 lineIndex" id="lineIndex">${x + 1}</p>
            <p class="w-25 text-center p-2 lineName" id="lineName">${markList[i].name}</p>
            <div class="btnContainer w-25 text-center">
                <a href="${markList[i].url}" target="_blank" class="btn btn-success" id="visitBtn"><i class="fas fa-eye"></i>  Visit</a>
            </div>
            <div class="btnContainer w-25 text-center">
                <button class="btn btn-danger" onclick="deleteMark(${i})" id="deleteBtn"><i class="fas fa-trash-can"></i>  Delete</button>
            </div>
      </div>
            
            `
        }
    document.getElementById("list").innerHTML = container;

    clearInputs()
}


function clearInputs () {
    inputName.value = null;
    inputUrl.value = null;
}



function deleteMark(index) {
markList.splice(index, 1)
localStorage.setItem("marks" , JSON.stringify(markList))
displayMark()
}



function checkName() {
    var regex = /^[a-zA-Z0-9_-]{3,15}$/
    var text = inputName.value;

    if (regex.test(text)) {
        submitBtn.classList.remove("disabled")
        nameAlert.classList.add("d-none")
    }

    else {
        submitBtn.classList.add("disabled")
        nameAlert.classList.remove("d-none")
    }
}


function checkUrl() {
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    var text = inputUrl.value;


    if (regex.test(text)) {
        submitBtn.classList.remove("disabled")
        urlAlert.classList.add("d-none")
    }

    else {
        submitBtn.classList.add("disabled")
        urlAlert.classList.remove("d-none")
    }

}