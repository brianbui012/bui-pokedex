const request = require('request');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../views')); 
// also could be just '../views' and not use path.join
//app.set('views', '../views');

console.log(path.join(__dirname, '../public'))
// since our index is in a src folder its best to do this instead of just express.static("public")
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));

// const url = 'https://pokeapi.co/api/v2/pokemon/charizard';
//take in information from the search bar and input it into the API URL and it will do the search and update the page 

// request({url, json: true}, (error, data)=>{
//     console.log(data.body);
// })

app.get('/pokemon', async (req,res) => {
    const url = `https://pokeapi.co/api/v2/generation/1`
    await request({url, json: true}, (error, data) => {
        console.log(data.body.pokemon_species)
    })
})

// const url = `https://pokeapi.co/api/v2/generation/1`
// request({url, json: true}, (error, data) => {
//     console.log(data.body.pokemon_species)
// })

app.get('/search', (req, res)=>{
    res.render('search');
})

app.post('/search', async (req,res) => {
    console.log(req.body);
    const url = `https://pokeapi.co/api/v2/pokemon/${req.body.pokemon}`

    await request({url, json: true}, (error, data) => {
        console.log(data.body.name);
        console.log(data.body.abilities);
        console.log(data.body.moves[0]);
        console.log(data.body.types[0].type.name)
        console.log(data.body.types[1].type.name)

        res.render('poke_page', 
        {
            picture: data.body.sprites.front_default,
            name: data.body.name,
            type: data.body.types
        });
    });
})

app.listen(process.env.PORT || '3000', ()=> {
    console.log('Server Port 3000 is up and running!')
});

