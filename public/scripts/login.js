$(document).ready(function(){
    $('.pass_show').append('<span class="ptxt">Show</span>');  
});

$(document).on('click','.pass_show .ptxt', function() { 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    
    $(this).prev().attr('type', function(index, attr) {
        return attr == 'password' ? 'text' : 'password'; 
    }); 
});

function timeRefresh(url, timeoutPeriod) {
    window.setTimeout(function(){ 
        window.location.href = url;
    }, timeoutPeriod);
}