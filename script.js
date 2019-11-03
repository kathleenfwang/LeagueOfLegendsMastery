const express = require('express')
const {make_API_call} = require('./API_helper')
const leagueChampions = require('./leagueChampions')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

 
const API_KEY = 'RGAPI-24294f19-9cec-49bb-b702-6c5eea1a6104'
let url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/terracemouse?api_key=' + API_KEY 
=======
const API_KEY = '******************'
 

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
	  if (response2.status) res.render('error')
          let champions = response2
      
          let mastery7 = [] 
        	let noChest = []  
            let yesChest = [] 
        	let masteryCount = 0; 
 			for (let i=0;i<champions.length;i++ ) {  
	 			if (!champions[i].chestGranted) noChest.push(champions[i].championId)  
        if (champions[i].chestGranted) yesChest.push(champions[i].championId)
	 			if (champions[i].championLevel == 7) { 
          masteryCount++;  
          mastery7.push(champions[i].championId)
        }
	 		}
	 	 
            let leagueObj = leagueChampions.data
            let leagueArr = Object.keys(leagueObj)
            let first = leagueArr[0] // 'Aatrox'
            
            //[ {name:key}]

            let b = {} 
            for (let name of leagueArr ) {
                   
                b[leagueObj[name].key] = name
                                             
                 
            }

            function convertIdToChamp(ids) {
              let champList = [] 
              for (let val in ids) {
                champList.push(b[ids[val].toString()]) 
              }
              champList = champList.filter ( x => x)
              return champList.sort() 
            }

            let noChestChamps = convertIdToChamp(noChest) 
            let yesChestChamps = convertIdToChamp(yesChest)
            let mastery7Champs = convertIdToChamp(mastery7)
          
	 		res.render('champions', { sumID:sumID, champions:champions, masteryCount:masteryCount,noChestChamps:noChestChamps, yesChestChamps:yesChestChamps,mastery7Champs:mastery7Champs })
 
    .catch(next)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
