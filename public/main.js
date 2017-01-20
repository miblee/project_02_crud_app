// client-side

// CLICK HEADER TO RETURN TO ROOT
$('h1').click(function(evt){
  window.location.href = '/'
})



// ***** ONE DAY BUILD A FUNCTIONAL SEARCH BAR *****
$('#search').click(function(evt){
  $.get('/search')
})


// ***** DELETE TARGETED POSTS *****
$('.delete-button').click(function(evt){
  confirm('Are you sure? Deletes are immediate and irretrievable!', function(response){
    if(response===true){
      $.post('/delete', function(res){
        console.log('res');
      });
    };
  })
})



// EDIT TARGETED POSTS
$(document.body).on('click', '.edit-button', function(evt){
  // evt.preventDefault()
  $(this).attr('class',"barImgs save-button");
  $(this).attr('src', 'floppy.png');

  var $quotebox = $(this).closest('.quotebox');

  $quotebox.find('.source').attr("contenteditable", "true");
  $quotebox.find('.author').attr("contenteditable", "true");
  $quotebox.find('.quoteText').attr("contenteditable", "true");
  $quotebox.css('background-color', 'Aquamarine');
  console.log('editing~')
})


// ***** SEND EDITED CONTENT TO SERVER ******
$(document.body).on('click', '.save-button', function(evt){

  $(this).attr('class',"barImgs edit-button");
  $(this).attr('src', 'edit-button.png');

  var $quotebox = $(this).closest('.quotebox');

  $quotebox.find('.source').attr("contenteditable", "false");
  $quotebox.find('.author').attr("contenteditable", "false");
  $quotebox.find('.quoteText').attr("contenteditable", "false");
  $quotebox.css('background-color', 'pink');

  var $source = $quotebox.find('.source').text();
  var $author = $quotebox.find('.author').text();
  var $quoteText = $quotebox.find('.quoteText').text();
  var $quoteID = $quotebox.find('.edit-button').attr('id');

  var quoteObject = {
    "quoteID":$quoteID,
    "source":$source,
    "author":$author,
    "quote":$quoteText
  };

  console.log(quoteObject);
  $.post('/update', quoteObject, function(data){
    console.log('Update sent!')
  })

});
