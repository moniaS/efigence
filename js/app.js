$(document).foundation();
$(document).ready(function() {

    //----------------functions to send ajax----------------------------
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

    function getAjaxAddress(endpoint) {
        return  "https://efigence-camp.herokuapp.com/api/" + endpoint;
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
                var currency = ",00 PLN";

                $("#balance-value").text(formatMoneyValue(resp.content[0].balance) + currency);
                console.log(resp.content[0].balance);
                $("#funds-value").text(formatMoneyValue(resp.content[0].funds) + currency);
                $("#payments-value").text(formatMoneyValue(resp.content[0].payments) + currency);
            },
            function(resp) {
            }
        )
    };

    sendAjaxToGetSummaryData();

    ajaxMethodGet({}, "data/history", "GET", 
        function(resp) {
            var rowTemplate = (data) => {
                return `<li class="row collapse"><div class="small-2 column">${(new Date(data.date)).toISOString().slice(0,10)}</div><div class="small-8 column">${data.description}</div><div class="small-2 column">${data.amount}</div></li>`
            }
            for(var i = 0; i<resp.content.length; i++) {
                $("#list").append(rowTemplate({date: resp.content[i].date, description: resp.content[i].description, amount: resp.content[i].amount}));
                //$("#list").append('<li class="row collapse"><div class="small-2 column">' + resp.content[i].date + '</div><div class="small-8 column">' + resp.content[i].description + '</div><div class="small-2 column">' +  resp.content[i].amount + " " +  resp.content[i].currency + '</div></li>');
            }
        },
        function(resp) {

        })


    //-----------------other functions---------------------------

     function showWarningMessage () {
        $('#val-message-container').fadeIn("slow").removeClass('hidden-message').delay(5000).fadeOut();
    };

    function formatMoneyValue(yourNumber) {
        var number = yourNumber.toString().split(".");
        number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return number.join(".");
    }

    //-------------on clicks--------------------------------------
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