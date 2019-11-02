const express = require('express')
const {make_API_call} = require('./API_helper')
const leagueChampions = require('./leagueChampions')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

const API_KEY = 'RGAPI-24294f19-9cec-49bb-b702-6c5eea1a6104'
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
            let yesChest = [] 
        	let masteryCount = 0; 
 			for (let i=0;i<champions.length;i++ ) {  
	 			if (!champions[i].chestGranted) noChest.push(champions[i].championId)  
                if (champions[i].chestGranted) yesChest.push(champions[i].championId)
	 			if (champions[i].championLevel == 7) { masteryCount++ }
	 		}
	 		console.log(noChest)
            let leagueObj = leagueChampions.data
            let leagueArr = Object.keys(leagueObj)
            let first = leagueArr[0] // 'Aatrox'
            console.log(leagueObj[first].key)
            //[ {name:key}]

             let b = {} 
            for (let name of leagueArr ) {
                   
                b[leagueObj[name].key] = name
                                             
                 
            }
            let noChestChamps = [] 
            let yesChestChamps = [] 
            //newArr = [ {'500':Aatrox}, {'1': 'Annie'}]
            //noChest = [3,5,16,50,...]


           for (let val in noChest) {
          noChestChamps.push((b[noChest[val].toString()]))

          }
           for (let val in yesChest) {
          yesChestChamps.push((b[yesChest[val].toString()]))

          }
          noChestChamps = noChestChamps.filter ( x =>{
            return x
          })
          yesChestChamps = yesChestChamps.filter ( x =>{
            return x
          })
          noChestChamps = noChestChamps.sort()
          yesChestChamps = yesChestChamps.sort()
            console.log(yesChest)
           
             
	 		res.render('champions', { sumID:sumID, champions:champions, noChest:noChest, masteryCount:masteryCount,noChestChamps:noChestChamps, yesChestChamps:yesChestChamps })
	 		 
	})

 
    .catch(next)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))