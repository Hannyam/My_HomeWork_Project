async function track(){
    const url = 'https://spotify23.p.rapidapi.com/search/?q=love%20the%20way%20you%20lie&type=tracks&offset=0&limit=10&numberOfTopResults=5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8ffb5c590cmshf00edaa7fe8402bp1bea45jsn6b8aa4ba8d5d',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
    console.log("errorrrrrr")
	console.error(error);
}
}