import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState( false );
  useEffect( () => {
    getUser();
  }, [] );
  function getUser() {
    fetch( 'http://localhost:3001' )
      .then( response => {
        return response.text();
      } )
      .then( data => {
        setUsers( data );
      } );
  }
  function createUser() {
    let name = prompt( 'Enter user name' );
    let email = prompt( 'Enter user email' );
    fetch( 'http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { name, email } ),
    } )
      .then( response => {
        return response.text();
      } )
      .then( data => {
        alert( data );
        getUser();
      } );
  }
  function deleteUser() {
    let id = prompt( 'Enter user id' );
    fetch( `http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    } )
      .then( response => {
        return response.text();
      } )
      .then( data => {
        alert( data );
        getUser();
      } );
  }
  if ( !users ) {
    return <div>There is no user data available</div>;
  }
  return (
    <div>
      {JSON.parse( users ).map( user =>
        <div key={user.id}>{user.id}. {user.name} - {user.email}</div>
      )}
      <br />
      <button onClick={createUser}>Add user</button>
      <br />
      <button onClick={deleteUser}>Delete user</button>
    </div>
  );
}
export default App;

