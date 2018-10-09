$(document).ready(function(){

    //CAROUSEL
    var carousel = $(".carousel")

    if (carousel.length >0) {
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

    $("#searchIndex").keypress(function(e){
        searchValue = $("#searchIndex").val();
        // localStorage.clear();
        localStorage.setItem("searchValue", searchValue);
        var key = e.which;
        if (key === 13) {
            window.open("results.html");
            
            
        }
    })

})