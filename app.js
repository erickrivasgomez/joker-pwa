var url = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist'
const jokeSelector = document.querySelector('#joke');
const setupSelector = document.querySelector('#setup');
const deliverySelector = document.querySelector('#delivery');
let cache = []

function getDataFromNetwork(url) {
	var req = new Request(url)

	fetch(url)
		.then(Response => Response.json())
		.then(data => {
			//data = JSON.parse(data)
			if (data.joke) {
				jokeSelector.innerHTML = data.joke
			} else {
				setupSelector.innerHTML = data.setup
				deliverySelector.innerHTML = data.delivery
			}
			cache = data
		})
		.catch(err => console.log(err))
}


function getDataFromCache() {
	if (!('caches' in window)) {
		return null;
	}

	return caches.match(url)
		.then((response) => {
			if (response) {
				console.log(response)
				return response.json();
			}
			return null;
		})
		.catch((err) => {
			console.error('Error getting data from cache', err);
			return null;
		});
}

getDataFromCache()
getDataFromNetwork(url)