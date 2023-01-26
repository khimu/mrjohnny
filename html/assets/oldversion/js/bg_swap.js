function changeBgImg() { 
          if (document.getElementById('bkg').className == 'state1') { 
                document.getElementById('bkg').className = 'state2'; 
          } else  if (document.getElementById('bkg').className == 'state2') {
                document.getElementById('bkg').className = 'state3'; 
          } else  if (document.getElementById('bkg').className == 'state3') { 
                document.getElementById('bkg').className = 'state4'; 
          } else  if (document.getElementById('bkg').className == 'state4') {
                document.getElementById('bkg').className = 'state1'; 
         
          }
        }
 
            setInterval( function() {
						    changeBgImg(); },250);
 
 function animateScoreboard() { 
          if (document.getElementById('scoreboard').className == 'state5') { 
                document.getElementById('scoreboard').className = 'state6'; 
          } else  if (document.getElementById('scoreboard').className == 'state6') {
    
                document.getElementById('scoreboard').className = 'state5'; 
          }
        }
 
            setInterval( function() {
						    animateScoreboard(); },250);