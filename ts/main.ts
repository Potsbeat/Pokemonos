
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

function showPokemon(nombre: string){
    getPokemon(nombre.toLowerCase()).then(response=>{
        return `
            <div class="card">
                <section class="vertical-flex">
                    <h3>${response.name.toUpperCase()}</h3>
                    <img src="${response.sprites.other["official-artwork"].front_default}">
                    <hr>
                </section>
                <div class="vertical-flex">
                <section class="description-block">
                    Abilities:
                    <ul>${response.abilities.map(showAbilities).join('')}</ul>
                </section>
                <section class="description-block">
                    Types:
                    <ul>${response.types.map(showTypes).join('')}</ul>
                </section>
                </div>
            </div>`
    }).then(elemento=>{
        document.getElementById("main_container").innerHTML = elemento;
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

document.getElementById("search_button").onclick = searchPokemon;

const input_text = document.getElementById("search_bar");
input_text.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search_button").click();
  }
});

showPokemon("squirtle");
