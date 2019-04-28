const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// get all trainers

const getTrainers = () => 
    fetch(TRAINERS_URL)
        .then(resp => resp.json())

// delete a pokemon 

const deletePokemon = (id) => 
    fetch(POKEMONS_URL + `/${id}`, {
        method: 'DELETE'
      }).then(resp => resp.json())

// create a pokemon 

const createPokemon = (pokemon) => 
 fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(pokemon)
 })