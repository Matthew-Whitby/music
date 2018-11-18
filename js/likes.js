jQuery(function($) {

  $('#timeline').on('click', '.likes', function() {//when likes is clicked
    var link = $(this);//gets the div likes
    if (link.hasClass('active')) return false; //if it has already been liked, exit

    link.addClass('active'); //else mark as liked

    var id = $(this).attr('id'),//gets attribute Id
        postfix = link.find('.likes-postfix').text();//gets text after likes (which is blank)

    $.ajax({ //ajax to check if it has already been liked
      type: 'POST',
      url: likes.ajaxurl,
      data: {
        action: 'likes',
        likes_id: id,
        postfix: postfix,
      },
      xhrFields: {
        withCredentials: true,
      },
      success: function(data) {
        link.html(data).addClass('active').attr('title','You already like this');
      },
    });

    return false;
  });

  if ($('body.ajax-likes').length) {
    $('.likes').each(function() {
      var id = $(this).attr('id');
      $(this).load(likes.ajaxurl, {
        action: 'likes',
        post_id: id,
      });
    });
  }
});
