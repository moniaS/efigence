$(document).ready(function() {

    $('.incompleted-btn').on('click', function(event) {
        $('.gameplay-panel').find('.completed').fadeOut('slow');
    })
    $('.all-btn').on('click', function (event) {
        $('.gameplay-panel').find('.card-item').fadeIn('slow');
    })
});