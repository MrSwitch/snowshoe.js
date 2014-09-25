//
// Listen to five finger events and trigger an event
//

if(window.addEventListener){

	window.addEventListener('touchstart', function(e){

		// Touches
		var touches = e.touches || e.changedTouches;


		// Have we got the five digits we need?
		// Do we have callbacks to fire?
		if( touches.length !== 5 || !window.snowshoe ){
			return;
		}

		
		// Do not do anything else.
		e.preventDefault();

		var i;


		// Create a list of XY coordinates
		var points = [];
		for( i=0; i < touches.length; i++ ){
			var touch = touches[i];
			points.push( [touch.clientX, touch.clientY] );
		}

		var resp = {
			points : points
		};


		// Trigger the listeners
		for(i=0;i<window.snowshoe.length;i++){
			window.snowshoe[i](resp);
		}
	});
}