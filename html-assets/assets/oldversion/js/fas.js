var fbId;
var accessToken;
var userEmail;
var amazonBoxy = null;
var amazonInsufficientCreditsBoxy = null;
var amazonConfirmBoxy = null;
var amazonPurchaseSuccessfulBoxy = null;
var referralCodeBoxy = null;
var totalConsecutiveSpins = 0;
var referralCodeMsgFrequency = 5;

var myAccountBoxy = null;
var helpBoxy = null;
var termsBoxy = null;
var privacyBoxy = null;

var outOfCreditBoxy = null;
var confirmPurchaseBoxy = null;

var newSpinsCountBoxy = null;
var returningUserBoxy = null;

var bigWinnerBoxy = null;

var isSpinPage = true;

  var shouldPlay = false;
  var startAt = 20;
  var stopAt = 32;
  var animationStart = 2;
  var animationLength = 8;
  var soundEnd = 42;
  var stillSpinning = false;
  
  var soundBoxy = null;
  var userSelectPlaySound = false;

  var d = new Date();
  var todaycache = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();



$.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js');

$('.playnowBtn img').live('click', function(){
  window.location = ctx + '/fas/load.htm';
});         

$('#prize-btn').live('click', function(){
  window.location = ctx + '/fas/store/list.htm?start=0&limit=10';
});

$('.faadClose button').live('click', function(){
			if(outOfSpinBoxy != null && outOfSpinBoxy.isVisible()){ outOfSpinBoxy.hide(); }
			if(storeBoxy != null && storeBoxy.isVisible()){ storeBoxy.hide(); }
			if(redeemBoxy != null && redeemBoxy.isVisible()){ redeemBoxy.hide(); }
			if(spinBoxy != null && spinBoxy.isVisible()){ spinBoxy.hide(); }
			 
			if(myAccountBoxy != null && myAccountBoxy.isVisible()){ myAccountBoxy.hide(); }
			if(helpBoxy != null && helpBoxy.isVisible()){ helpBoxy.hide(); }
			if(termsBoxy != null && termsBoxy.isVisible()){ termsBoxy.hide(); }
			if(privacyBoxy != null && privacyBoxy.isVisible()){ privacyBoxy.hide(); }    
			
              if(outOfCreditBoxy != null && outOfCreditBoxy.isVisible()){ outOfCreditBoxy.hide(); }    
              if(confirmPurchaseBoxy != null && confirmPurchaseBoxy.isVisible()){ confirmPurchaseBoxy.hide(); }   
              if(newSpinsCountBoxy != null && newSpinsCountBoxy.isVisible()){ newSpinsCountBoxy.hide(); }    
              if(bigWinnerBoxy != null && bigWinnerBoxy.isVisible()){ bigWinnerBoxy.hide(); } 
              if(returningUserBoxy != null && returningUserBoxy.isVisible()){ returningUserBoxy.hide(); }    
              if(referralCodeBoxy != null && referralCodeBoxy.isVisible()){ referralCodeBoxy.hide(); }    
});




$('#newspins-boxy .faadClose button').live('click', function(){
              if(newSpinsCountBoxy != null ){ newSpinsCountBoxy.hide(); }
});

        $('#yes-play').live('click', function(){
                soundBoxy.hide();
                //userSelectPlaySound = true;
                
               /*
                * This will tell the doLoadAnimation that the music is playing and
                * that the user has click the spin button and therefore doLoadAnimation 
                * can seek the sound and play the sound 
                */
               shouldPlay = true;
               
               snd.play();
               
               setTimeout(function(){ snd.currentTime = animationStart; }, 50);
        
               snd.addEventListener("timeupdate", function() {
                  if(parseInt(snd.currentTime) == animationLength){
                    pauseSnd();
                  }
                  //$('.winners_alt_h1').html(snd.currentTime);
              }, false);
              
               snd.addEventListener("timeupdate", function() {
                  if((parseInt(snd.currentTime)) == stopAt){     
                    endSnd(snd);
                  }       
              }, false);      
                
        });
        
        $('#no-play').live('click', function(){
          soundBoxy.hide();
        });


$('#get-more-spins').live('click', function(){
  window.location = ctx + '/fas/getspins.htm';
});



        $('#helpButton').click(function(){
            helpBoxy = new Boxy('#help-wrapper', {closeable: true, modal: true});
        });
 
        $('#terms').click(function(){
            termsBoxy = new Boxy('#terms-wrapper', {closeable: true, modal: true});
        });


        $('#privacy').click(function(){
            privacyBoxy = new Boxy('#privacy-wrapper', {closeable: true, modal: true});
        });

/*
        $('#help-wrapper').click(function(){
          helpBoxy.hide();
        });
*/        
        
        $('#terms-wrapper').click(function(){
          termsBoxy.hide();
        });
        
        $('#privacy-wrapper').click(function(){
          privacyBoxy.hide();
        });  

// elsewhere in the code

// $(document).live("facebook:ready", function(){      
        
        /*
         * Setting google adsense instead
         * 
         	populateAdvertisement();
         	setInterval( function() { populateAdvertisement(); },10550);
         *
         */


        // update the year
	$('.footer').html($('.footer').html().replace('2012', d.getFullYear())); 

	//updateUserSession(fbId, accessToken, userEmail);

         //window.setTimeout(function() { showBigWinner(); }, 1000);
            
         window.setTimeout(function() { showReturningUserMessage(); }, 500);
        
         //setInterval( function() { changeDivs(); },1000);


          //setInterval( function() { changeDivs(); },1000);
         
         $.ajaxSetup({ cache:false });
         
        $(".boxy").click(function() { 
			if(outOfSpinBoxy != null && outOfSpinBoxy.isVisible()){ outOfSpinBoxy.hide(); }
			if(storeBoxy != null && storeBoxy.isVisible()){ storeBoxy.hide(); }
			if(redeemBoxy != null && redeemBoxy.isVisible()){ redeemBoxy.hide(); }
			if(spinBoxy != null && spinBoxy.isVisible()){ spinBoxy.hide(); }
			 
			//if(myAccountBoxy != null && myAccountBoxy.isVisible()){ myAccountBoxy.hide(); }
			if(helpBoxy != null && helpBoxy.isVisible()){ helpBoxy.hide(); }
			if(termsBoxy != null && termsBoxy.isVisible()){ termsBoxy.hide(); }
			if(privacyBoxy != null && privacyBoxy.isVisible()){ privacyBoxy.hide(); }     
            if(outOfCreditBoxy != null && outOfCreditBoxy.isVisible()){ outOfCreditBoxy.hide(); }    
            if(confirmPurchaseBoxy != null && confirmPurchaseBoxy.isVisible()){ confirmPurchaseBoxy.hide(); }   
            if(newSpinsCountBoxy != null && newSpinsCountBoxy.isVisible()){ newSpinsCountBoxy.hide(); }   
            if(bigWinnerBoxy != null && bigWinnerBoxy.isVisible()){ bigWinnerBoxy.hide(); }    
            if(returningUserBoxy != null && returningUserBoxy.isVisible()){ returningUserBoxy.hide(); }    
            if(referralCodeBoxy != null && referralCodeBoxy.isVisible()){ referralCodeBoxy.hide(); }   
        });
                

        $('#helpButton').click(function(){
            helpBoxy = new Boxy('#help-wrapper', {closeable: true, modal: true});
        });
 
        $('#terms').click(function(){
            termsBoxy = new Boxy('#terms-wrapper', {closeable: true, modal: true});
        });


        $('#privacy').click(function(){
            privacyBoxy = new Boxy('#privacy-wrapper', {closeable: true, modal: true});
        });

        $('#help-wrapper').click(function(){
          helpBoxy.hide();
        });
        
        $('#terms-wrapper').click(function(){
          termsBoxy.hide();
        });
        
        $('#privacy-wrapper').click(function(){
          privacyBoxy.hide();
        });        
       
                  $('#my-account').click(function(){ 
                      myAccountBoxy = new Boxy('#boxy-my-account', {modal: true});
                  });

                  $('#fb-like').click(function(){ 
                            myAccountBoxy.hide();
                            FB.login(function(response) {
                                if (response.authResponse) {
                                    accessToken = response.authResponse.accessToken; 
                                    userId = response.authResponse.userID;
                                    FB.api('/me?fields=name,id,email', function(response) {
																				//alert('called from fb like');
                                        updateUserSession(response.id, accessToken,response.email);
                                        fbId = response.id;
																				userEmail = response.email;
                                        fbLike();
                                    });    
                                } else {
                                    //user cancelled login or did not grant authorization
                                }
                            }, {scope:'publish_stream,user_about_me,email,user_likes,publish_actions'});    
                  
                            // FB.ui({method: "permissions.request", "perms": 'publish_stream,user_about_me,email'} , function(response) { fbLike(); }) 
                  });
                  
