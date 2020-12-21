$("#accept").click(function(event) {
  var array = []; 
  $("input:checkbox[name=grant_scope]:checked").each(function() { 
    array.push($(this).val()); 
  }); 
  if (array.length == 0 && !confirm('You have chosen to deny AvaNet access to your data! Are you sure?'))
    event.preventDefault();
});
$("#reject").click(function(event) {
  if (!confirm('You have chosen to deny AvaNet access to your data! Are you sure?'))
    event.preventDefault();
});