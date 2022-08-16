import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUserProfileContext } from '../context/profileContext';
import { IUserProfile } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const logo =  require("../images/Logo.png")
const pages = ['Create', 'Lounge', 'Discover','Opportunity'];
const settings = ['My portfolio', 'My Organizations', 'Settings', 'Logout'];

const ProfilePictureContainer = styled.div`
  border: 1px solid #CED7E7;
  border-radius: 6px;
  width: 80px; 
  padding: 5px;
  display: flex;
  justify-content: space-around;
`
const OnlineStatusCircle = styled.span`
  height: 8px;
  width: 8px;
  background-color: #35B71B;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  right: 1px;
  bottom: 0px;
`

const AvatarContainer = styled.div`
  display: block;
  position: relative;
`

const NavigationBarComponent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {photoUrl, profileUsername} = useUserProfileContext() as IUserProfile

  return (
    <AppBar elevation={0} position="static" sx={{backgroundColor: '#FFFFFF', color: '#006CFA', borderBottom: '1px solid #CED7E7', padding: '0px'}}>
      <Container maxWidth="xl" sx={{padding: '0px 10px !important'}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt="Logo" src={logo}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              data-testid="mobileMenuPagesContainer"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem data-testid="mobileMenuPagesLinks" key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt="Logo" src={logo}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                data-testid="webMenuPagesLinks"
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#006CFA', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ProfilePictureContainer>
            <AvatarContainer>
              <Avatar alt={profileUsername} src={photoUrl} sx={{width:30, height: 30}}/>
              <OnlineStatusCircle />
            </AvatarContainer>
              <Tooltip title="Open Profile Settings">
                <IconButton data-testid="profileMenuButton" disableRipple={true} onClick={handleOpenUserMenu} sx={{ p: 0, backgroundColor: 'transparent' }}>
                  <FontAwesomeIcon icon={faChevronDown} style={{fontWeight: 400, fontSize: '12px', lineHeight: '12px'}}/>
                </IconButton>
              </Tooltip>
            </ProfilePictureContainer>
            <Menu
              data-testid="settingsMenu"
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem data-testid="settingsButton" key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBarComponent;