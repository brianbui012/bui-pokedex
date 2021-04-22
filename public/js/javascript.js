console.log('Connected');

import {pokemonG1} from './generationList.js'
import {pokemonG2} from './generationList.js'
import {pokemonG3} from './generationList.js'
import {pokemonG4} from './generationList.js'
import {pokemonG5} from './generationList.js'
import {pokemonG6} from './generationList.js'
import {pokemonG7} from './generationList.js'
import {pokemonG8} from './generationList.js'


import {fillPokemonOptions} from './utils.js'
import {fillInZero} from './utils.js'


const navContainer = document.querySelector('.nav-container');
const hamburger = document.querySelector('#hamburger');
const pokeSearch = document.querySelector('#poke-search')
const pokeButton = document.querySelector('.poke-button')

// Grabbing Elements to fill in 
const pokeName = document.querySelector('.poke-name');
const pokeNumDisplay = document.querySelector('.poke-num')
const pokeImg = document.querySelector('.poke-img');
const pokeballImg = document.querySelector('.pokeball-img');

//backside
const pokeCardBack = document.querySelector('.poke-card-back');
const pokeImgBack = document.querySelector('.poke-img-back');
const pokeDes = document.querySelector('.poke-description');

const hp = document.querySelector('.hp-stat')
const speed = document.querySelector('.speed-stat')
const atk = document.querySelector('.atk-stat')
const def = document.querySelector('.def-stat')
const spatk = document.querySelector('.spatk-stat')
const spdef = document.querySelector('.spdef-stat')



const pokeCard = document.querySelector('.poke-card');
const pokeType = document.querySelector('.poke-type');

const pokeTypeIcon1 = document.querySelector('.type-icon-1');
const pokeTypeIcon2 = document.querySelector('.type-icon-2');
const pokeAbility = document.querySelector('.ability');


const pokeDropdownG1 = document.querySelector('#poke-dropdownG1');
const pokeDropdownG2 = document.querySelector('#poke-dropdownG2');
const pokeDropdownG3 = document.querySelector('#poke-dropdownG3');
const pokeDropdownG4 = document.querySelector('#poke-dropdownG4');
const pokeDropdownG5 = document.querySelector('#poke-dropdownG5');
const pokeDropdownG6 = document.querySelector('#poke-dropdownG6');
const pokeDropdownG7 = document.querySelector('#poke-dropdownG7');
const pokeDropdownG8 = document.querySelector('#poke-dropdownG8');

hamburger.addEventListener('click', ()=>{
    if(navContainer.className === "nav-container"){
        // navContainer.classList.add('response');
        navContainer.className += " response";
    } else {
        navContainer.className = 'nav-container';
    }
    
})

