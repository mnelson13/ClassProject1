
let search;
let apikeySygic = "KpeNRgekRLJeDOc0Yg1D91Gv5VK3EnU3EqRxSykg";


$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('x-api-key', apikeySygic);
    }
});

$("#button").on("click", function(){
    event.preventDefault();
    search = $("#input").val();
    let queryURL = "https://api.sygictravelapi.com/1.1/en/places/list?query="+search+"&level=poi&limit=10&categories_not=traveling";
    console.log(search);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.data);
    var results = response.data;
    for(i=0;i<results.length;i++){
        var resultCard = $("<div>");
        var imgDiv = $("<div>");
        var imgR = $("img");

    }
    

    
    
    
    
    })
})




