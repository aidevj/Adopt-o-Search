"use strict";

$(".closePanel").on("click", function () {
    // Hide control panel content before shrinking
    $("#controlPanelContent").hide();

    // Get rid of X and put in +
    $(this).removeClass('closePanel').addClass('openPanel');

    // Shrink panel
    $("#controlPanel").animate({
        width: "20px",
        padding:0 // also make resize not possible now
    }, {
        duration: 200,
        specialEasing: {
            width: 'swing'
        }
    });
});

// not firing at all
$('.openPanel').on("click", function (){
    alert("open clicked");

    // Expand Panel
    $("#controlPanel").animate({
        width: "300px",
        padding:0
    }, {
        duration: 200,
        specialEasing: {
            width: 'swing'
        }
    });

    // Get rid of + and put in X
    $(this).removeClass('openPanel').addClass('closePanel');

    // Show control panel content after expanding panel
    $("#controlPanelContent").show();
});

$('#readMore').on('click', function () {
  
});

