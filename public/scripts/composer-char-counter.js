$(document).ready(function() {
  console.log("ready");
  $('.new-tweet textarea').on('input',function() {
    console.log($(this).parent());
    let tweetLength = $(this).val().length;
    $('.counter',$(this).parent()).text( 140 - tweetLength);
    if (tweetLength > 140){
      $('.counter',$(this).parent()).css('color','red')
    } else {
      $('.counter',$(this).parent()).css('color','black')
    }

  });
});