/*                  
         if(isSpinPage){
            if $('body').hasClass('script') {
                $.getScript(staticUrl + 'js/jquery-idleTimeout.js'), function() {
                        //alert('after loading script');
                        var redirectUrl = ctx + '/fas/load.htm';
            
                        // $(document).idleTimeout({ alive_url: '', redirect_url: redirectUrl, logout_url: '', inactivity: 300, noconfirm: 100, sessionAlive: 100 }); 
                        $(document).idleTimeout({ inactivity: 300, noconfirm: 100, sessionAlive: 100 }); 
                        
                        //alert('after idleTimeout');
                });
            }else{
            }
         }
*/
         
// }); // end of document.live('facebook:ready')

function showReturningUserMessage(){
  //bigWinnerBoxy.hide();
  //outOfSpinBoxy.hide();
  /*
  alert(returninguser);
  if(returninguser == '1' && getFasCookie('returning-user-cookie') === undefined){
    alert("you are a returning user you have not spin yet");
    returningUserBoxy = new Boxy('#boxy-return-user');
    setFasCookie('returning-user-cookie');
  }else if(getFasCookie('returning-user-cookie') === undefined){
    alert("you are not a returning user or you were already rewarded and started playing");
    //$('#returning-user-cookie .popupMsg p:fist').html('Come back tomorrow for 2 more spins.');
    returningUserBoxy = new Boxy('#boxy-return-user');
    setFasCookie('returning-user-cookie');
  }
  */

  if(getFasCookie('returning-user-cookie' + todaycache) === undefined){
    returningUserBoxy = new Boxy('#boxy-return-user');
    setFasCookie('returning-user-cookie' + todaycache);
  }
}

/*
function checkAndRemoveLikeUsOnFB(){
	            FB.api({ method: 'pages.isFan', page_id: '314604131980943'}, function(resp) {
     	            alert('returned from fb');
	                if (resp == true) {
     	                alert('already liked');
	                	if($('#fb-like').length != 0){
	                		$('#fb-like').remove();
	                	}
	                } else if(resp.error_code) {
	                  Log.error(resp.error_msg);
	                } else {
	                  Log.error("user_id doesn't like the Application.");
	                }
	            });	
}
*/

function showBigWinner(){
    if(winnerItemName && getFasCookie('bigwinner_cookie') === undefined){
        setFasCookie('bigwinner_cookie');        
        bigWinnerBoxy = new Boxy('#boxy-big-winner', {modal: true});    
    }         
}

function setFasCookie(name)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 365);
	document.cookie = name + "=1";
}

function getFasCookie(name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i = 0;i<ARRcookies.length;i++)
	{
	  x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
	  y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	  x = x.replace(/^\s+|\s+$/g, "");
	  if (x == name)
	  {
	    return unescape(y);
	  }
	 }
}

