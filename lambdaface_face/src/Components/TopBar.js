import React from 'react';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import LambdaLogo from '../Assets/LambdaLogo.svg';

export default (props) => {
  return (
    <div>
      <img src={LambdaLogo} alt="logo"/>
      <Link to="/UserSettings">
        <Button onClick={props.changeCategory('User Settings')}>
          User Settings
        </Button>
      </Link>
    </div>
  )
}