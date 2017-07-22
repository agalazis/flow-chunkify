var eventStream = require( 'event-stream' ),
	cStream = require( '../lib' );

// Create some data for given size...
function createArray(size){
	var data = new Array( size );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	return data;
}

// sets up an example given a chankify transformation
// factory and example data size
function setupExample(transformFactory, size){
	
	// create an array of given size
	const randomArray = createArray(size);
	
	// create a stream out of it
	const stream = eventStream.readArray(randomArray);

	// pipe ste stream to chunkify  
	return stream.pipe( transformFactory.stream() )
		//improve output format
		.pipe( eventStream.map( function( d, clbk ){
			clbk( null, 'stream'+size+': '+JSON.stringify( d )+'\n' );
		}))
	
}

// Create a new chunkify stream factory:
var transformFactory = cStream()
	.numValues( 10 );

// set the size of your examples here
var exampleSizes = [5,10,11,1000]

// setup examples fro all the sizes
for (var i=0; i<exampleSizes.length; i++){
	setupExample(transformFactory, exampleSizes[i])
		// pipe the data to stdout
		.pipe( process.stdout );
}
