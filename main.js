const addEvent = (names) => {
  let card
  for (let i = 0; i < names.length; i++) {
    card = document.getElementById(`card-${names[i]}`)
    card.addEventListener("click", function() {
        localStorage.setItem('name', names[i])
        location.href = 'detalle.html'
    })
    
  }
};


const printHtml = async (pokemons) => {
  const container = document.getElementById("container-pokes");
  let data
  const pokeNames = []
  for (let i = 0; i < pokemons.length; i++) {
    data = await fetch(pokemons[i].url, { method: "get"});
    const { sprites, name } = await data.json();
    const { front_shiny } = sprites.other["official-artwork"];
    container.innerHTML += `<div id="card-${name}"  class="card bg-red-600 rounded-md border-4 border-solid border-[#ffffff] shadow-lg shadow-black hover:cursor-pointer">
                                <div class="p-4">
                                    <img class="w-[250px] h-[250px] rounded-md" src="${front_shiny}" alt="sus">
                                </div>
                                <div>
                                    <p class="font-bold italic text-center text-2xl text-[#ffffff] p-2">${name}</p>
                                </div>
                            </div>`;
    pokeNames.push(name)
  }
   addEvent(pokeNames);
};

async function search(offset = 0, limit = 9) {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    {
      method: "get",
    }
  );

  const { results } = await data.json();

  printHtml(results);
}
let offset = 0
const previous = document.getElementById('previous')
const next = document.getElementById('next')

if (offset === 0) {
    previous.disabled = true
}

previous.addEventListener("click", function(event){
    offset -= 9
    const container = document.getElementById("container-pokes");
    container.innerHTML = ''
    search(offset)
})

next.addEventListener("click", function(event){
    offset += 9
    const container = document.getElementById("container-pokes");
    container.innerHTML = ''
    search(offset)
})

search(offset);