pokeButton.addEventListener('click', (e)=> {
    e.preventDefault();

    const pokeNameSearch = pokeSearch.value.toLowerCase();
    if(pokeNameSearch === ""){
        console.log('We can add an element that flashes, please input pokemon');
    } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNameSearch}`)
    .then((response) => response.json())
    .then(data => {
        pokeballImg.style.opacity = "0";
        pokeCard.style.opacity = "0";
        pokeCardBack.style.opacity = "0";

        setTimeout(() => {
            if(pokeCard.classList.value === 'poke-card'){
                pokeCard.classList.add('border');
                pokeCardBack.classList.add('border-back')
            };
      
            //If a pokemon was normal / flying type then flying should be shown in the background isntead of normal
            //because flying type is more of a defining characteristic of that pokemon rather than normal
            if(data.types.length > 1 && data.types[0].type.name === "normal" && data.types[1].type.name === "flying"){
                pokeCard.className = `poke-card border ${data.types[1].type.name}-background`;
                pokeCardBack.className = `poke-card-back border-back ${data.types[1].type.name}-background`;
            } else {
                pokeCard.className = `poke-card border ${data.types[0].type.name}-background`;
                pokeCardBack.className = `poke-card-back border-back ${data.types[0].type.name}-background`;
            }
          
            pokeImg.src = data.sprites.front_default;
            pokeName.innerHTML = data.name;
    
            // Fill in Pokemon Type
            pokeTypeIcon1.src = "";
            pokeTypeIcon2.src = "";
            pokeTypeIcon1.className = '';
            pokeTypeIcon2.className = '';
            pokeTypeIcon2.style.display = "none";
        
            pokeType.innerHTML = `${data.types[0].type.name}`;
            pokeNumDisplay.innerHTML = `#${fillInZero(data.id.toString())}`
            pokeTypeIcon1.src = `img/icons/${data.types[0].type.name}.svg`
            pokeTypeIcon1.className = `type-icon-1 ${data.types[0].type.name}`
            
            if(data.types.length > 1){
                pokeType.innerHTML += `/${data.types[1].type.name}`
                
                pokeTypeIcon2.src = `img/icons/${data.types[1].type.name}.svg`
                pokeTypeIcon2.style.display = "inline-block";
                pokeTypeIcon2.className = `type-icon-2 ${data.types[1].type.name}`
                
            } else {
                pokeType.innerHTML = `${data.types[0].type.name}`
            }

            pokeAbility.innerHTML = `Ability: ${data.abilities[0].ability.name}`

            // If No Back Sprite (will implement later)
            // if(data.sprites.back_default === null){
            //     throw new Error('The backside of the pokemon sprite has not been added to the database. Please try again some other time.')
            // }
            pokeImgBack.src = data.sprites.back_default;
        
            hp.innerHTML = `HP:</span>${data.stats[0].base_stat}`;
            atk.innerHTML = `ATK:</span>${data.stats[1].base_stat}`;
            def.innerHTML = `DEF:</span>${data.stats[2].base_stat}`;
            spatk.innerHTML = `SPATK:</span>${data.stats[3].base_stat}`;
            spdef.innerHTML = `SPDEF:</span>${data.stats[4].base_stat}`;
            speed.innerHTML = `SPED:</span>${data.stats[5].base_stat}`;


            fetch(`${data.species.url}`).then((response) => response.json())
            .then(data => {
                //just guarantees that the language is english in the data base
            let i = 9;
            console.log('data.flavor', data.flavor_text_entries[i].language.name);
            while (data.flavor_text_entries[i].language.name !== "en"){
                i++;
            }
            console.log(i);
            pokeDes.innerHTML = data.flavor_text_entries[i].flavor_text;
            })

        }, 300);
       

        setTimeout(()=> {
            pokeCard.style.opacity = "1";
            pokeCardBack.style.opacity = "1";
        }, 950)
    })

}
    
})


fillPokemonOptions(pokemonG1, pokeDropdownG1);
fillPokemonOptions(pokemonG2, pokeDropdownG2);
fillPokemonOptions(pokemonG3, pokeDropdownG3);
fillPokemonOptions(pokemonG4, pokeDropdownG4);
fillPokemonOptions(pokemonG5, pokeDropdownG5);
fillPokemonOptions(pokemonG6, pokeDropdownG6);
fillPokemonOptions(pokemonG7, pokeDropdownG7);
fillPokemonOptions(pokemonG8, pokeDropdownG8);

function noBackSideRender(response) {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response
}


function pokeDropdownListener(pokeDropdown){
    pokeDropdown.addEventListener('change', () => {    
        pokeSearch.value = pokeDropdown.value; 
        //how to get the HTML in the drop down menu that gets selected
        // console.log(pokeDropdown.options[pokeDropdown.selectedIndex].text.split(" ")[1])
        pokeButton.click();
    })
}


pokeDropdownListener(pokeDropdownG1);
pokeDropdownListener(pokeDropdownG2);
pokeDropdownListener(pokeDropdownG3);
pokeDropdownListener(pokeDropdownG4);
pokeDropdownListener(pokeDropdownG5);
pokeDropdownListener(pokeDropdownG6);
pokeDropdownListener(pokeDropdownG7);
pokeDropdownListener(pokeDropdownG8);