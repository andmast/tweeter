/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  function timeDiff(time1, time2) {

   const msPerMinute = 60 * 1000;
   const msPerHour = msPerMinute * 60;
   const msPerDay = msPerHour * 24;
   const msPerMonth = msPerDay * 30;
   const msPerYear = msPerDay * 365;

   let diff = time1 - time2;

   if (diff < msPerMinute) {
     return Math.round(diff/1000) + ' seconds ago';
   } else if (diff < msPerHour) {
     return Math.round(diff/msPerMinute) + ' minutes ago';
   } else if (diff < msPerDay ) {
     return Math.round(diff/msPerHour ) + ' hours ago';
   } else if (diff < msPerMonth) {
     return Math.round(diff/msPerDay) + ' days ago';
   } else if (diff < msPerYear) {
     return Math.round(diff/msPerMonth) + ' months ago';
   } else {
     return Math.round(diff/msPerYear ) + ' years ago';
   }
 }


$(document).ready(function() {

  function createTweetElement(tweetData){

    const tweetDate = timeDiff(Date.now(),tweetData.created_at);

    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $avatar = $("<img/>").addClass("avatar").attr("src",tweetData.user.avatars.small);
    let $userName = $("<h2>").addClass("username").text(tweetData.user.name);
    let $handle = $("<p>").addClass("handle").text(tweetData.user.handle);
    let $tweetContainer = $("<div>").addClass("body");
    let $tweetText = $("<p>").text(tweetData.content.text);
    let $footer = $("<footer>")
    let $date = $("<p>").addClass("date").text(tweetDate);
    let $iconContainer = $("<div>").addClass("icons");
    let $flag = $("<i>").addClass("fab fa-font-awesome-flag");
    let $retweet = $("<i>").addClass("fas fa-retweet");
    let $heart = $("<i>").addClass("fas fa-heart");

    $iconContainer.append($flag, $retweet,$heart);
    $footer.append($date, $iconContainer);
    $tweetContainer.append($tweetText);
    $header.append($avatar, $userName, $handle);

    $tweet.append($header,$tweetContainer,$footer);

    return $tweet;
  };

  function renderTweets(tweets){
    tweets.forEach(function(element){
      $("#tweets-container").prepend(createTweetElement(element));
    });

  };

  function loadTweets(){
    $.ajax({
      url: "/tweets",
    })
    .done(function(data){
      const newtweet = data[data.length -1]
      console.log(newtweet);
      $("#tweets-container").prepend(createTweetElement(newtweet));
    });
  }

  $.ajax({
    url: "/tweets",
  })
  .done(function(data){
    renderTweets(data)
  });



 $( "form" ).submit(function( event ) {
  event.preventDefault();
  const check = $("form textarea").val().trim().length

  if(check === 0 || check === null){
    return $(".error").slideDown().text("Nothing said in your tweet");
  }
  if(check > 140){
    return $(".error").slideDown().text("Over 140 characters, woah you have got too much to say");
  }
  $.post("/tweets", $(this).serialize(), function(data, status){
    loadTweets();
  }).done(function(){
    $("form textarea").val("")
    $("textarea").trigger("input",[""]).select()
    $(".error").slideUp()
  });
});


$(".compose").click(function() {
  $( ".new-tweet" ).slideToggle()
  $("textarea").focus()
  }
);



});









