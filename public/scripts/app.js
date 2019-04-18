/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {

  function createTweetElement(tweetData){

    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $avatar = $("<img/>").addClass("avatar").attr("src",tweetData.user.avatars.small);
    let $userName = $("<h2>").addClass("username").text(tweetData.user.name);
    let $handle = $("<p>").addClass("handle").text(tweetData.user.handle);
    let $tweetContainer = $("<div>").addClass("body");
    let $tweetText = $("<p>").text(tweetData.content.text);
    let $footer = $("<footer>")
    let $date = $("<p>").addClass("date").text(tweetData.created_at);
    let $iconContainer = $("<div>").addClass("icons");
    let $flag = $("<i>").addClass("fab fa-font-awesome-flag")
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
      $("#tweets-container").append(createTweetElement(element));
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
  const check = $("form textarea").val().length

  if(check === 0 || check === null){
    return alert("No characters enterd into the textarea");
  }
  if(check > 140){
    return alert("Over 140 characters");
  }
  $.post("/tweets", $(this).serialize(), function(data, status){
    alert("Data: " + this.data + "\nStatus: " + status);
    loadTweets();
  }).done(function(){
    $("form textarea").val("")
    $("textarea").trigger("input",[""]).select()
  });
});


$(".compose").click(function() {
  $( ".new-tweet" ).slideToggle()
  $("textarea").focus()
  }
);



});









