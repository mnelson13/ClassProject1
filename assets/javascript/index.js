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

    function getCarouselPictures(slideNumber, place) {
        $.ajax({
            url: "https://api.unsplash.com/search/photos/?client_id=ea658d196f8065e9e581a2aa235b4fc0c6306ed8d096946f1139e92aa3103a53&orientation=landscape&query=" + place,
            method: "GET",
        }).then(function (response) {
            let img = response.results[0].urls.full;
            let classNumber = slideNumber + 2;
            $('.NA' + classNumber).css('background-image', 'url(' + img + ')');
        })
    }


    function getContinentData(num) {
        let numArray = ["2", "3", "4"];
        let searchValues = ["North America"]
        let searchValue = searchValues[num];
        let queryURL = "https://api.sygictravelapi.com/1.1/en/places/list?query=" + searchValue + "&level=poi&limit=10&categories_not=traveling";
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "x-api-key": apikeySygic,
            }
        }).then(function (response) {
            for (i = 0; i < numArray.length; i++) {
                let placeName = response.data.places[i].name
                getCarouselPictures(i, placeName)
            }
        })
    }

    getContinentData(0)

    $("#searchIndex").keypress(function (e) {
        searchValue = $("#searchIndex").val();
        localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        var key = e.which;
        if (key === 13) {
            window.open("results.html");


        }
    })

})