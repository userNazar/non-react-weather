const select = document.querySelector('select');
let lat = 49.3513996;
let lon = 23.5061662;
const aboutCity = {
    lon: "London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.",
    cair: `Cairo is the capital of Egypt and the city-state Cairo Governorate, and is the country's largest city, home to 10 million people'`,
    lviv: "Lviv is serves as the administrative centre of Lviv Oblast and Lviv Raion",
    prag: 'Prague, Czech Praha, city, capital of the Czech Republic. Lying at the heart of Europe, it is one of the continent’s finest cities and the major Czech economic and cultural centre. The city has a rich architectural heritage that reflects both the uncertain currents of history in Bohemia and an urban life extending back more than 1,000 years.',
    drog: "Drohobych is a city of regional significance in Lviv Oblast, Ukraine. It is the administrative center of Drohobych Raion and hosts the administration of Drohobych urban hromada, one of the hromadas of Ukraine.[1] In 1939–1941 and 1944–1959 it was the center of Drohobych Oblast."
}
weatherAPI(lat, lon)
about('drog')
select.addEventListener('input', () => {
    const coordination = select.value.split(' ');
    const [lat, lon, nameValue] = coordination;
    weatherAPI(lat, lon);
    about(nameValue)
})


async function weatherAPI(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d92e8f42ccb2b6cc14acf532b163aee4`);
        const data = await response.json();
        changeUI(data.name, data.main.temp, data.weather[0]['description'], data.weather[0]['icon'])
    } catch(e) {
        console.error(e)
    }
}

function changeUI(cityName, degrees, info, codeIcon) {
    document.querySelector('.weather__photo-text').textContent = info.toUpperCase();
    document.querySelector('.weather__city').textContent = cityName;
    document.querySelector('.weather__tempEU').innerHTML = `${Math.round(degrees) - 273}&deg`;
    document.querySelector('.weather__tempUSA').innerHTML = `${Math.round((Math.round(degrees) - 273 )* 9 / 5 + 32)}F&deg`;
    document.querySelector('.mainIcon').src = `http://openweathermap.org/img/wn/${codeIcon}@4x.png`;
}


function about(propName) {
    document.querySelector('.text').textContent = aboutCity[propName];
}






