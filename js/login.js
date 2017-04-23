$(document).ready(function() {

    function getAjaxAddress(endpoint) {
        return "https://efigence-camp.herokuapp.com/api/" + endpoint;
    }

    function ajaxMethodPost(data, endpoint, method, onSuccess, onError) {
        $.ajax({
            method,
            url: getAjaxAddress(endpoint),
            data,
            success: function(response) {
                onSuccess(response);
            },
            error: function(response) {
                onError(response);
            },
        })
    }

    function sendAjaxToLogin(login, passw) {

        // if (passw.length < 1) {
        //     showWarningMessage();
        //     $('.warning-message').text('Podaj hasło!');
        //     return;
        // }
        $('#val-message-container').addClass('hidden-message');
        ajaxMethodPost({
                login: login,
                password: passw
            }, "login", "POST",
            function(response) {
                window.location.replace("dashboard.html");
            },
            function(response) {
                window.location.replace("pages/dashboard.html"); //here should be validation error
                //showWarningMessage();
            })
    }

    function showWarningMessage() {
        $('#val-message-container').fadeIn("slow").removeClass('hidden-message').delay(5000).fadeOut();
    }

    $('.go-btn').on('click', function(event) {
        event.preventDefault();
        var passw = $('#password').val();
        sendAjaxToLogin('', passw);
    });
})