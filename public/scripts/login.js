$(document).ready(function(){
    $('.pass_show').append('<span class="ptxt">Show</span>');  
});

$(document).on('click','.pass_show .ptxt', function() { 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    
    $(this).prev().attr('type', function(index, attr) {
        return attr == 'password' ? 'text' : 'password'; 
    }); 
});

function timeRefresh(timeoutPeriod) {
    window.setTimeout(function(){
        var domain = document.getElementsByName('domain')[0];
        if (domain) window.location.href = domain;
    }, timeoutPeriod);
}