$(document).ready(function(){

  function facebookReady(){

    FB.init({
      appId  : appId,
      status : true,
      cookie : true,
      xfbml  : true
    });


       FB.getLoginStatus(function(response) {
            //alert('getLoginStatus');
            // need to update user session for both logged in and out
   	        updateButton(response);
   	        
           if (response.status != 'connected') {
             //alert('facebook not logged in');
             $('#logged-out').show();
             $('#logged-in').hide();	 
               
              //updateUserSession("", response.authResponse.accessToken);  // causes error and rest of javascript will fail           
              //alert('facebook not logged in, clear fb data in session');

              updateUserSession('', '','');
             logout();
           }else{           
						//alert('facebook logged in ' + response.authResponse.userID);
				 accessToken = response.authResponse.accessToken;
                                 FB.api('/me?fields=name,id,email', function(response) {
                                        //alert('called from getLoginStatus');
                                        fbId = response.id;
                                        userEmail = response.email;
                                        updateUserSession(response.id, accessToken,response.email);
					//alert('user email ' + userEmail);
        				$(document).trigger("facebook:ready");
                                 });
                populateWinnersCircle();
             $('#logged-in').show();
             $('#logged-out').hide();	       
           }
          


         });

        
  } // end facebookReady();

  if(window.FB) {
    facebookReady();
  } else {
    window.fbAsyncInit = facebookReady;
  }

  // working with no ajax call disable spinWheel() and use full link before uncommenting this.  bug with back button
  $.getScript(staticUrl + 'app/freeappslots06_hype_generated_script.js?15049');
  
}); // end document().ready


  function pauseSnd(){
      //alert('seeking to sound');
      snd.currentTime = startAt;
      if(snd.paused){
        //$('.winners_alt_h1').html(snd.currentTime);
        snd.play();
      }              
  }

  /*
   * Bug in end sound not always getting called
   */
  function endSnd(snd){
    snd.currentTime = soundEnd; 
    controlFrequencyOfSpin();
    //alert('sound end at ' + snd.currentTime);
    //$('.winners_alt_h1').html('END ' + snd.currentTime);
  }
  
  function firstPlaySnd(){
    snd.play(); 
  }
  
  function thenSpinWheel(){     
        // maybe i need to make the beginning longer  
        //window.setTimeout(function() { snd.currentTime = 3; }, 100);        
       /*
        * The order of spinWheel() and snd.play() can cause the animation to not play
        */        
        window.setTimeout(spinWheel(), 100);         
  }
    
  function playSound(){
       //alert('adding listener');
       
       /*
        * This will tell the doLoadAnimation that the music is playing and
        * that the user has click the spin button and therefore doLoadAnimation 
        * can seek the sound and play the sound 
        */
       shouldPlay = true;

      /*
       * This when/then clause does nothing.  it does not execute
       * one then the other as it indicates.  Code still depends on
       * adding a delay using setTimout
       */
       $.when(firstPlaySnd()).then(thenSpinWheel());

       snd.addEventListener("timeupdate", function() {
          if(parseInt(snd.currentTime) == animationLength){
            pauseSnd();
          }
          //$('.winners_alt_h1').html(snd.currentTime);
      }, false);
      
       snd.addEventListener("timeupdate", function() {
          if((parseInt(snd.currentTime)) == stopAt){     
            endSnd(snd);
          }       
      }, false);      
      
      
  }

        function populateAdvertisement(){
              //alert('making ajax call');
                       		$.ajax({
          				  type: "GET",
          				  url: ctx + "/fas/redeem/getads.json",
          				  dataType: 'json'
          				}).done(function ( data ) {	
          				//alert(data);
          				//alert(data.spins);
                    				$('#ad-url').val(data.link);
     							$('.ad_unit_5').html(data.spins);
     							$('#ad-img').attr('src', staticUrl + data.icon);
          				});
        }
        
        $('#ad-img').live('click', function(){
          //alert('going to ' + $('#ad-url').val());
          window.open($('#ad-url').val());
        });

  	    function populateWinnersCircle(){		        
  	        FB.api("/me/friends?fields=name,id", handleFriends);
  	    }


		function handleFriends(response) {
		  //alert('handleFriends');
	        var friends = response.data;
	        //alert(friends);
	        var friendsList = "";
	        
	        var friendsIdNameMap = {};

	        for (var i = 0; i < friends.length; i++) {
							if(typeof friends[i].name === "undefined"){
                             	        friendsIdNameMap[friends[i].id] = 'Private';
                         	            friendsList += friends[i].id + ",";                                    
							}else{
	                                 var names = friends[i].name.split(' ', 2);
	                                 if(names.length > 1){
           						     var name = names[0] + " " + names[1].substring(0, 1);
                             	        friendsIdNameMap[friends[i].id] = name;
                         	            friendsList += friends[i].id + ",";
                         	            }else{
                             	        friendsIdNameMap[friends[i].id] = friends[i].name;
                         	             friendsList += friends[i].id + ",";   
                         	            }
							}          		

	        }

			$.ajax({
				  type: "POST",
				  url: ctx + "/fas/fb/friends.htm",
				  dataType: 'json',
				  data: {friendsList: friendsList}
				}).done(function ( data ) {	
      				if(data.result == 'Access Denied' || data == null || data == '' || data.result == 'Empty'){
               			logout();
      				}else{
          			
          			
          			if(data.length != 0){
               			$('#dynamic-winners-circle').html('');
       					for(var i = 0; i < data.length; i ++){
					     //alert(data.length);
                                var itemstring = "<div id=\"dropmsg{INDEX}\" class=\"dropcontent, winners_dynnamic\"><div class=\"winnersFBpic\"><p style=\"display:block;\">{NAME}</p><img src=\"{IMAGE}\" alt=\"{ALT}\" title=\"{TITLE}\" width=\"39\" height=\"39\" /><p style=\"display:block\">{CAPTION}</p></div><div class=\"prizeIcon\"><img src=\"" + staticUrl + data[i].icon + "\" width=\"40\" height=\"40\" /></div></div>";

      						var itemName = data[i].name;
						
      						itemstring = itemstring.replace("{CAPTION}", "Won!");
      						itemstring = itemstring.replace("{IMAGE}", "https://graph.facebook.com/" + data[i].fbId + "/picture");
      						itemstring = itemstring.replace("{INDEX}", i);
						
      						var name = friendsIdNameMap[data[i].fbId];
						
						//alert(name);
						
                             	itemstring = itemstring.replace("{TITLE}", "Won!");
							itemstring = itemstring.replace("{ALT}", "Won!");
							itemstring = itemstring.replace("{NAME}", name);
							
							$('#dynamic-winners-circle').append(itemstring);
     	    			       }
     	    			       animateWinnersCircle();
      	    			    }
    	    			    }
				});
	    }



 			function checkSpins(){
 			     //alert(spinCount);

 			     //alert(jQuery.type(outofspin) === "boolean"));
 			     
 				/*
 				 * Disable out of spin dialog box.  Allow for infinite playing
 				 */
 				/*
				if(spinCount == 0 && outofspin){
					outOfSpinBoxy = new Boxy('#boxy-out-of-spins', { modal: true});
     	              //window.setTimeout( function() { outOfSpinBoxy.hide(); window.location = ctx + "/fas/getspins.htm"; },10000);
	                $('.faadClose button').click(function() {
	                	window.location = ctx + "/fas/load.htm";
	                });
				}       
				*/			
			}
			
            function disp_confirm(msg)
            {
            var r=confirm(msg);
            if (r==true)
              {
              	return true;
              }
            else
              {
              	return false;
              }
            }


	          function changeDivs() {
           	      if( $('#bkg').attr('class') == 'state1' ){
               	      $('#bkg').attr('class', 'state2');
               	 }else if( $('#bkg').attr('class') == 'state2' ) {
               	      $('#bkg').attr('class', 'state3');
                    }else if( $('#bkg').attr('class') == 'state3' ) {
               	      $('#bkg').attr('class', 'state4');
           	      }else if( $('#bkg').attr('class') == 'state4' ) {
               	      $('#bkg').attr('class', 'state5');
           	      }else if( $('#bkg').attr('class') == 'state5' ) {
               	      $('#bkg').attr('class', 'state1');
           	      }               	      
	          }

	          
	          
			  function updateButton(response) {
			    //alert('updateButton');
			    var button = document.getElementById('fb-auth');
			        
			    if (response.authResponse) {
			      //alert('already logged in');
			      $('#logged-in').show();
			      $('#logged-out').hide();

			      FB.api('/me?fields=name,id', function(response) {
                      fbId = response.id;
                      //alert(fbId);
    			    	  $('.profileFBpic img').attr('src', 'https://graph.facebook.com/' + response.id + '/picture');
			    	  $('#fbname').html(response.name);
			    	  $('#fbname-title').html(response.name);
			      });

			      button.onclick = function() {
			         $('#logged-out').show();
			         $('#logged-in').hide();			      
			        FB.logout(function(response) {
			         $('.profileFBpic img').attr('src', staticUrl + 'images/fb_login.png');
			        	$('#fbname').html('Login Here');
			        	$('#fbname-title').html('Please Login');
			    });

			      };
			    } else {			    
			      button.onclick = function() {     
     			      // window.setTimeout(function() { window.location.href = ctx + "/fas/load.htm"; }, 6000); 
     			      FB.login(function(response) {
     			    	 var aToken = response.authResponse.accessToken;
                        if (response.authResponse) {
      			            FB.api('/me', function(response) {
      			            	fbId = response.id;
      			            	//window.location.href = ctx + "/fas/load.htm";
             			        // NOTE: not every page has the html below and therefore we cannot support code below.  To allow this code to listen
             			        // to click on 'fb-auth' from any page, we must handle this even generically which is to redirect to the load page
             			        
           			        $('#logged-in').show();
             			        $('#logged-out').hide();                			        
      			            	//alert('logged in' + $('.profileFBpic img').attr('src'));
      			           $('.profileFBpic img').attr('src', 'https://graph.facebook.com/' + response.id + '/picture');
      			           $('#fbname').html(response.name);
      			           $('#fbname-title').html(response.name);

      			         updateUserSession(response.id, aToken, response.email);
      			        });    
			          } else {
			            //user cancelled login or did not grant authorization
			          }
			        }, {scope:'email', perms:'publish_stream'});    			      }
			    }
			  }

	    function updateUserSession(fbId, accessToken,email){

	    	if (email == undefined || email == null){
	    		FB.api('/me', function(response) {
                    email = response.email;
			$.ajax({
				  type: "POST",
				  url: ctx + "/fas/fb/login.htm",
				  data: {fbId: fbId, accessToken: accessToken, email: userEmail}
				}).done(function ( data ) {	
				});
	    		});
	    	}
	    	else{
	    		$.ajax({
					  type: "POST",
					  url: ctx + "/fas/fb/login.htm",
					  data: {fbId: fbId, accessToken: accessToken, email: email}
					}).done(function ( data ) {	
					});
	    	}
	    }

	    function logout(){
	         //alert('logout');
     	    url = ctx + "/fas/fb/global.htm";
			$.ajax({
				  type: "GET",
				  url: url,
				  dataType: 'json'
				}).done(function ( data ) {		
				  if(data.result != 'Empty' && data.length != 0){
				  
        				$('#dynamic-winners-circle').html('');
					var returnedCallsCounter = 0;
					var len = data.length;
        				
					for(var i = 0; i < data.length; i ++){
					    
        				(function() {
          				var itemName = data[i].name;
						
						var index = i;
						var image = "https://graph.facebook.com/" + data[i].fbId + "/picture";
						var icon = data[i].icon;
						
						FB.api('/' + data[i].fbId, function(response) {
						     //alert('index ' + index);
						     var itemstring = "<div id=\"dropmsg{INDEX}\" class=\"dropcontent, winners_dynnamic\"><div class=\"winnersFBpic\"><p style=\"display:block;\">{NAME}</p><img src=\"{IMAGE}\" alt=\"{ALT}\" title=\"{TITLE}\" width=\"39\" height=\"39\" /><p style=\"display:block\">{CAPTION}</p></div><div class=\"prizeIcon\"><img src=\"" + staticUrl + icon + "\" width=\"40\" height=\"40\" /></div></div>";
						     //alert(itemName);

      	     				itemstring = itemstring.replace("{CAPTION}", "Won!");
      						itemstring = itemstring.replace("{IMAGE}", image);
      						itemstring = itemstring.replace("{INDEX}", index);

							itemstring = itemstring.replace("{TITLE}", "Won!");
							itemstring = itemstring.replace("{ALT}", "Won!");

							if(typeof response.name === "undefined"){
							    //alert('response.name ' + response.name);
                                    itemstring = itemstring.replace("{NAME}", "Private");
							}else{
	                                 var names = response.name.split(' ', 2);
     						     var name = names[0] + " " + names[1].substring(0, 1);
     							itemstring = itemstring.replace("{NAME}", name);
							}

							//alert(itemstring);
							$('#dynamic-winners-circle').append(itemstring);

							returnedCallsCounter++;

							if(returnedCallsCounter == len) {
								//alert("len " + len);
								animateWinnersCircle();
							}
						
					      });	  				
					})(); // end anonymous inner function
        	    		   } // end for loop
        	    	   } // end if check
			}); // end ajax call	    	
	    }

	    function animateWinnersCircle(){
	    //alert('animateWinnersCircle');
           	    startscroller();
	    }

        function contractall(){
          var inc=0;
          while (document.getElementById("dropmsg"+inc)){
            document.getElementById("dropmsg"+inc).style.display="none";
            //alert('hiding ' + inc);
            inc++;
          }
        }
        
        
        function expandone(){
          //alert('expandone');
          var selectedDivObj=document.getElementById("dropmsg"+selectedDiv);
          contractall();
          selectedDivObj.style.display="block";
          //alert(selectedDivObj.html());
          selectedDiv=(selectedDiv<totalDivs-1)? selectedDiv+1 : 0;
          setTimeout("expandone()",tickspeed);
        }
        
        function startscroller(){
          //alert('calling startscroller ');
          while (document.getElementById("dropmsg"+totalDivs)!=null){
            totalDivs++;
          }
          expandone();
        }

        function spinWheel() {
              //alert('calling spin wheel');

    			disableButtonOnSpin();
               window.HYPE_108_DocumentsToLoad.pop();

              
                return $.ajax({
                  url: spinUrl,
                  cache: false,
                  type: 'POST',
                  dataType: 'json',
                  data: {start1: stop1, start2: stop2, start3: stop3},
                  beforeSend: disableSpin
                })
                .always(function() {
                  //$("#help-a").trigger("hover");
                  
                  //alert('do always');
                  // remove loading image maybe
                }).done(function(data){
                    if(data.result == 'Illegal Action'){
                      // show what the value will be after the ajax call below
                      $('.winners_alt_h1').html(Math.round(Number(spinCount)) + ' spins left'); 
                    }else{
                      $('.winners_alt_h1').html(Math.round(Number(spinCount - 1)) + ' spins left'); 
                      $.when(extractSpinData(data)).then(nowSpinAnimation());
                    }                
                })
                .fail(function() {
                  alert('Spin wheel request failed.  Must be a network issue.');
                  // handle request failures
                });
            }		
            
            function nowSpinAnimation(){
   					     //alert('calling second function');   
							// no longer part of the popup page
							//$('#won').html(creditsWon);
							//$('#credits').html(credits);
							
     							$('.reels_section').html('<div id="freeappslots06_hype_container" style="position:relative; float:left; overflow:hidden; width:544px; height:256px; display:inline-block; z-index:999; left:27px;"><div class="divider-line"></div><div class="shadow-top"></div><div class="shadow-bottom"></div></div>'); //.delay(300);
							
     							$.getScript(staticUrl + 'app/freeappslots06_hype_generated_script.js?15049');
            }
            
            function extractSpinData(data){
      // data is not getting set before animation starts playing so next animation always gets previous animations data
      		currenttime = data.timestamp;
      
      		if(previoustimestamp >= currenttime){
          		window.location = ctx + '/fas/reload.htm?start1=' + stop1 + '&start2=' + stop2 + '&start3=' + stop3;
      		}else{
          		previoustimestamp = currenttime;
      		}
				
			 sprite1 = data.sprite1	
			 sprite2 = data.sprite2;
			 sprite3 = data.sprite3;

			start1 = data.start1;
			start2 = data.start2;
			start3 = data.start3;
			
			stop1 = data.win1;
			stop2 = data.win2;
			stop3 = data.win3;		
			
			spinCount = data.spins;
			//alert('ajax call spinCount ' + spinCount);

			spinDeviceId = data.deviceId;
			
			//alert('spinDeviceId ' + spinDeviceId);
			
			instantWinner = data.instantwinner;
			loser = data.loser;

			creditsWon = data.creditsWon;
			credits = data.credits;	
			
			//alert('ajax call credits ' + credits);
			
			redeems = data.redeems;   
			
			outofspin = data.outofspin;
			
			if(instantWinner == 1){
     			if(creditsWon == 1000000 || creditsWon == 500000){
           			startAt = 19;
           			stopAt = 23;     			
     			} else {
     			     startAt = 13;
           			stopAt = 16;   
     			}
			}else if(creditsWon > 0){
     			if(creditsWon == 750){
              		startAt = 38;
           			stopAt = 41;     
     			}else if(creditsWon >= 450){
              		startAt = 26;
           			stopAt = 29;      			
     			} else {
           			startAt = 32;
           			stopAt = 35;   
     			}		
			}else{
     			// no win
       			startAt = 32;
       			stopAt = 35;     			
			}
			

               winnerItemName = data.winnerItemName;
               winnerFacebookId = data.winnerFacebookId;
               			
              // check for ipod/itouch winner and display a popup    
			//showBigWinner();

              return true;         
            }
 
          function doLoadAnimation(){
			//alert('doLoadAnimation');
			totalConsecutiveSpins ++;
			stillSpinning = true;
			if(shouldPlay){		
                snd.currentTime = animationStart;
                /*
                 * Occassionally the sound does not play as expected so we force
                 * play at start of animation
                 */
                if(snd.paused){
                  snd.play();
                }
              }			
    		}
    
    		function doComplete(){	
        		//alert('instantWinner ' + instantWinner);
    			if(instantWinner == 1){
    			     //alert('opening spinBoxy ' + creditsWon);
    			     //alert('instant win link : ' + $('#instant-win-link').html());
    				spinBoxy = new Boxy('#boxy-display', {modal: true});			
    				//$('.winners_alt_h1').html('INSTANT WIN!!');
    				//$('.winners_alt_h1').html('You won ' + Math.round(Number(creditsWon)));

                  $('#bkg').attr('class', 'state6');
                  $('.winners_alt_h1').css('color', '#000');
              
                  setTimeout(function(){ $('.winners_alt_h1').css('color', 'gold');  }, 3000);
                  setTimeout(function(){ $('#bkg').attr('class', 'state1');  }, 3000);    
              
    				// updateOnComplete();
    			}else{

       			//animateCoins();
    			}

    			     if(creditsWon != 0){
           			$('.winners_alt_h1').html('You won ' + Math.round(Number(creditsWon)));
           			$('#boxy-display .popupMsg .faadTitle').html('You Won ' + Math.round(Number(creditsWon)) + ' Credits!');
       			}
       			
       			setTimeout(function(){ $('.winners_alt_h1').html(Math.round(Number(spinCount)) + ' spins left');  }, 3000);
       			

			animateCoins();
    			
          }	
    		
    		function updateOnComplete(){
    		     //alert('updateOnComplete');
    		     
    		     enableButtonAfterSpin();
    		     
    		     //alert('updating credits: ' + Math.round(Number(credits)));
    			$('#credits-value').html(Math.round(Number(credits)));
    			$('#spins-value').html(Math.round(Number(spinCount)));
 
              stillSpinning = false;

              /*
               * First time on page load, music does not play and therefore spin button
               * must be enabled from here and not from the end of sound event
               */
      		if(shouldPlay == false){	
          		//alert('enabling spin');
      		     controlFrequencyOfSpin();
          	}     
          	
          	//alert("totalConsecutiveSpins so far " + totalConsecutiveSpins);
          	
          	if((totalConsecutiveSpins % referralCodeMsgFrequency) == 0){
                referralCodeBoxy = new Boxy('#referral-code-msg-boxy');
           	}
        }
                
        /*
         * This is called from multiple events
         * In case the end of sound event does not get invoked
         * a time interval will also check every 10 seconds if 
         * the spin button needs to be enabled.
         */                
        function controlFrequencyOfSpin(){
              if(stillSpinning == true){
                //alert('still spinning');
                return;
              }

              /*
               * Always enabling spins
               */
              enableSpin();
              
              

              /*
               * disabling this feature.  Making this app free and available for usage without
               * having to take actions like facebook like, post, etc
               */
              /*
              if(spinCount > 0 || outofspin == 'false'){
    				enableSpin();
    			}else{
     			//window.location.href = ctx + '/fas/getspins.htm';
    			     checkSpins();
    				disableSpin();
    			}  
    			*/              
        }
    		
        function animateCoins(){
        			$('#animate1').show();
        			
                  $("#animate1").animate({
                      position: "absolute",
                      top: "5px",
                      left: "375px"
                    }, 1000, function() {
                  });   
          
                  $(".img-animate").animate({
                      position: "absolute",
                      width: "250px",
                      height: "250px",
                      zIndex: "99999"
                  }, 1000, function() {   
                    $(".img-animate").animate({
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        zIndex: "99999"
                    }, 1000, function() {        
                        $('#animate1').hide();
                       
                        $('.img-animate').css('width', '100px');
                        $('.img-animate').css('height', '100px');
                        
                        $( "#animate1" ).css( "left", "200px" );
                        $( "#animate1" ).css( "top", "200px" );
                        
                        updateOnComplete();
                      });   
                    });   
        }		

              function disableButtonOnSpin(){
                  $('#gotoGetspins').prop('disabled', true);
                  $('#gotoPrizes').prop('disabled', true);
              }
              
              function enableButtonAfterSpin(){
                  $('#gotoGetspins').prop('disabled', false);
                  $('#gotoPrizes').prop('disabled', false);
              }
              
 			function disableSpin(){
	            $('#spin-wheel').removeClass("button").addClass("button_on");
	            $('#spin-wheel').prop('disabled', true);				
			}
			
			function enableSpin(){
		        // try to deferr this until after the music stops
		        $('#spin-wheel').removeClass("button_on").addClass("button");
		        $('#spin-wheel').prop('disabled', false);				
			}

