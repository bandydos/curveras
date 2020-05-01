//Also possible in jquery.
$(document).ready(() => {
    const url = '/covid/data';
    $('#btn-find').click(() => {
        let country = $('#i-country').val();
        $.getJSON(url, (data) => {
            let countrydata = data.records.filter((c) => {
                return c.countriesAndTerritories == country; 
            });
            console.log(countrydata)
        });
        console.log(country);
    });
});