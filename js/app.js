$(document).foundation();
$(document).ready(function() {

    function sentAjax(passw) {
        if (passw.length > 0) {
            $.ajax({
                type: "post",
                data: {
                    login: "efi",
                    password: passw
                },
                url: "https://efigence-camp.herokuapp.com/api/login",
                error: function(response) {
                    console.log(response.responseText);
                },
                success: function(response) {
                    console.log(response);
                }
            });
        } else {
            $('.val-message').show();
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