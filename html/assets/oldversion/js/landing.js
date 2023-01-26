
$.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js');

$(document).ready(function(){
 
  function facebookReady(){
    FB.init({
      appId  : '259008874473779',
      status : true,
      cookie : true,
      xfbml  : true
    });
  }

  if(window.FB) {
    facebookReady();
  } else {
    window.fbAsyncInit = facebookReady;
  }
  
});

	  $('#fb-auth-landing').live('click', function(){  	  
           FB.login(function(response) { 
              if (response.authResponse) {
                updateUserSession(response.authResponse.userID, response.authResponse.accessToken);
              }
           });
	  });
	  
      function updateUserSession(fbId, accessToken){
        $.ajax({
           type: "POST",
           url: ctx + "/fas/fb/login.htm",
           data: {fbId: fbId, accessToken: accessToken}
        }).done(function ( data ) {
          // do nothing
          window.location = ctx + '/fas/load.htm';
        });
      }

