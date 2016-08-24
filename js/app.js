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
                console.log(response);
                window.location.replace("dashboard.html");

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
    $('.search-icon-small').on('click', function(event) {
        event.preventDefault
        $('#search-input').hide();
        $('#search-icon-small-link').hide();
        $('.search-icon-small').hide();        
        $('.search-icon-link').show();

    });

/*document).click(function(){  
        $('#search-input').hide() //hide the button
        $('.search-icon-link').show();
    });*/
    function ajaxPost(data, endpoint, method, success) {
        $.ajax({
            method: method,
            url: "https://efigence-camp.herokuapp.com/api/",
            data: data
        })
        .done(function(msg) {
            success(msg);
        });
    }
    
    // ajaxPost({
    //     login: "efi",
    //     password: "camp"
    // }, "data/summary", "POST", function(response){
    //     //console.log(response);
    // });


    function ajaxGet(data, endpoint, method, success) {
        $.ajax({
            method: method,
            url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
            data: data
        })
        .done(function(msg) {
            console.log(msg);
            success(msg);
        });
    }

    ajaxGet({}, "data/summary", "GET", function(resp) {
        console.log(resp.content[0].balance);
        $("#balance-value").text(resp.content[0].balance);
        $("#funds-value").text(resp.content[0].funds);
        $("#payments-value").text(resp.content[0].payments);
    });
});