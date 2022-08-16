import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components'

const MenuContainer = styled.div`
    float: right;
`

const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MenuContainer data-testid="menuContainer">
      <Button
        data-testid="menuButton"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{fontSize: 20, lineHeight: "20px", padding: 0, minWidth: 'inherit'}}
      >
        ...
      </Button>
      <Menu
        data-testid="menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem data-testid="menuButton" onClick={handleClose}>Edit Post</MenuItem>
        <MenuItem data-testid="menuButton" onClick={handleClose}>Delete Post</MenuItem>
      </Menu>
    </MenuContainer>
  );
}

export default MenuComponent;