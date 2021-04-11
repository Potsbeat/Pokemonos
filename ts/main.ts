class Pokemon {
    name: string;
    types: any[];
    id: number;
    abilities: any[];

    constructor(name: string, types, id: number, abilities){
        this.name=name;
        this.types = types;
        this.id = id;
        this.abilities = abilities;
    }

    getName(){
        return this.name;
    }
    getID(){
        return this.id;
    }
}

function getPokemon(pokemon: string) {
    const request = new XMLHttpRequest();
    request.open("GET", "https://pokeapi.co/api/v2/pokemon/"+pokemon+"/");
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            let result = JSON.parse(request.response);
            console.log(result);
            let poke = new Pokemon(result.name, result.types, result.id, result.abilities);
            mostrarPokemon(poke);
        } else {
            console.log(`error ${request.status}`);
            return null;
        }
    }
    
}

function mostrarPokemon(poke: Pokemon){
    let cont = document.getElementById("main_container");
    let nombre = poke.getName();
    cont.innerHTML = `
        <div class="card">
            <h3>`+nombre+`</h3>
            <p>`+ poke.getID+`</p>
        </div>
    `;
}

getPokemon("ditto");
