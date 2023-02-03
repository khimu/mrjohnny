
    var transitionend = "webkitTransitionEnd transitionend";

		// used for debugging
    var slots = [
      ['bell', 'orange', 'prune', 'orange', 'seven', 'cherry', 'bar', 'bell', 'prune'],
      ['prune', 'orange', 'seven', 'cherry', 'bar', 'bell', 'prune', 'orange', 'cherry'],
      ['orange', 'bell', 'orange', 'prune', 'orange', 'seven', 'cherry', 'bar', 'bell']
    ];

	function endSpin(el){
      		el.on(transitionend, function () {
      		});
	}

  // index - identify the wheel on the slot table
  // wheel - identify the wheel in the html
  // duration - how long to spin the wheel
  // type - the winning symbol
  function spinSingleWheel(index, wheel, duration, type, rotateWheel){
					// the number of times to spin the wheel
          var spinPlus = rotateWheel + 3600;

          rotateWheel = (type * 26.15) + spinPlus;
          //rotateWheel = (type + 1) * 30 + spinPlus;

					$('#debug').append(index + "<br/>");
					$('#debug').append(duration + "<br/>");
					$('#debug').append( (type * 129) + "<br/>");
					$('#debug').append(slots[index][type] + "<br/>");

          wheel.css({
            MozTransitionDuration: duration + 'ms',
            WebkitTransitionDuration: duration + 'ms',
            MozTransform: 'rotateX(-' + rotateWheel + 'deg)',
            WebkitTransform: 'rotateX(-' + rotateWheel + 'deg)'
          });
  }

        function spinNewWheel(){

		var wheels = $('.wheel');

                wheels.each(function () {

                var $this = $(this);
                var index = $this.index();

                                        if(index === 0){
                                                spinSingleWheel(index, $this, 5000, (4 * 2), 3600); // bell
                                        }else if(index === 1){
                                                spinSingleWheel(index, $this, 6000, (5 * 2), 3600); // bell
                                        }else if(index === 2){
                                                spinSingleWheel(index, $this, 7000, (6 * 2), 3600); // bell
                                        }
                });
                endSpin(wheels);
        }


	$(document).ready(function() {

		var wheels = $('.wheel');

    		// define for each wheel
				// initialize position of wheel
        wheels.each(function () {
          var $this = $(this);
          var index = $this.index();

          if(index === 0){
						// The 2 takes the win # to the position of the win icon on the strip
						// This allows us to buffer dummy icons around the win icon so that
						// We can create an illusion of a bigger wheel with varying icons
						// Create varying strips with different icons around the win values
						// Win values are multiples of 2 starting from bottom of the strip
						// Total length of strip has to be 1877 pixels
						// Height of position of icon needs to be 125 pixels
						// Icon size needs to be 100px x 100px (?).  As long as it fits in 125 pixels height
						// 
						// Current issue with this multiple is that the 7 parts is not showing the whole strip due to the length cut off
            spinSingleWheel(index, $this, 0, (1 * 2), 0); // bell
          }else if(index === 1){
            spinSingleWheel(index, $this, 0, (2 * 2), 0); // orange
          }else if(index === 2){
            spinSingleWheel(index, $this, 0, (3 * 2), 0); // bar
          }
        });
      	endSpin(wheels);
  });

