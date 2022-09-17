let myLead = []

const saveInpBtn = document.getElementById("save-input-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
const saveTabBtn = document.getElementById("save-tab-btn")

const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}

saveInpBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLead))
    render(myLead)
})

deleteAllBtn.addEventListener('dblclick', function(){
    myLead = []
    localStorage.clear()
    render(myLead)
})

//Testing the url
// const tabs = [
//     {url:"facebook.com"}
// ]

saveTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        myLead.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLead))
        render(myLead)
    });
})

function render(Leads){
    let listItems = ""
    for(let i=0; i < myLead.length; i++){
        //first way to create an element
        //ulEl.innerHTML += '<li> <a class="link-text" href="' + myLead[i] + '">' + myLead[i] + '</a></li>'
        
        //Second way to create an element
        //const createLi = document.createElement("li")
        //createLi.innerHTML += '<a class="link-text" href="' + myLead[i] + '">' + myLead[i] + '</a>'
        //ulEl.append(createLi)
        
        //Most Efficient way which is called template strings
        listItems +=  `
            <li>
                <a target="_blank" class="link-text" href="${Leads[i]}">
                    ${Leads[i]}
                </a>
            </li>
        `        
    }
    ulEl.innerHTML = listItems
}
