//
// Listen to five finger events and trigger an event
//

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


	// Find the two points which are furthest from one another (these are the  opposite vertices or 'corners')
	var longest = [0,0,0]; // distance, Point1, Point2
	for(var i=0;i<points.length;i++){

		var point1 = points[i];

		for (var j=0;i<points.length;j++){

			var point2 = points[j];

			// Find the Difference
			var dx = point2[0] - point1[0];
			var dy = point2[1] - point1[1];

			var len = Math.sqrt( (dx*dx) + (dy*dy) );

			if( len > longest[0] ){
				longest = [len, point1, point2];
			}
		}
	}


	// What is the longest?
	console.log(longest);


	// Trigger the listeners
	for(i=0;i<window.snowshoe.length;i++){
		window.snowshoe[i](points);
	}
});