var eventStream = require( 'event-stream' ),
	cStream = require( '../lib' );

// Create some data...
function createArray(size){
	var data = new Array( size );
	for ( var i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	return data;
}
function setupExample(transformFactory, size){
	const randomArray = createArray(size);
	const stream = eventStream.readArray(randomArray);
	return stream.pipe( transformFactory.stream() )
		.pipe( eventStream.map( function( d, clbk ){
			clbk( null, 'stream'+size+': '+JSON.stringify( d )+'\n' );
		}))
	
}

// Create a new chunkify stream:
var transformFactory = cStream()
	.numValues( 10 );
var exampleSizes = [5,10,11,1000]
for (var i=0; i<exampleSizes.length; i++){
	setupExample(transformFactory, exampleSizes[i]).pipe( process.stdout );
}
// Pipe the data:
