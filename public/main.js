// client-side

$('#submit').click(function(evt){
  $.post('/insert', function(res){
    console.log(res)
  });
})
