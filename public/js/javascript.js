console.log('Connected');

import {pokemonG1} from './generationList.js'
import {pokemonG2} from './generationList.js'
import {pokemonG3} from './generationList.js'
import {fillPokemonOptions} from './utils.js'
import {fillInZero} from './utils.js'


const navContainer = document.querySelector('.nav-container');
const hamburger = document.querySelector('#hamburger');
const pokeSearch = document.querySelector('#poke_search')
const pokeButton = document.querySelector('.poke_button')

// Grabbing Elements to fill in 
const pokeName = document.querySelector('#poke_name');
const pokeNumDisplay = document.querySelector('#poke_num')
const pokeImg = document.querySelector('#poke_img');
const pokeballImg = document.querySelector('.pokeball_img');

//backside
const pokeCardBack = document.querySelector('.poke_card_back');
const pokeImgBack = document.querySelector('#poke_img_back');
const pokeDes = document.querySelector('.poke_des');

const hp = document.querySelector('.hp_stat')
const speed = document.querySelector('.speed_stat')
const atk = document.querySelector('.atk_stat')
const def = document.querySelector('.def_stat')
const spatk = document.querySelector('.spatk_stat')
const spdef = document.querySelector('.spdef_stat')



const pokeCard = document.querySelector('.poke_card');
const pokeType = document.querySelector('.poke_type');

const pokeTypeIcon1 = document.querySelector('.type_icon_1');
const pokeTypeIcon2 = document.querySelector('.type_icon_2');
const pokeAbility = document.querySelector('.ability');


const pokeDropdown = document.querySelector('#poke_dropdown');
const pokeDropdownG2 = document.querySelector('#poke_dropdownG2');
const pokeDropdownG3 = document.querySelector('#poke_dropdownG3');

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
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNameSearch}`)
    .then((response) => response.json())
    .then(data => {
        pokeballImg.style.opacity = "0";
        pokeCard.style.opacity = "0";
        pokeCardBack.style.opacity = "0";

        setTimeout(() => {
            if(pokeCard.classList.value === 'poke_card'){
                pokeCard.classList.add('border');
                pokeCardBack.classList.add('border-back')
            };
      
            //If a pokemon was normal / flying type then flying should be shown in the background isntead of normal
            //because flying type is more of a defining characteristic of that pokemon rather than normal
            if(data.types.length > 1 && data.types[0].type.name === "normal" && data.types[1].type.name === "flying"){
                pokeCard.className = `poke_card border ${data.types[1].type.name}_background`;
                pokeCardBack.className = `poke_card_back border-back ${data.types[1].type.name}_background`;
            } else {
                pokeCard.className = `poke_card border ${data.types[0].type.name}_background`;
                pokeCardBack.className = `poke_card_back border-back ${data.types[0].type.name}_background`;
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
            pokeTypeIcon1.className = `type_icon_1 ${data.types[0].type.name}`
            
            if(data.types.length > 1){
                pokeType.innerHTML += `/${data.types[1].type.name}`
                
                pokeTypeIcon2.src = `img/icons/${data.types[1].type.name}.svg`
                pokeTypeIcon2.style.display = "inline-block";
                pokeTypeIcon2.className = `type_icon_2 ${data.types[1].type.name}`
                
            } else {
                pokeType.innerHTML = `${data.types[0].type.name}`
            }

            pokeAbility.innerHTML = `Ability: ${data.abilities[0].ability.name}`

            //Filling out backside of card
            pokeImgBack.src = data.sprites.back_default;
        
            hp.innerHTML = `HP:</span>${data.stats[0].base_stat}`;
            // `HP:${data.stats[0].base_stat}`;
            atk.innerHTML = `ATK:</span>${data.stats[1].base_stat}`;
            def.innerHTML = `DEF:</span>${data.stats[2].base_stat}`;
            spatk.innerHTML = `SPATK:</span>${data.stats[3].base_stat}`;
            spdef.innerHTML = `SPDEF:</span>${data.stats[4].base_stat}`;
            speed.innerHTML = `SPED:</span>${data.stats[5].base_stat}`;


            fetch(`${data.species.url}`).then((response) => response.json())
            .then(data => {
            pokeDes.innerHTML = data.flavor_text_entries[9].flavor_text;
        })
        }, 400);
       

        setTimeout(()=> {
            pokeCard.style.opacity = "1";
            pokeCardBack.style.opacity = "1";
        }, 650)


    })
})

fillPokemonOptions(pokemonG1, pokeDropdown);
fillPokemonOptions(pokemonG2, pokeDropdownG2);
fillPokemonOptions(pokemonG3, pokeDropdownG3);



function pokeDropdownListener(pokeDropdown){
    pokeDropdown.addEventListener('change', () => {    
        pokeSearch.value = pokeDropdown.value; 
        //how to get the HTML in the drop down menu that gets selected
        // console.log(pokeDropdown.options[pokeDropdown.selectedIndex].text.split(" ")[1])
        pokeButton.click();
    })
}


pokeDropdownListener(pokeDropdown);
pokeDropdownListener(pokeDropdownG2);
pokeDropdownListener(pokeDropdownG3);