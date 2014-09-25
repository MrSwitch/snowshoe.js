//
// Identity
//

(function(){


	window.snowshoe = window.snowshoe || [];


	// Add to the start of the snowshoe array
	snowshoe.unshift(function(e){
		e.indexes = getScore(e.points);
	});



	function getScore(points){

		// Find the two points which are furthest from one another (these are the  opposite vertices or 'corners')
		var i,j,dx,dy,len,
			disect,
			max; // Point1, Point2

		for(i=0;i<points.length;i++){

			var point1 = points[i];

			for (j=0;i<points.length;j++){

				var point2 = points[j];

				len = hypotenus(point1, point2);

				if( len > max ){
					max = len;
					disect = [point1, point2];
				}
			}
		}

		var point;

		// The disect now divides the stomp in two.
		// Capture the existing points as markers

		var markers = [];
		for(i=0;i<points.length;i++){
			point = points[i];
			if( point !== disect[0] && point !== disect[1] ){
				markers.push(point);
			}
		}


		// What is the orientation
		// The peak is one of these two points.
		// Which is the closes to the markers
		
		// How far is it from point1?
		var score = [0,0];
		for( i = 0 ; i < disect.length; i++ ){
			for( j=0;j<markers.length;j++){
				score[i] += hypotenus( disect[i], markers[j] );
			}
		}


		// Do we need to flip them around in the disect?
		if( score[1] < score[0] ){
			var tmp = disect[0];
			disect[0] = disect[1];
			disect[1] = tmp;
		}

		var vertex = disect[0];

		// Order the markers by furthest distance from vertex
		markers.sort(function(a,b){
			a = hypotenus(a,vertex);
			b = hypotenus(b,vertex);
			return +(a>b) || -(a<b);
		});

		// Find the angle of our disect line
		var vectorAngle = tangent(disect[0],disect[1]);

		// Score the markers by their distance from the central disect line
		score = [0,0,0];
		for( i = 0 ; i < markers.length; i++ ){
			// Find the tangent of each of the markers relative to the main vertex
			score[i] = 45 + vectorAngle - tangent( vectorAngle, markers[i] );
		}



		/**
		 * alternaive
		// Since there are three remaining points we will have an odd number on either side of this disecting line
		// Therefore the peak is choosen arbitarily as the point which has the most points to its left
		 */
		

		return score;
	}


	function hypotenus(point1, point2){
		var dx = point1[0] - point2[0];
		var dy = point1[1] - point2[1];
		return Math.sqrt((dx*dx)+(dy*dy));
	}

	function tangent(point1, point2){
		var dx = point1[0] - point2[0];
		var dy = point1[1] - point2[1];
		return Math.atan2(dx,dy);
	}
	
})();
