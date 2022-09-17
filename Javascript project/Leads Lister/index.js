let myLead = []

const saveInpBtn = document.getElementById("save-input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

saveInpBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value = ""
    
    renderLeads()
})

function renderLeads(){
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
                <a target="_blank" class="link-text" href="${myLead[i]}">
                    ${myLead[i]}
                </a>
            </li>
        `        
    }
    ulEl.innerHTML = listItems
}
