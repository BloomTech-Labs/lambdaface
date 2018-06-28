import React from 'react';

const PasswordReset = (props) => {
  return (
    <div className="password-reset__backdrop" onClick={props.handlePW}>
      <div className="password-reset">
        <div className="password-reset__contents">
          A link to reset your password has been sent to your email. Please follow instructions to reset password. Thanks! 
        </div>
      </div>
    </div>
  )
}

export default PasswordReset;