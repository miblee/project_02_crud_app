// client-side

$('#submit').click(function(evt){
  $.post('/insert', function(res){
    console.log(res)
  });
})


$('.delete-button').click(function(evt){
  $.post('/delete', function(res){
    console.log(res);
  });
})


$('.edit-button').click(function(evt){
  $(this).attr('class',"barImgs save-button");
  $(this).attr('src', 'floppy.png');
  $(this).closest('.quotebox').find('span').attr("contenteditable", "true")
  $(this).closest('.quotebox').find('.quoteText').attr("contenteditable", "true")
})

