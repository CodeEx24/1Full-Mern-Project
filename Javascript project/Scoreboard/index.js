let homeScore = 0
let guestScore = 0

let homeScoreEl = document.getElementById('homeScore-el')
let GuestScoreEl = document.getElementById('guestScore-el')

function add1Home(){
    homeScore += 1
    homeScoreEl.textContent = homeScore
}

function add2Home(){
    homeScore += 2
    homeScoreEl.textContent = homeScore
}
function add3Home(){
    homeScore += 3
    homeScoreEl.textContent = homeScore
}

function add1Guest(){
    guestScore += 1
    GuestScoreEl.textContent = guestScore
}

function add2Guest(){
    guestScore += 2
    GuestScoreEl.textContent = guestScore
}
function add3Guest(){
    guestScore += 3
    GuestScoreEl.textContent = guestScore
}