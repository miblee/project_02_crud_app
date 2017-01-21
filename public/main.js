// client-side

// CLICK HEADER TO RETURN TO ROOT
$('h1').click(function(evt){
  window.location.href = '/'
})



// ***** ONE DAY BUILD A FUNCTIONAL SEARCH BUTTON *****
$('#search').click(function(evt){
  $.get('/search')
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
})


// ********* (U)PDATE ********* //
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
  $.post('/update', quoteObject)
});

// PLACE THIS SOMEWHERE TO INCLUDE CLIENT SIDE RENDERING
// $.get('/somewhere', function(res){
//     var template = $('#hbs').html();
//     var templateScript = Handlebars.compile(template);
//     var context = response;
//     var html = templateScript(context);


    // $('#FIND SOMEPLAE TO APPENDTHIS').html(html);
// })

//********* (D)ELETE ********* //
$('.delete-button').click(function(evt){
  var $quotebox = $(this).closest('.quotebox');
  var quoteID = {"quoteID": $quotebox.find('.edit-button').attr('id')}

  if (confirm('Are you sure? Deletes are immediate and irretrievable!')){
    $.post('/delete', quoteID, function(res){
      window.location.href = '/';
    });
  };
})
