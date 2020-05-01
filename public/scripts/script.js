$(document).ready(() => {
    $('#btn-find').click(() => {
        getGraph();
    });
});

async function getDeaths() {
    const xs = [];
    const ys = [];

    const api_url = '/covid/data';
    const fetch_response = await fetch(api_url);
    const jsonres = await fetch_response.json();

    let country = $('#i-country').val();
    let countrydata = jsonres.records.filter((c) => {
        return c.countriesAndTerritories == country;
    });

    //For all.
    // for (let i = 0; i < countrydata.length; i++) {
    //     xs.push(i);
    //     ys.push(parseInt(countrydata[i].deaths));
    // }

    //For last 30 days.
    for (let i = 0; i < 30; i++) {
        xs.push(i);
        ys.push(parseInt(countrydata[i].deaths));
    }
    console.log(ys)
    return { xs, ys };
}

async function getGraph() {
    const deaths = await getDeaths();
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: deaths.xs,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: deaths.ys 
            }]
        },

        // Configuration options go here
        options: {}
    });

}









