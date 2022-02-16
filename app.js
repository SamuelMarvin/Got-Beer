const resultsContainer = document.createElement('div')
resultsContainer.className = 'resultsContainer';
document.body.appendChild(resultsContainer);


$('button').on("click", () => {
    $.get(`https://api.openbrewerydb.org/breweries?by_city=${document.querySelector('.userInput').value}`, (data) =>{
        resultsContainer.innerText = '';
        breweryInfo(data);
    });
});


function breweryInfo(data) {
    for (let i = 0; i < data.length; i++){
            let div = document.createElement('div');
            div.className = 'results';
            resultsContainer.appendChild(div);
            let h1 = document.createElement('h1');
            h1.className = 'breweryName';
            h1.innerText = data[i]['name'];
            div.appendChild(h1);
            let p1 = document.createElement('ul');
            p1.className = 'breweryType';
            p1.innerText = `Brewery Type: ${data[i]['brewery_type']}`;
            div.appendChild(p1);
            let p2 = document.createElement('ul');
            p2.className = 'BreweryPhone#';
            p2.innerText = `Phone Number: ${data[i]['phone']}`;
            div.appendChild(p2);
            let p3 = document.createElement('ul');
            p3.className = 'address';
            p3.innerText = `Address: ${data[i]['street']}, ${data[i]['city']}, ${data[i]['state']}`;
            div.appendChild(p3);
            let p4 = document.createElement('a');
            p4.className = 'website';
            p4.innerText = 'Website';
            p4.href = data[i]['website_url'];
            div.appendChild(p4);
            // console.log(data[i]);
    }
}


