$(document).foundation();
$(document).ready(function() {

    function showWarningMessage () {
        $('#val-message-container').fadeIn("slow");
        $('#val-message-container').removeClass('hidden-message');
        $('#val-message-container').delay(10000).fadeOut();
    };

    function sentAjax(passw) {
        if (passw.length > 0) {
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
        } else {
            showWarningMessage();
            $('.warning-message').text('Podaj hasło!');
        }
    };

    $('.go-btn').on('click', function(event) {
        event.preventDefault();
        var passw = $('#password').val();
        sentAjax(passw);

    });

    $('.customer-image').on('click', function(event) {
        var url = $('.customer-image').attr('src');
        alert(url);
    });
});