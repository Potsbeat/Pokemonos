
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
        let calmarno = "";
        if(response.name=="squirtle"){
            calmarno = "<span class='color-grey'>(vamoa calmarno)</span><br>"
        }
        return `
            <div class="card">
                <section class="vertical-flex center-items">
                    <h3>${response.name.toUpperCase()}</h3>${calmarno}
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
                        <span class="color-grey" id="stats_span">Base Stats:</span>
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
    if(name=="vamoa calmarno"){
        name = "squirtle";
    }
    if(name != ''){
        showPokemon(name)
    }
}

function toggleShowStats(){
    const stats_div = document.getElementById("stats_div");
    
    stats_div.classList.toggle("hidden-small");
    if(!stats_div.classList.contains("hidden-small")){
        
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }else{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
