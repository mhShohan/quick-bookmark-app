'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// mui
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import styled from '@mui/material/styles/styled';

// project imports
import { navbarData } from '@/data';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Logo from '../UI/Logo';
import { useAppSelector } from '@/store/hooks';
import profileImg from '@/assets/profile.png';
import Image from 'next/image';

const settings = ['Profile', 'Dashboard', 'Logout'];

const Navbar = () => {
  const theme = useTheme();
  const token = useAppSelector((state) => state.auth.token);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth='lg'>
      <Stack justifyContent='space-between' direction='row' alignItems='center' sx={{ py: 2 }}>
        <Logo />
        {token ? (
          <>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='User'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Image
                    src={profileImg}
                    alt='profile'
                    width={50}
                    height={50}
                    style={{ marginTop: '1.1rem' }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '80px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </>
        ) : (
          <Stack display={{ xs: 'none', md: 'flex' }}>
            <List>
              {navbarData.map((link) => (
                <NavLinks key={link.id} link={link} handleClick={() => {}} />
              ))}
            </List>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;

const List = styled('ul')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    margin: '0 1rem',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.light,
      },
    },
  },
}));

// NavLinks Component
const NavLinks = ({
  link,
  handleClick,
}: {
  handleClick: Dispatch<SetStateAction<boolean>>;
  link: { name: string; path: string };
}) => {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <li style={{ listStyle: 'none' }}>
      <Link
        href={link.path}
        style={{
          color: pathname === link.path ? theme.palette.primary.light : 'white',
          fontWeight: pathname === link.path ? 800 : 500,
          textDecoration: 'none',
          fontSize: '1.3rem',
          transition: 'color 0.3s ease',
        }}
        onClick={() => handleClick(false)}
      >
        {link.name}
      </Link>
    </li>
  );
};
