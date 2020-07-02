const modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal_overlay')
const cards = document.querySelectorAll('.card')


for(let card of cards){
    card.addEventListener("click",function(){
        cardId = card.getAttribute("id")
        window.location.href = `/card/${cardId}`
    })
}

