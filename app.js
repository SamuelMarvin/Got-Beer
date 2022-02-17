const userSection = document.querySelector('.userSection');

const resultsContainer = document.createElement('div')
resultsContainer.className = 'resultsContainer';
userSection.appendChild(resultsContainer);


$('.userInput').on('keyup',function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $('button').click();
        }
    });
 

 $('button').on("click", () => {
    let userInput = document.querySelector('.userInput').value;
    let userInputArr = userInput.split(',');
    let userInputCity = userInputArr[0];
    let userInputState = userInputArr[1];
     $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${userInputCity},${userInputState}&limit=1&appid=01167cf5eba2aa42f3459df605ceef5e`, (data) =>{
        console.log(data)
        let lat = data[0]['lat'];
        let lon = data[0]['lon'];
        // console.log(lon, lat);
        $.get(`https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}`, (data) =>{
            resultsContainer.innerText = '';
            breweryInfo(data);
        })
    });
});


function breweryInfo(data) {
    for (let i = 0; i < data.length; i++){
        let div = document.createElement('div');
        div.className = 'resultsCard';
        resultsContainer.appendChild(div);
        let h1 = document.createElement('h1');
        h1.className = 'breweryName';
        h1.innerText = data[i]['name'];
        div.appendChild(h1);
        let p1 = document.createElement('p');
        p1.className = 'breweryType';
        p1.innerText = `Brewery Type: ${data[i]['brewery_type']}`;
        div.appendChild(p1);
        let p2 = document.createElement('p');
        p2.className = 'BreweryPhone';
        p2.innerText = `Phone Number: ${data[i]['phone']}`;
        div.appendChild(p2);
        let p3 = document.createElement('p');
        p3.className = 'street';
        p3.innerText = `Street: ${data[i]['street']}`;
        div.appendChild(p3);
        let p4 = document.createElement('p');
        p4.className = 'cityState';
        p4.innerText = `City/State: ${data[i]['city']}, ${data[i]['state']}`;
        div.appendChild(p4);
        let p5 = document.createElement('a');
        p5.className = 'website';
        p5.innerText = 'Website';
        p5.href = data[i]['website_url'];
        div.appendChild(p5);
    }
}


// want to add a map with markers of the location of the brewery