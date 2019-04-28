const main = document.querySelector('main')
let addPoke = false 
const formDiv = document.querySelector('.container')
const pokeForm = formDiv.querySelector('.add-pokemon-form')
let trainerId = 0

// display add pokemon form when button clicked 
main.addEventListener('click', (e) => {
    if (e.target.className === "add-pokemon-button") {
        addPoke = !addPoke
        if (addPoke) {
        formDiv.style.display = 'block'
        trainerId = parseInt(e.target.parentElement.getAttribute('data-id'), 10)
        } else {
        formDiv.style.display = 'none'
        }
    }
})

// add pokemon to DOM 

const addEventListenertoForm = () => {pokeForm.addEventListener('submit', (e) => {
    e.preventDefault() 

    let pokemon = {
        nickname: pokeForm.nickname.value,
        species: pokeForm.species.value,
        trainer_id: trainerId
    }

    const trainerCard = document.querySelector(`div[data-id='${trainerId.toString()}']`)
    
    const li = document.createElement("li")
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    // delete pokemon from DOM and from database 
    li.querySelector('button').addEventListener('click', (e) => {
        deletePokemon(e.target.dataset.pokemonId)
        li.remove()
        })
        
    trainerCard.querySelector('ul').appendChild(li)
    createPokemon(pokemon)

    // bug to consider - when new pokemon is made, page needs to be refershed before it can be deleted, as delete button not assigned pokemon.id
    // location.reload()? 

    pokeForm.reset()
    formDiv.style.display = 'none'
    })
}

// display all trainers and associated pokemon 

const renderTrainer = (trainer) => {
    const main = document.querySelector('main')
    const div = document.createElement('div')
    div.className = 'card'
    div.setAttribute('data-id', `${trainer.id}`)
    div.innerHTML = 
        `
        <p>${trainer.name}</p>
        <button class="add-pokemon-button" data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
        </ul>
        `
    trainer.pokemons.forEach((pokemon) => {
        const li = document.createElement("li")
        li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
        // delete pokemon from DOM and from database 
        li.querySelector('button').addEventListener('click', (e) => {
            deletePokemon(e.target.dataset.pokemonId)
            li.remove()
        })
        
        div.querySelector('ul').appendChild(li)
    })

    main.appendChild(div)

}

const renderTrainers = (trainers) => {
    trainers.forEach(renderTrainer)
}

const init = () => {
    getTrainers()
        .then(renderTrainers)
        addEventListenertoForm() 
}

init()