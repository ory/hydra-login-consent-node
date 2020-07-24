$("#submit").on("click", function(e){
    $('#form1').attr('action', "").submit();
});

$("#cancel").on("click", function(e){
    $('#identifier').val('');
    $('#identifier').removeAttr('required');
    $('#form1').attr('action', "https://avanet.avamonitoring.dev").submit();
    $('#form1').attr('method', "GET").submit();
});