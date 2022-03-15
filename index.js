let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const instructEL = document.querySelector("#instruct-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        inputEl.style.border = "";
        instructEL.textContent = "";
    })
})

inputBtn.addEventListener("click", function(){
    if (inputEl.value === ""){
        instructEL.textContent = "Please enter some text or url below before you click SAVE INPUT";
        inputEl.style.border = "1px red solid";
    }else{
        instructEL.textContent = "";
        inputEl.style.border = "";
        myLeads.push(inputEl.value)
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    }
})
function render(leads){
    let listItems ="";
    for (i = 0; i < leads.length; i++){
    // listItems += "<li><a href=' " + myLeads[i] + "'>" + myLeads[i] + "</a></li> ";
    listItems += `
    <li>
    <a target='_blank' href='${leads[i]}'>${leads[i]}
    </a>
    </li>`
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})