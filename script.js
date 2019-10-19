const express = require('express')
const {make_API_call} = require('./API_helper')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const API_KEY = 'RGAPI-e030a1e9-fc09-4fda-8c84-920adb1df51a'
let url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/terracemouse?api_key=' + API_KEY 

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
 			for (let i=0;i<champions.length;i++ ) {  
	 			if (!champions[i].chestGranted) noChest.push(champions[i].championId)  
	 		}
	 		console.log(noChest)

	 		res.render('champions', {champions:champions, noChest:noChest})
	 		return noChest
	})
 
    .catch(next)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))