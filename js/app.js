$(document).foundation();
$(document).ready(function() {

    function ajaxMethodPost(data, endpoint, method, onSuccess, onError) {
        $.ajax({
            method: method,
            url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
            data: data,
            success: function(response) {
                onSuccess(response);            
            },
            error: function(response) {
                onError(response);
            },
        })
    }

    function ajaxMethodGet(data, endpoint, method, onSuccess, onError) {
        $.ajax({
            method: method,
            url: "https://efigence-camp.herokuapp.com/api/" + endpoint,
            data: data,
            success: function(response) {
                onSuccess(response);
            },
            error: function(response) {
                onError(response);
            },
        })
    }

    function showWarningMessage () {
        $('#val-message-container').fadeIn("slow").removeClass('hidden-message').delay(5000).fadeOut();
    };

    function sendAjaxToLogin(login, passw) {

        if (passw.length < 1){
            showWarningMessage();
            $('.warning-message').text('Podaj hasło!');
            return;
        }
        $('#val-message-container').addClass('hidden-message');
        ajaxMethodPost({login: login, password: passw}, "login", "POST", 
            function(response) {
                window.location.replace("dashboard.html");
            },
            function(response) {
                var obj = JSON.parse(response.responseText);
                $('.warning-message').text(obj.message);
                showWarningMessage('#val-message-container');
        })
    };


    function sendAjaxToGetSummaryData() {
        ajaxMethodGet({}, "data/summary", "GET", 
            function(resp) {
                var currency = " PLN";
                $("#balance-value").text(replaceNumberWithSpaces(resp.content[0].balance) + currency);
                $("#funds-value").text(replaceNumberWithSpaces(resp.content[0].funds) + currency);
                $("#payments-value").text(replaceNumberWithSpaces(resp.content[0].payments) + currency);
            },
            function(resp) {
            }
        )
    };

    sendAjaxToGetSummaryData();


    function replaceNumberWithSpaces(yourNumber) {
        var number = yourNumber.toString().split(".");
        number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return number.join(".");
    }

    console.log(replaceNumberWithSpaces(26736020.23));

      $('.go-btn').on('submit', function(event) {
        event.preventDefault();
        var passw = $('#password').val();
        sendAjaxToLogin('', passw);
    });

    $('.customer-image').on('click', function(event) {
        var url = $('.customer-image').attr('src');
        alert(url);
    });

    $('.search-icon').on('click', function(event) {

        event.preventDefault();
        $('.search-icon-link').hide();
        $('#search-input').fadeIn('slow');
        $('#search-icon-input-link').fadeIn('slow');
        $('.search-icon-input').fadeIn('slow');
        return false;
    });
    $('.search-icon-small').on('click', function(event) {
        event.preventDefault
        $('#search-input').hide();
        $('#search-icon-input-link').hide();
        $('.search-icon-input').hide();        
        $('.search-icon-link').show();
    });
});