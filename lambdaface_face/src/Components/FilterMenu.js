import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FilterBy from "../Assets/Filter By.svg";

class FilterMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="filtermenu__container">
        <Button
          aria-owns={anchorEl ? 'filter-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <img src={FilterBy} alt="Filter" className="filter-menu__icon" />
          <span className="filter-menu__text">
            Filter by
          </span>
        </Button>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => {
            this.props.handleNewest();
            this.handleClose();
        }}>
            Newest
          </MenuItem>
          {/* <MenuItem onClick={this.handleClose}>Top</MenuItem> */}
        </Menu>
      </div>
    );
  }
}

export default FilterMenu;
