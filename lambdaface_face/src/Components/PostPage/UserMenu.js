import React from 'react';

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import menuIcon from '../../Assets/UserMenu.svg';

export default class UserMenu extends React.Component {
  state = {
    showUserMenu: false,
  }
  toggleUserMenu = () => {
    this.setState(prev => ({
      showUserMenu: !prev.showUserMenu,
    }));
  }
  render() {
    return (
      <div>
        <IconButton onClick={this.toggleUserMenu}>
          <img src={menuIcon} alt="edit menu" height="30px" width="30px" />
        </IconButton>
        { this.state.showUserMenu
          ? (
            <div className="edit_menu">
              <Button
                variant="contained"
                color="secondary" 
                className="edit-btn" 
                onClick={this.props.handleEdit}
              >
                edit
              </Button>

              <Button
                variant="contained"
                color="primary" 
                className="delete-btn" 
                onClick={this.props.handleDelete}
              >
                delete
              </Button>
            </div>
          ) : ''
        }
      </div>
    );
  }
}