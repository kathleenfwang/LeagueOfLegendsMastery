const request = require('request')

module.exports = {
	// this method returns a promise which is resolved or rejected based on API

	make_API_call : function(url) {
		return new Promise( (resolve,reject)=>
		{
			request(url, {json:true}, (err,res,body) =>
			{
				if (err) reject(err)
				resolve(body)
			})
		})
	}
}