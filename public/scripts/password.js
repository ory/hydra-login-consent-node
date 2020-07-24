$(document).ready(function () {
    $('.pass_show').append('<span class="ptxt">Show</span>');
   
    PasswordValidator.minSize = 8;
    PasswordValidator.maxSize = 16; 
    PasswordValidator.setup('password1','verify1');
});

$(document).on('click','.pass_show .ptxt', function() { 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    
    $(this).prev().attr('type', function(index, attr) {
        return attr == 'password' ? 'text' : 'password'; 
    }); 
});

$(document).on('submit', 'form', function(e) {
    // Check password field
    if (!PasswordValidator.checkPassword($('#password1')[0], 1)) {
      e.preventDefault(e);
      $('#password1').focus();
      return false;
    }
    // Check verify field
    if (!PasswordValidator.checkVerify($('#verify1')[0], 'password1')) {
      e.preventDefault(e);
      $('#verify1').focus();
      return false;
    }
});