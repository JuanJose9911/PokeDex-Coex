const fillHTML = (pokemon) => {
    
    const { stats, abilities, sprites } = pokemon
    const { front_default } = pokemon.sprites.other["official-artwork"]

    //DOM
    const name = document.getElementById('name')
    const image = document.getElementById('image')
    const statsC = document.getElementById('stats')
    const ability = document.getElementById('ability')
    const pictures = document.getElementById('pictures')

    // Filling the DOM
    name.innerHTML = pokemon.name
    image.innerHTML = `<img src="${ front_default }" alt="sus" >`
    stats.forEach( (el) => {
        statsC.innerHTML += `<p><strong>${el.stat.name}</strong>: ${el.base_stat}`
    })
    abilities.forEach( (el) => {
        ability.innerHTML += `<li>${el.ability.name}</li>`
    })
    for (const key in sprites) {
        if (Object.hasOwnProperty.call(sprites, key) && sprites[key] != null) {
            pictures.innerHTML += `<div class="img-evo">
                                    <img src="${sprites[key]}" alt="" srcset="">
                                </div>`
        }
    }
}


const main = async () => {
    const name = localStorage.getItem('name');
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const pokemon = await data.json()

    fillHTML(pokemon)
}


main()