var url = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist'
const jokeSelector = document.querySelector('#joke');
const setupSelector = document.querySelector('#setup');
const deliverySelector = document.querySelector('#delivery');
let cache = []

function getDataFromNetwork(url) {
	var req = new Request(url)
	let jokes = []

	for (let i = 0; i < 15; i++) {
		fetch(url)
			.then(Response => Response.json())
			.then(data => {
				//console.log(data)
				jokes[i] = data
				//data = JSON.parse(data)
			})
			.then(e => {
			})
			.catch(err => console.log(err))
		}
		console.log(jokes)
		joke = jokes.pop()
		if (joke.joke) {
			jokeSelector.innerHTML = joke.joke
		} else {
			setupSelector.innerHTML = joke.setup
			deliverySelector.innerHTML = joke.delivery
		}
		cache = jokes
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