import './App.css';
// useAuth0 hook provides built in methods for login,logout etc..
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated ,getAccessTokenSilently} = useAuth0();

  // 🎈 API calls to backend at 5000
  function callApi(){
    axios.get("http://localhost:5000/")
    .then(response=>console.log(response.data))
    .catch(error=>console.log(error));
  }

  // 🎇Grab the Access token recieved from the Auth0 authorization server🎇 
  async function callProtectedApi(){
    const token = await getAccessTokenSilently();
    console.log(token);
    // axios.get("http://localhost:5000/protected")
    // .then(response=>console.log(response.data))
    // .catch(error=>console.log(error));
  }
  
  return (
    <div className="App">
      <h1>Auth0 with React+Node</h1>
      <h2>This is funapp frontend at 3000</h2>
      <ul>
        <li><button onClick={loginWithPopup}>Login with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
      <h3>User is {isAuthenticated?"Logged In":"Not logged in"}</h3>
      <h2>You can call backend(api at 5000)</h2>
      <ul>
        <li><button onClick={callApi}>Call api(backend of funapp at 5000)</button></li>
        <li><button onClick={callProtectedApi}>Call Protected api route(backend of funapp at 5000)</button></li>
      </ul>
      {isAuthenticated && <pre style={{textAlign:'start'}}>{JSON.stringify(user,null,2)}</pre>}
    </div>
  );
}

export default App;
