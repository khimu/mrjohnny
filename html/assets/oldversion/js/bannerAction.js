var boxy = null;
var fbId;
var accessToken;
var email;

var earnedSpins = false;
var dataSpinsAmount = 0;

$.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js');


$('#freeappslots button').live('click', function(){
        window.location.href = '/enduser/fas/load.htm';
});


$('.faadClose button').live('click', function(){
        boxy.hide();
});

            function updateUserSession(callback){
                        var callingTimestamp = new Date().getTime();
                        $.ajax({
                                  type: "POST",
                                  url: "/enduser/fas/fb/login.htm?timestamp=" + callingTimestamp,
                                  data: {fbId: fbId, accessToken: accessToken, email: email}
                                }).done(function ( data ) {
                                if(data.result == 'Access Denied'){
                                        window.location.href = '/enduser/fas/load.htm';
                                }else if(accessToken != ''){

      $.ajax({
        type: "POST",
        url: "/enduser/fas/fb/earnspins.json?timestamp=" + callingTimestamp,
        dataType: 'json',
        cache: false,
        data: {action: rewardActionName, timestamp: callingTimestamp}
      }).done(function ( data ) {
        if(data.result == 'Access Denied'){
          window.location.href = '/enduser/fas/load.htm';
        }else{
          // if this is not true then it didn't hit the server because ajax cached the call
          if(data.timestamp != null && data.timestamp > callingTimestamp){
            if(data.spinsAmount == 0){
              $('#newspins-boxy .popUpBody').html(serverDeniedActionMsg);
              boxy= new Boxy('#newspins-boxy', {modal: false});
            }else{
                earnedSpins = true;
                dataSpinsAmount = data.spinsAmount;
		callback();
            }
          }else{
              $('#newspins-boxy .popUpBody').html(actionCachedMsg);
              boxy = new Boxy('#newspins-boxy', {modal: false});
                window.open(actionUrl, '_blank'); 
          }
        }
      });
      }else{
        $('#newspins-boxy .popUpBody').html(loggedOutMsg);
        boxy = new Boxy('#newspins-boxy', {modal: false});
        window.open(actionUrl, '_blank');
      }
      });
    }


$(document).ready(function(){

  function facebookReady(){
    FB.init({
      appId  : '251837781586016',
      status : true,
      cookie : true,
      xfbml  : true
    });

       FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                accessToken = response.authResponse.accessToken;

                FB.api('/me?fields=name,id,email', function(response) {
		  fbId = response.id;
		  email = response.email;
                });
            }else{
                $('#newspins-boxy .popUpBody').html(loggedOutMsg);
                boxy = new Boxy('#newspins-boxy', {modal: false});
                }
         });
  }

  if(window.FB) {
    facebookReady();
  } else {
    window.fbAsyncInit = facebookReady;
  }

});



