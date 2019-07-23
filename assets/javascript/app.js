$(document).ready(function () {

    // variable declaration and initializaton

    var reactionArray = ["yes", "no", "seriously", "maybe", "dunno", "you got it", "peace", "working hard"];

    // dynamically generate reaction buttons
    var generateButtons = function () {
        $("#reactionButtons").empty();
        for (var i = 0; i < reactionArray.length; i++) {
            $("#reactionButtons").append("<button class=reaction data-reaction=" + reactionArray[i] + "'>" + reactionArray[i] + "</button>");
        }
    }

    // generates buttons on initial page load
    generateButtons();


    // dynamically adds buttons that the user enters
    $("#addReaction").on("click", function (event) {
        event.preventDefault();
        var reaction = $("#reaction-input").val().trim();
        console.log(reaction);
        reactionArray.push(reaction);
        console.log(reactionArray);
        generateButtons();
    });

    // Ajax call to pull GIFs and push them to the HTML div

    $(document).on("click", ".reaction", function () {
        reactions = $(this).attr("data-reaction");
 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            reactions + "&api_key=5ObQs95JkpmoljDUFn3tgG15UKrPeNZG";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var reactionDiv = $("<div>"); 
                    var p = $("<p>").html("Rating: " + results[i].rating);
                    var reactionImage = $("<img>");
                    // adds data necessary to stop/animate gifs
                    reactionImage.attr('src', results[i].images.fixed_height_still.url);
                    reactionImage.attr('data-still', results[i].images.fixed_height_still.url)
                    reactionImage.attr('data-animate', results[i].images.fixed_height.url)
                    reactionImage.attr("src", results[i].images.fixed_height.url);
                    reactionImage.addClass('img-GIF');
                    // 
                    reactionDiv.append(p);
                    reactionDiv.append(reactionImage);
                    $("#gifs-appear-here").prepend(reactionDiv);
                }
            });
    });

    // event listener to change img-GIF state on click

    $(document).on("click", ".img-GIF", function () {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });


});