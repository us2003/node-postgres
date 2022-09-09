const express = require( 'express' );
const userRouter = require( './routes/user.routes' );
const user_model = require( './user_model' );
const app = express();
const port = 3001;

// app.get( '/', ( req, res ) => {
//     res.status( 200 ).send( 'Hello World!' );
// } ); 

app.use( express.json() );
app.use( '/api', userRouter );

app.use( function ( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers' );
    next();
} );

app.get( '/', ( req, res ) => {
    user_model.getUsers()
        .then( response => {
            res.status( 200 ).send( response );
        } )
        .catch( error => {
            res.status( 500 ).send( error );
        } );
} );

app.post( '/users', ( req, res ) => {
    user_model.createUser( req.body )
        .then( response => {
            res.status( 200 ).send( response );
        } )
        .catch( error => {
            res.status( 500 ).send( error );
        } );
} );

app.delete( '/users/:id', ( req, res ) => {
    user_model.deleteUser( req.params.id )
        .then( response => {
            res.status( 200 ).send( response );
        } )
        .catch( error => {
            res.status( 500 ).send( error );
        } );
} );

app.listen( port, () => {
    console.log( `App started on port ${port}.` );
} );