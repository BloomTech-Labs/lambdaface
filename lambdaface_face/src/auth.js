import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'lambda-face-test1.auth0.com',
    clientID: 'A86C7iFueySjvHsu5fhxq3SVJBNxo1CF',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://lambda-face-test1.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // TODO: find better way to redirect to main page;
        window.location.replace('http://localhost:3000');
      } else if (err) {
        // TODO: find better way to redirect to main page;
        window.location.replace('http://localhost:3000');        
        console.error(err);
      }
    });
  };

  // place auth response in user storage
  setSession = (authResult) => {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  // Remove access items from local storage
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // TODO: find better way to navigate back to landing page
    window.location.replace('http://localhost:3000');    
  };

  // evaluate expiration time
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