/*
		$(function() {
		    $.ajaxSetup({
		        error: function(jqXHR, exception) {
		            if (jqXHR.status === 0) {
		                alert('Not connect.\n Verify Network.');
		            } else if (jqXHR.status == 404) {
		                alert('Requested page not found. [404]');
		            } else if (jqXHR.status == 500) {
		                alert('Internal Server Error [500].');
		            } else if (exception === 'parsererror') {
		                alert('Requested JSON parse failed.');
		            } else if (exception === 'timeout') {
		                alert('Time out error.');
		            } else if (exception === 'abort') {
		                alert('Ajax request aborted.');
		            } else {
		                alert('Uncaught Error.\n' + jqXHR.responseText);
		            }
		        }
		    });
		});
*/


          $('#fb-auth-store').live('click', function(){
			        FB.login(function(response) {
      			      if (response.authResponse) {
      			            FB.api('/me?fields=name,id', function(response) {
      			            	fbId = response.id;
      			            	window.location.href = ctx + '/fas/store/list.htm?start=0&limit=10';
      			        });    
			          } else {
			            //user cancelled login or did not grant authorization
			          }
			        }, {scope:'email', perms:'publish_stream'}); 
          });   	

		$('#purchase-requested-item').live('click', function(){  
      		if($('#requested-item-name').val() == ''){
                        $('#confirm-boxy .popupMsg .faadTitle').html('Invalid Name');
                        $('#confirm-boxy .popupMsg .popUpBody').html("<p>Please fill in the name of the itunes app you would like to receive</p><br>");
                        $('#confirm-boxy .popupMsg .faadClose button').html('Close');
             		                 
             		   $('#yes-no').hide();
             		   $('#yes-no-requested').hide();
             		   $('#confirm-close-btn').show();               		    
             		   outOfCreditBoxy = new Boxy('#confirm-boxy', {modal: true});      		
          		return;
      		}
		     //alert(fbId);
        		if(fbId === undefined){
            		$('#confirm-boxy .popupMsg .faadTitle').html('Login To Facebook');
            		
            		$('#confirm-boxy .popupMsg .popUpBody').html('<p>Facebook login is required to redeem credits.</p><br>');  
            		$('#confirm-boxy .popupMsg .popUpBody').append('<div id="logged-out"><img id="fb-auth-store" src="' + staticUrl + 'images/fb_connect.png" /></div>');   
            		$('#confirm-boxy .popupMsg .faadClose button').html('No, I don\'t want to redeem my credits');

             		   $('#yes-no').hide();
             		   $('#yes-no-requested').hide();
             		   $('#confirm-close-btn').show();               		    
             		   outOfCreditBoxy = new Boxy('#confirm-boxy', {modal: true});          		
        		} else {
                  if(credits < 100000){
                        $('#confirm-boxy .popupMsg .faadTitle').html('Get More Spins');
                        $('#confirm-boxy .popupMsg .popUpBody').html("<p>Sorry, you need " + (100000 - credits) + " more credits to purchase <br>" + $('#requested-item-name').val() + " </p><br>");
                        $('#confirm-boxy .popupMsg .popUpBody').append('<p class="spin-img" id="get-more-spins"><img src="' + staticUrl + 'images/btn_getmorespins_on.png" alt="Get More Spins" /></p>');
                        $('#confirm-boxy .popupMsg .popUpBody').append('<p class="spin_Msg">Install FREE Apps to Earn More Spins!</p>');
                        $('#confirm-boxy .popupMsg .faadClose button').html('Close');
             		                 
             		   $('#yes-no').hide();
             		   $('#yes-no-requested').hide();
             		   $('#confirm-close-btn').show();               		    
             		   outOfCreditBoxy = new Boxy('#confirm-boxy', {modal: true}); 
                  }else{
                    $('#confirm-boxy .popupMsg .faadTitle').html('Redeem Credits');
                    $('#confirm-boxy .popupMsg .popUpBody').html("Please confirm your prize purchase");
                    
                    $('#yes-no-requested').show();
                 	  $('#yes-no').hide();
               	  $('#confirm-close-btn').hide();
             	  
                    confirmPurchaseBoxy = new Boxy('#confirm-boxy', {modal: true});
                  }
              }
		});

		$('#yes-purchase-request').live('click', function(){
      		confirmPurchaseBoxy.hide();
      		doPurchaseRequested(); 
		});
		
		function doPurchaseRequested(){
      		var name = $('#requested-item-name').val();
     			$.ajax({
				  type: "GET",
				  url: ctx + "/fas/store/purchaseRequested.json?" + new Date().getTime(),
				  dataType: 'json',
				  data: {name: name}
				}).done(function ( data ) {
					//alert(data.result);
					
					$('#boxy-display-store .popupMsg .popUpBody').html('');

					$('#purchase-result').html("Thanks for your suggested prize.");
					
					$('#requested-item-name').val('');
					
                        //var prizeMsg = "You won " + name + " from http://freeappslots.com  Thank you for playing!";
                        //var postItMsg = "<a class='faadButton' href='javascript: post(\""+prizeMsg+"\");'>Post To Facebook</a>";
    					
    					//$('#instant-win-results-fb-msg').html(postItMsg);					
					
					//alert('old credit ' + credits);
					
                        credits = credits - 100000;
                        
                        $('.credit_num').html(Math.round(Number(credits)));
                        
                        //alert('new credit ' + credits);
					storeBoxy = new Boxy('#boxy-display-store', {modal: true});
				});
		} 
		
		/* This should have been another hidden field but it got missed so here it is */
		
		var storeItemName = null;
		
		function purchase(storeItemId, costCredit, name){
        		window.scrollTo(0, 0);
        		/* Global variable getting set */
        		if(fbId === undefined){
            		$('#confirm-boxy .popupMsg .faadTitle').html('Login To Facebook');
            		
            		$('#confirm-boxy .popupMsg .popUpBody').html('<p>Facebook login is required to redeem credits.</p><br>');  
            		$('#confirm-boxy .popupMsg .popUpBody').append('<div id="logged-out"><img id="fb-auth-store" src="' + staticUrl + 'images/fb_connect.png" /></div>');   
            		$('#confirm-boxy .popupMsg .faadClose button').html('No, I don\'t want to redeem my credits');
            		
            		// add faadClose style here

             		   $('#yes-no').hide();
             		   $('#yes-no-requested').hide();
             		   $('#confirm-close-btn').show();               		    
             		   outOfCreditBoxy = new Boxy('#confirm-boxy', {modal: true});          		
        		} else {
     		     storeItemName = name;
          		$('#store-item-id').val(storeItemId);
          		$('#cost-credit-id').val(costCredit);

                  if(credits < costCredit){
                    if(name.toLowerCase().search("amazon") != -1)  {
              		doAmazonInsufficientCreditPurchase(storeItemId, costCredit, name);        
           		 } else {
                          $('#confirm-boxy .popupMsg .faadTitle').html('Get More Spins');
                          $('#confirm-boxy .popupMsg .popUpBody').html("<p>Sorry, you need " + (costCredit - credits) + " more credits to purchase <br>" + name + " </p><br>");
                          $('#confirm-boxy .popupMsg .popUpBody').append('<p class="spin-img" id="get-more-spins"><img src="' + staticUrl + 'images/btn_getmorespins_on.png" alt="Get More Spins" /></p>');
                          $('#confirm-boxy .popupMsg .popUpBody').append('<p class="spin_Msg">Install FREE Apps to Earn More Spins!</p>');
                          $('#confirm-boxy .popupMsg .faadClose button').html('Close');
                          
                          // add faadClose style here
    
                   	   $('#yes-no-requested').hide();             
               		   $('#yes-no').hide();
               		   $('#confirm-close-btn').show();               		    
               		   outOfCreditBoxy = new Boxy('#confirm-boxy', {modal: true});
               	 }
                  }else{
                    if(name.toLowerCase().search("amazon") != -1)  {
              		doAmazonConfirm(storeItemId, costCredit, name);        
                  }else{
                    $('#confirm-boxy .popupMsg .faadTitle').html('Redeem Credits');
                    $('#confirm-boxy .popupMsg .popUpBody').html("Buy " + name + " for " + costCredit + " credits");
                    
               	  $('#yes-no').show();
               	  $('#confirm-close-btn').hide();
               	  $('#yes-no-requested').hide();
               	
                    confirmPurchaseBoxy = new Boxy('#confirm-boxy', {modal: true});
                  }
              }
		}
		}
		
		function doAmazonInsufficientCreditPurchase(storeItemId, costCredit, name){
      		$('#dynamic-amazon-text').html(name + ' costs ' + costCredit + ' credits and you have only ' + credits + ' credits! To get more credits, download more of our sponsor apps.');
      		amazonInsufficientCreditsBoxy = new Boxy('#boxy-amazon-insufficient-credits', {modal: true});
		}
		
		function doAmazonConfirm(storeItemId, costCredit, name){
      		$('#amazon-confirm-prize-name').html(name);
      		amazonConfirmBoxy = new Boxy('#boxy-amazon-confirm', {modal: true});
		}	
		
         function doAmazonPurchase(){
		     var storeItemId = $('#store-item-id').val();
      		var costCredit = $('#cost-credit-id').val();
      		amazonConfirmBoxy.hide();
      		doPurchase(storeItemId, costCredit, storeItemName);          
         }	
         
		function doAmazonPurchaseSuccessful(storeItemId, costCredit, name, result){
      		$('#boxy-amazon-purchase-success .spin_Msg').html(name);
      		$('.claimcode').html('Need to pass sku in for amazon case');
      		$('.amazonredeem').html(result);
      		amazonPurchaseSuccessfulBoxy = new Boxy('#boxy-amazon-purchase-success', {modal: true});
		}	         
		
		$('#yes-purchase').live('click', function(){
		     var storeItemId = $('#store-item-id').val();
      		var costCredit = $('#cost-credit-id').val();
      		confirmPurchaseBoxy.hide();
      		doPurchase(storeItemId, costCredit, storeItemName);  
		});
		
		$('#no-purchase').live('click', function(){
      		confirmPurchaseBoxy.hide();
		});		

		function doPurchase(storeItemId, costCredit, name){
     			$.ajax({
				  type: "POST",
				  url: ctx + "/fas/store/purchase.json?" + new Date().getTime(),
				  cache: false,
				  dataType: 'json',
				  data: {storeItemId: storeItemId}
				}).done(function ( data ) {
      				if(data.result == 'Access Denied'){
          				$('#purchase-result .faadTitle h1').html('Your session has expired');
          				$('#purchase-result').append('<a class="faadButton" href="' + staticUrl + '">Start A New Session</a>');
          				$('#instant-win-results-fb-msg').html('');
        				}else{
     					$('#store_' + storeItemId).remove();
    					
               			if(name.toLowerCase().search("amazon") != -1)  {
                        		doAmazonPurchaseSuccessful(storeItemId, costCredit, name, data.result);        
                   		 } else {      
                         	$('#purchase-result').html(data.result);
                         	$('#purchase-result').append('<p style="vertical-align:top">Post to Facebook for 2 Free Spin!</p>');
      
                            var prizeMsg = "I won " + name + " from www.freeappslots.com !  Still trying to win The New iPad!";
                            var postItMsg = "<a class='faadFbButton'  href='javascript: post(\""+prizeMsg+"\");'>Post To Facebook</a>";
        					
        					$('#instant-win-results-fb-msg').html(postItMsg);
        					
                            credits = credits - costCredit;
                            $('.credit_num').html(Math.round(Number(credits)));
                            
                            //alert('new credit ' + credits);
     					storeBoxy = new Boxy('#boxy-display-store', {modal: true});
					}
					}
				});
		} 
		

		
		/*
		function fbLike(){
      		FB.api('/me/likes/314604131980943', {limit: 1}, function(response){
                if (!response || response.error) {
      				  $('#newspins-boxy .faadTitle').html('Post To Facebook Error');
      				  $('#newspins-boxy .popUpBody').html('We were unable to perform facebook like on FreeAppSlots due to ' + response.error.message);
      				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
                } else {        
                   	 earnSpinsCall();
                }    
      		});
		}
		
		function earnSpinsCall(){
        		var callingTimestamp = new Date().getTime();    
                   	 $.ajax({
      				  type: "POST",
      				  url: ctx + "/fas/fb/earnspins.json?timestamp=" + callingTimestamp,
      				  dataType: 'json',
      				  cache: false,
      				  data: {action: likeActionKey, timestamp: callingTimestamp}
      				}).done(function ( data ) {
              			  if(data.timestamp > callingTimestamp){
              				  $('#spin-amount').html(data.spinsAmount);
              				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
          				  }else{
              				  earnSpinsCall();
          				  }
      				});  
		}
		*/

		function fbLike(){
				
			 FB.api('/me/likes/314604131980943', function(response){
				 if (!response || response.error) {
     				  $('#newspins-boxy .faadTitle').html('Like Us On Facebook Error');
     				  $('#newspins-boxy .popUpBody').html('We were unable to perform facebook like FreeAppSlots due to ' + response.error.message);
     				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
               } else {  
                 checkForLike();
               }
	      		});	
	             	
		}

		function earnSpinsCall(){
        		var callingTimestamp = new Date().getTime();    
        		
                   	 $.ajax({
      				  type: "POST",
      				  url: ctx + "/fas/fb/earnspins.json?timestamp=" + callingTimestamp,
      				  dataType: 'json',
      				  cache: false,
      				  data: {action: likeActionKey, timestamp: callingTimestamp}
      				}).done(function ( data ) {
          				if(data.result == 'Access Denied'){
            				  $('#newspins-boxy .faadTitle').html('FreeAppSlots Error');
            				  $('#newspins-boxy .popUpBody').html('Please visit http://freeappslots.com to register before earning spins');
            				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
          				}else{
                   			  if(data.timestamp > callingTimestamp){
                         			  if(data.spinsAmount == 0){
                        				  $('#newspins-boxy .faadTitle').html('FreeAppSlots Error');
                        				  $('#newspins-boxy .popUpBody').html('Uh oh!  http://freeappslots.com could not reward you your spins probably because you were already rewarded spins for liking us on Facebook.');
                        				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
                    				  }else{      
                        				  $('#spin-amount').html(data.spinsAmount);
                        				  spinCount = spinCount + data.spinsAmount;
                        				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
                    				  }
              				  }else{
                    				  $('#newspins-boxy .faadTitle').html('FreeAppSlots Error');
                    				  $('#newspins-boxy .popUpBody').html('Uh oh!  http://freeappslots.com we were unable to reward you spins.  Please try again.');
                    				  newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
              				  }
          				  }
      				});  
		}
		
		function checkForLike(){
            FB.api({ method: 'pages.isFan', page_id: '314604131980943'}, function(resp) {
                if (resp == true) {
                  earnSpinsCall();
                } else if(resp.error_code) {
                  Log.error(resp.error_msg);
                } else {
                  Log.error("user_id doesn't like the Application.");
                }
            });		
        }

        function postReferral(postMsg){
        	 FB.login(function(response) {
        		 if (response.authResponse) {
        			 FB.api('/me/feed', 'post', { message: postMsg }, function(response) {
        				 if(response.error.message){    
        					 $('#newspins-boxy .faadTitle').html('Post To Facebook Error');
        					 $('#newspins-boxy .popUpBody').html('We were unable to post to your facebook due to ' + response.error.message);
        					 newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
        				 } else {
        					 $('#newspins-boxy .faadTitle').html('Post To Facebook Successful');
        					 $('#newspins-boxy .popUpBody').html('Thank you for sharing your referral code.');
        					 newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
        				 }
        			 });
        		 }
        		   // handle the response
        	 }, {scope: 'publish_stream,user_about_me,email'});
        }

		
            //stream publish method
          function post(postMsg){
              //storeBoxy.hide(); 
        	  FB.login(function(response) {
         		 if (response.authResponse) {
         			 accessToken = response.authResponse.accessToken; 
                     FB.api('/me?fields=name,id,email', function(response) {
                          updateUserSession(response.id, accessToken,response.email);
                          fbId = response.id;
                          fbPost(postMsg); 
                      });    
         		 }
      		   // handle the response
      	 }, {scope: 'publish_stream,user_about_me,email'});
            }
            
            function fbPost(postMsg){
                FB.api('/me/feed', 'post', { message: postMsg }, function(response) {
                  if(response && response.id ){                  
                	 $('#newspins-boxy .faadTitle').html('Post To Facebook Successful');
 			 $('#newspins-boxy .popUpBody').html('Thank you for sharing on facebook!');
 					 
   			$.ajax({
   	      				  type: "POST",
   	      				  url: ctx + "/fas/fb/earnspins.json?timestamp=" + new Date().getTime(),
   	      				  dataType: 'json',
   	      				  cache: false,
   	      				  data: {action: postWinActionKey, timestamp: new Date().getTime()}
   	      		}).done(function ( data ) {
					  $('#newspins-boxy .popUpBody').append("<p>You've Just Earned " + data.spinsAmount + " Spins!</p>");
   	      		});  
			
   	      		newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: false});      
   		  }else {
   			$('#newspins-boxy .faadTitle').html('Post To Facebook Error');
         		$('#newspins-boxy .popUpBody').html('We were unable to post to your facebook due to ' + response.error.message);
         		newSpinsCountBoxy = new Boxy('#newspins-boxy', {modal: true});
		  } 
                });
            }
            
          function check_ext_perm(session,callback) {
          alert('NOT FUNCTIONAL: DEPRECATED check_ext_perm');
          alert(session['uid']);
              var query = FB.Data.query('select publish_stream,read_stream from permissions where uid={0}', session["uid"]);
              alert(query);
              query.wait(function(rows) {
                  if(rows[0].publish_stream == 1 && rows[0].read_stream == 1) {
                      callback(true);
                  } else {
                      callback(false);
                  }
              });
          };            
            
            function getFBPermission(postMsg){
                alert('NOT FUNCTIONAL: DEPRECATED getFBPermission');
            alert('getFBPermission');
              FB.ui({
                  method: 'permissions.request',
                  perms: 'http://freeappslots.com',
                  display: 'popup'
                  },function(response) {
                      alert(response.toSource());
                      if (response && response.perms) {
                          alert('Permissions granted: '+response.perms);
                          post(postMsg);
                      } else if (!response.perms){
                          alert('User did not authorize permission(s).');
                      }
              });
 
       }

		$('#redeem-requested-item').live('click', function(){  
      		alert('NOT FUNCTIONAL: DEPRECATED redeem-requested-item');
        		$('#confirm-msg').html("Please confirm your prize selection");
  
             	  $('#yes-no-requested').show();
             	  $('#yes-no').hide();
                  confirmPurchaseBoxy = new Boxy('#confirm-boxy', {modal: true});
		});

		$('#yes-redeem-request').live('click', function(){
      		alert('NOT FUNCTIONAL: DEPRECATED yes-redeem-request');
      		confirmPurchaseBoxy.hide();
      		doRequestedRedeem();  
		});

      function doRequestedRedeem(){ 
        alert('NOT FUNCTIONAL: DEPRECATED doRequestedRedeem');
           			    var name = $('#requested-item-name').val();
           			    var redeemWinId = $('#redeem-win-id').val();
           			    
           			    //alert(name);
           			    //alert(redeemWinId);

                       		$.ajax({
          				  type: "POST",
          				  url: ctx + "/fas/redeem/requested.json",
          				  dataType: 'json',
          				  data: {name: name, redeemWinId: redeemWinId}
          				}).done(function ( data ) {	
          				     if(data.result != 'Access Denied' || data.result != 'System Error' || data.hasNext == 1){
              				     //alert(data.result);
              				     //alert(data.nextRedeemWinId);
    
                                      //alert(data.nextRedeemWinLevel);

                                      for(var i = (data.nextRedeemWinLevel - 1); i >= 0; i --){
                                        if($('.level' + i)){
                                          //alert('deleting ' + i);
                                          $('.level' + i).remove();
                                        }
                                      }
                                      
                                      $('#requested-item-name').val('');
                                      $('#redeem-win-id').val(data.nextRedeemWinId);
              				     $('#dynamic-redeem').html('Choose an app in level ' + data.nextRedeemWinLevel);
              					$('#instant-win-results').html(data.result);

                                     var prizeMsg = "You won " + name + " from freeappslots.com.  Thank you for playing!";
             	              		var postItMsg = "<a class='faadButton' href='javascript: post(\""+prizeMsg+"\");'>Post To Facebook</a>";
              					
              					$('#instant-win-results-fb-msg').html(postItMsg);

              					redeemBoxy = new Boxy('#boxy-display-redeem', {modal: true});
          					}else{
          					     $('.prizes_section').html('');
          					}
          				});

      }
      
		function redeemWin(name, itemId){
      		alert('NOT FUNCTIONAL: DEPRECATED redeemWin');
      		$('#item-id').val(itemId);
      		$('#name-id').val(name);

      		$('#confirm-msg').html("Please confirm your prize selection");
             	  
             	  $('#yes-no').show();
             	  $('#yes-no-requested').hide();
             	  
                confirmPurchaseBoxy = new Boxy('#confirm-boxy', {modal: true});                 
		}
		
		$('#yes-redeem').live('click', function(){
      		alert('NOT FUNCTIONAL: DEPRECATED yes-redeem');
		     var itemId = $('#item-id').val();
      		var name = $('#name-id').val();
      		confirmPurchaseBoxy.hide();
      		doRedeemWin(name, itemId);  
		});
		
		$('#no-redeem').live('click', function(){
      		confirmPurchaseBoxy.hide();
		});	
		
		function doRedeemWin(name, itemId){
      		alert('NOT FUNCTIONAL: DEPRECATED doRedeemWin');
			     var redeemWinId = $('#redeem-win-id').val();
			     
			     //alert(redeemWinId);
			     
             		$.ajax({
				  type: "POST",
				  url: ctx + "/fas/redeem/select.json",
				  dataType: 'json',
				  data: {name: name, redeemWinId: redeemWinId}
				}).done(function ( data ) {		 
				    //alert(data.result);
				    //alert(data.hasNext);
				    if(data.hasNext == 0){
				         $('.prizes_section').html('');
				    }else{
      				     // need to know when this is empty as well               
               			
               			//$('#redeem_' + itemId).remove();
               			
               			//alert(data.nextRedeemWinLevel);
               			
               			//alert(data.nextRedeemWinId);
               			
               			$('#redeem-win-id').val(data.nextRedeemWinId);
               			$('#dynamic-redeem').html('Choose an app in level ' + data.nextRedeemWinLevel);

                            for(var i = (data.nextRedeemWinLevel - 1); i >= 0; i --){
                              if($('.level' + i)){
                                //alert('deleting ' + i);
                                $('.level' + i).remove();
                              }
                            }
                            
                            //alert(data.result);

      					$('#instant-win-results').html(data.result);
                                      				
                            var prizeMsg = "You won " + name + " from freeappslots.com.  Thank you for playing!";
             	              var postItMsg = "<a class='faadButton' href='javascript: post(\""+prizeMsg+"\");'>Post To Facebook</a>";
              					
              					//alert($('#instant-win-results-fb-msg').html());
              			$('#instant-win-results-fb-msg').html(postItMsg);
                    		
      					redeemBoxy = new Boxy('#boxy-display-redeem', {modal: true});
					}
				});
		} 

		function getPage(url){
      		alert('NOT FUNCTIONAL: DEPRECATED getPage');
			$.ajax({
				  type: "GET",
				  url: url
				}).done(function ( data ) {		
					if(outOfSpinBoxy != null && outOfSpinBoxy.isVisible()){ outOfSpinBoxy.hide(); }
					if(storeBoxy != null && storeBoxy.isVisible()){ storeBoxy.hide(); }
					if(redeemBoxy != null && redeemBoxy.isVisible()){ redeemBoxy.hide(); }
					if(spinBoxy != null && spinBoxy.isVisible()){ spinBoxy.hide(); }
					$('#wrapper-dynamic').html(data);
				});
		} 
