import auth0 from 'auth0-js';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// const s3url = "http://lambdaface.com/" 
// const s3url = "http://lambdaface.s3-website.us-west-2.amazonaws.com/"
const s3url = "http://localhost:3000/" 

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'mjax.auth0.com',
    clientID: 'ZvFaTltpAA0mGgP50pOPGRyPsE90JGmz',
    redirectUri: s3url + 'callback',
    audience: 'https://mjax.auth0.com/userinfo',
    responseType: 'token id_token',
    // scope: 'openid'
    scope: 'openid profile'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        await this.setSession(authResult);
        // TODO: find better way to redirect to main page;
        window.location.replace(s3url);
      } else if (err) {
        // TODO: find better way to redirect to main page;
        window.location.replace(s3url)
        console.error(err);
      }
    });
  };

  // place auth response in user storage
  setSession = (authResult) => {
    const { name: email, sub: id } = jwt_decode(authResult.idToken);
    const defaultProfilePic = 'https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/defaultProfile.jpg'
    const newUser = { id, email, profilePicture: defaultProfilePic, firstName: "Pablo", lastName: "Picasso" }
    return axios
      .post(`${process.env.REACT_APP_URL}`.concat('api/users'), newUser)
      .then(res => {
        // user was successfully created
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
      })
      .catch(err => {
        // user had already been created, and is thus signing in
        // if (err.response.data.error.code === "ER_DUP_ENTRY" && err.response.status === 422) {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // }
      });
  };

  // Remove access items from local storage
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // TODO: find better way to navigate back to landing page
    window.location.replace(s3url);
  };

  // evaluate expiration time
  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
