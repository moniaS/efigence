$(document).ready(function() {

    $('.incompleted-btn').on('click', function(event) {
        $('.gameplay-panel').find('.completed').fadeOut('slow');
    })
    $('.all-btn').on('click', function (event) {
        $('.gameplay-panel').find('.card-item').fadeIn('slow');
    })

    $('.search-icon').on('click', function(event) {

        event.preventDefault();
        $('.search-icon-link').hide();
        $('#search-input').fadeIn('slow');
        $('#search-icon-input-link').fadeIn('slow');
        $('.search-icon-input').fadeIn('slow');
        return false;
    });
    $('.search-icon-small').on('click', function(event) {
        event.preventDefault();
        $('#search-input').hide();
        $('#search-icon-input-link').hide();
        $('.search-icon-input').hide();
        $('.search-icon-link').show();
    });
});