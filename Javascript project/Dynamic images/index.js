// Create a function that renders the three team images
// Use a for loop, template strings (``), plus equals (+=)
// .innerHTML to solve the challenge.

const imgs = [
    "images/hip1.jpg",
    "images/hip2.jpg",
    "images/hip3.jpg"
]

const divContainer = document.querySelector("#container")

function render(item){
    let listsitems = ""
    for(let i = 0; i < item.length; i++){
        listsitems += `<img class="team-img" src="${item[i]}">`
    }
    divContainer.innerHTML = listsitems
}

render(imgs)
