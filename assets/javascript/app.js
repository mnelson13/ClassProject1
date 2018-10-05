$(document).ready(function(){

    var searchResult;
    let APIKeyWeather = "df51c21d9a4ddc2a75c5f87f7600ed95";
    let apikeySygic = "KpeNRgekRLJeDOc0Yg1D91Gv5VK3EnU3EqRxSykg";

    $("#button").on("click", function(){
        event.preventDefault();
        searchResult = $("#input").val();
        let queryURL = "https://api.sygictravelapi.com/1.1/en/places/list?query="+searchResult+"&level=poi&limit=10&categories_not=traveling";
        console.log(searchResult);
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "x-api-key": apikeySygic,
            }
        }).then(function(response){
            console.log(response);

            var results = response.data.places
            
            results.forEach(
                function(result) {
                    let lat = result.location.lat
                    let lon = result.location.lng
                    let queryURL2 = "https://api.openweathermap.org/data/2.5/weather?appid=" +APIKeyWeather + "&lat=" + lat + "&lon=" + lon +"";
                    let resultDiv = $("<div>");
                    resultDiv.attr("class", "row results");

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    }).then(function(response){
                        console.log(response);
                        let weatherDiv = $("<div>")
                        weatherDiv.attr("class", "col-md-3");
                        
                        weatherDiv.append('<p>Current Weather for ' + response.name + ':<p>')

                        weatherDiv.append('<p>General: ' + response.weather[0].description + '<p>')

                        var F = Math.round((response.main.temp - 273.15) * 1.8 +32);
                        weatherDiv.append('<p>Temp: ' + F + ' F<p>')

                        weatherDiv.append('<p>Humidity: ' + response.main.humidity + '<p>')
                        weatherDiv.append('<p>Wind Speed: ' + response.wind.speed)
                        weatherDiv.append('<a href="https://openweathermap.org/city/' + response.id + '" target="_blank">Click here for exteded forecast</a>')

                        resultDiv.append(weatherDiv);

                    })

                    let travelDiv = $("<div>");
                    travelDiv.attr("class", "col-md-9");

                    if (result.thumbnail_url !== null) {
                    travelDiv.append('<img src="' + result.thumbnail_url + '" />')
                    };

                    if (result.original_name !== null) {
                    travelDiv.append('<h3>'+ result.original_name + '</h3>');
                    };

                    if (result.perex !== null) {
                    travelDiv.append('<p>' + result.perex + '</p>');
                    };

                    if (result.url !== null) {
                        travelDiv.append('<a href="' + result.url + '" target="_blank">Click here for more information</a>')
                        };

                    resultDiv.prepend(travelDiv);

                    $("#mainDiv").append(resultDiv);
                    

                }
            )

        })
    })


})