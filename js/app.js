$(document).foundation();
$(document).ready(function() {

    function showWarningMessage () {
        $('#val-message-container').fadeIn("slow").removeClass('hidden-message').delay(5000).fadeOut();
    };

    function sendAjax(passw) {

        if (passw.length < 1){
            showWarningMessage();
            $('.warning-message').text('Podaj hasło!');
            return;
        }

        var errorMessage;

        $('#val-message-container').addClass('hidden-message');

        $.ajax({
            type: "post",
            data: {
                login: "efi",
                password: passw
            },
            url: "https://efigence-camp.herokuapp.com/api/login",
            error: function(response) {
                var obj = JSON.parse(response.responseText);
                $('.warning-message').text(obj.message);
                showWarningMessage('#val-message-container');
            },
            success: function(response) {
                window.location.replace("http://google.com");

            }
        });
    };

    $('.go-btn').on('submit', function(event) {
        event.preventDefault();
        var passw = $('#password').val();
        sentAjax(passw);
    });

    $('.customer-image').on('click', function(event) {
        var url = $('.customer-image').attr('src');
        alert(url);
    });

    $('.search-icon').on('click', function(event) {

        event.preventDefault();
        $('.search-icon-link').hide();
        $('#search-input').fadeIn('slow');
        $('#search-icon-small-link').fadeIn('slow');
        $('.search-icon-small').fadeIn('slow');
        return false;
    });

/*document).click(function(){  
        $('#search-input').hide() //hide the button
        $('.search-icon-link').show();
    });*/
    
});