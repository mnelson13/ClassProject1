$(document).ready(function () {

    let apikeySygic = "KpeNRgekRLJeDOc0Yg1D91Gv5VK3EnU3EqRxSykg";

    //CAROUSEL
    var carousel = $(".carousel")

    if (carousel.length > 0) {
        carousel.carousel({
            dist: 0,
            padding: 0,
            fullWidth: true,
            indicators: true,
            duration: 100,
        });

        function autoplay() {
            $('.carousel').carousel('next');
        }

        setInterval(autoplay, 4500);

    }

    function getCarouselPictures(slideNumber, place, continent) {
        $.ajax({
            url: "https://api.unsplash.com/search/photos/?client_id=9d96977ed5858506ff94a1abca2aa5ad570e2cbd63431c8caa986e5a8865dd80&orientation=landscape&query=" + place,
            method: "GET",
        }).then(function (response) {
            console.log(response)
            let img = response.results[slideNumber].urls.regular;
            let classNumber = slideNumber + 1;
            let className = '.' + continent + classNumber;
            let idName = '#' + continent + "Slide" + classNumber;
            console.log(className);
            console.log(place);
            $(idName).text(place);
            $(className).css('background-image', 'url(' + img + ')');
        })
    }

    function getContinentData(num) {
        let numArray = ["1", "2", "3", "4"];
        let continentArray = ["Paris", "Hollywood", "Rio de Janeiro", "Hong Kong", "Dubai"]
        let toSearch = continentArray[num];
        let offset = 1;
        let queryURL = "https://api.sygictravelapi.com/1.1/en/places/list?query=" + toSearch + "&level=poi&limit=10&categories_not=traveling&offset=" + offset;
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "x-api-key": apikeySygic,
            }
        }).then(function (response) {
            for (i = 0; i < numArray.length; i++) {
                let placeName = response.data.places[i].name;
                if (num == 0) {
                    var continent = "NA";
                }
                else if (num == 1) {
                    var continent = "AS";
                }
                else if (num == 2) {
                    var continent = "SA";
                }
                else if (num == 3) {
                    var continent = "EU";
                }
                else if (num == 4) {
                    var continent = "AF";
                }
                $("#" + continent + "Des" + numArray[i]).text(response.data.places[i].perex);
                getCarouselPictures(i, placeName, continent)
            }
        })
    }

    getContinentData(0);
    getContinentData(1);
    getContinentData(2);
    getContinentData(3);
    getContinentData(4);

    $("#searchIndex").keypress(function (e) {
        searchValue = $("#searchIndex").val();
        // localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        var key = e.which;
        if (key === 13) {
            window.open("results.html");
        }
    })
    $("#parisBtn").click(function (e) {
        searchValue = "Paris";
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        window.open("results.html");
    })
    $("#hollywoodBtn").click(function (e) {
        searchValue = "Hollywood";
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        window.open("results.html");
    })
    $("#rdjBtn").click(function (e) {
        searchValue = "Rio de Janeiro";
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        window.open("results.html");
    })
    $("#hongKongBtn").click(function (e) {
        searchValue = "Hong Kong";
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        window.open("results.html");
    })
    $("#dubaiBtn").click(function (e) {
        searchValue = "Dubai";
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        window.open("results.html");
    })
})