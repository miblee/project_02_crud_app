// client-side

// CLICK HEADER TO RETURN TO ROOT
$('h1').click(function(evt){
  window.location.href = '/'
})



// ***** ONE DAY BUILD A FUNCTIONAL SEARCH BAR *****
$('#search').click(function(evt){
  $.get('/search')
})


// INSERT A NEW POST TO PAGE
$('#submit').click(function(evt){
  $.post('/insert')/*, function(res){
    console.log(res)
  });*/
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
$('.edit-button').click(function(evt){
  evt.preventDefault()
  $(this).attr('class',"barImgs save-button");
  $(this).attr('src', 'floppy.png');

  var $quotebox = $(this).closest('.quotebox');

  $quotebox.find('.author').attr("contenteditable", "true");
  $quotebox.find('.source').attr("contenteditable", "true");
  $quotebox.find('.quoteText').attr("contenteditable", "true");
  $quotebox.css('background-color', 'Aquamarine');
  console.log('editing~')
})

// ***** SEND EDITED CONTENT TO SERVER ******
$('.save-button').click(function(evt){
  console.log('testst')
  console.log($(this))
  // $(this).attr('class',"barImgs edit-button");
  // $(this).attr('src', 'edit-button.png');
  var $quotebox = $(this).closest('.quotebox');
  console.log('ANYTHING YET?')
  // $quotebox.find('.author').attr("contenteditable", "false");
  // $quotebox.find('.source').attr("contenteditable", "false");
  // $quotebox.find('.quoteText').attr("contenteditable", "false");
  // $quotebox.css('background-color', 'pink');
  // $.post('/update', function(res){
    // console.log($quotebox.find('.author').text());
    // console.log($quotebox.find('.source').value());
    // console.log($quotebox.find('.quoteText').value());
  // })
})
