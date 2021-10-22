$("#reject").click(function(event) {
  if (!confirm('You have chosen to decline the terms of use. Are you sure?'))
    event.preventDefault();
});