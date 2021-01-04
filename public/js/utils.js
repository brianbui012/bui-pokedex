export function fillPokemonOptions(pokeArray, pokeDropdown){
    for(let i=0; i < pokeArray.length; i++){
        const el = document.createElement("option");
    
        el.textContent = pokeArray[i];
        el.value = pokeArray[i].split(" ")[1];
        pokeDropdown.appendChild(el);
    }
}

export function fillInZero(number){
    while(number.length > 3){
        number = "0" + number;
    }
    return number;
}

