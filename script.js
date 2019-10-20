const express = require('express')
const {make_API_call} = require('./API_helper')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

const API_KEY = 'RGAPI-054a0139-18e3-4f4a-a17d-78c61a192531'
let url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/terracemouse?api_key=' + API_KEY 

console.log("TESTING TESTING TEST")
//view engine to ejs: 
app.set('view engine','ejs'); 
 

app.get('/', (req,res) => res.render('landing'))

app.get('/summonerIDs', (req, res,next) => {
	 
	let sumID = req.query.id 
	url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + sumID + '?api_key=' + API_KEY 

    make_API_call(url)
    .then(response => {
       console.log('response 1: ')
        url = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + response.id + '?api_key=' + API_KEY; 

        return make_API_call(url)
    })
    .then(response2 => {
    		let champions = response2
        	console.log('sending response2')
        	let noChest = []  
        	let masteryCount = 0; 
 			for (let i=0;i<champions.length;i++ ) {  
	 			if (!champions[i].chestGranted) noChest.push(champions[i].championId)  

	 			if (champions[i].championLevel == 7) { masteryCount++ }
	 		}
	 		console.log(noChest)

	 		res.render('champions', {champions:champions, noChest:noChest, masteryCount:masteryCount})
	 		return noChest
	})
 
    .catch(next)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))