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

    // For last 30 days.
    for (let i = 30; i >= 0; i--) {
        xs.push(countrydata[i].dateRep);
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
                label: 'Deaths',
                backgroundColor: 'rgb(127, 219, 255)',
                borderColor: 'rgb(2, 255, 112)',
                data: deaths.ys, 
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Y-axes starting at 0
                        beginAtZero : true
                    }
                }]
            }
        }
    });

}









