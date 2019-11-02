 
=======
# League Of Legends Champion Information
Champion info for league of legends account based on summoner name. 

## Features: 
- Pulls information from official League of Legends API for total champions 
- Pulls information for total number of champions without a chest obtained 
- Displays a count for total number of champions with Mastery Level 7
  
## To Run Locally: 
- Clone this repository: 
```sh
git clone https://github.com/kathleenfwang/leagueoflegendschampioninfo.git
```
- Instal dependencies:  
```sh
npm install
```
- Obtain a [Riot Developer Key](https://developer.riotgames.com/) and insert into const "key" variable 
```sh
const API_KEY = '******************'
```
- Run script page and open up localhost:3000!
```sh
node script.js
```
** Note: If you are getting a server error, make sure the const "PORT" is set to 3000 

## What I learned: 
- Chaining promises and returning responses to new promises with "then"
- Not easy to make data visuals in EJS and Node :( 
 

### Technologies used: 
- League of Legends API 
- Express.js  
- Node.js 
- EJS 
- SemanticUI 
- Heroku 

## Future additions: 
- refractor code made to compile champion name list so it is cleaner  
- Data visuals 
  - pie chart for no chest champions
  - bar graph for overall champion mastery 
 
