
async function getPokemon(pokemon: string){
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon+'/');
    let data = await response.json();
    console.log(data)
    return data;
}

function showAbilities(abil){
    return `<li>${abil.ability.name}</li>`
}

function showTypes(types){
    return `<li>${types.type.name}</li>`
}

function showStats(stats){
    return `<div class="horizontal-flex space-between"><p>${stats.stat.name}:</p><p>${stats.base_stat}</p></div>`
}

function showPokemon(nombre: string){
    getPokemon(nombre.toLowerCase()).then(response=>{
        return `
            <div class="card">
                <section class="vertical-flex center-items">
                    <h3>${response.name.toUpperCase()}</h3>
                    <img src="${response.sprites.other["official-artwork"].front_default}">
                    <hr>
                </section>
                <div class="vertical-flex space-evenly">
                    <section class="description-block">
                        <span class="color-grey">Abilities:</span>
                        <ul>${response.abilities.map(showAbilities).join('')}</ul>
                    </section>
                    <section class="description-block">
                        <span class="color-grey">Types:</span>
                        <ul>${response.types.map(showTypes).join('')}</ul>
                    </section>
                    <section class="description-block hidden-large">
                        <button id="stats_button">stats</button>
                    </section>
                </div>

                <div class="vertical-flex hidden-small justify-center" id="stats_div">
                    <section class="description-block">
                        <span class="color-grey">Base Stats:</span>
                        ${response.stats.map(showStats).join('')}
                    </section>
                </div>
            </div>`
    }).then(elemento=>{
        document.getElementById("main_container").innerHTML = elemento;
        document.getElementById("stats_button").onclick = toggleShowStats;
    }).catch(err=>{
        document.getElementById("main_container").innerHTML = 
            `<div class="card">
                <h3>The requested pokémon was not found</h3>
            </div>`
    })
}

function searchPokemon(){
    let name =  (<HTMLInputElement>document.getElementById("search_bar")).value.toLowerCase();
    if(name != ''){
        showPokemon(name)
    }
}

function toggleShowStats(){
    document.getElementById("stats_div").classList.toggle("hidden-small");
}


const input_text = document.getElementById("search_bar");
input_text.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search_button").click();
  }
});

showPokemon("squirtle");

setTimeout(function(){
    document.getElementById("search_button").onclick = searchPokemon;
    
}, 300);
