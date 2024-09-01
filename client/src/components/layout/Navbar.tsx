'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// mui
import {
  Box,
  Button,
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
import LogoutIcon from '@mui/icons-material/Logout';

// project imports
import { navbarData } from '@/data';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Logo from '../UI/Logo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import profileImg from '@/assets/profile.png';
import Image from 'next/image';
import storage from '@/utils/storage';
import { logout } from '@/services/actions/logout';
import { logoutUser } from '@/store/authSlice';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const token = storage.getToken();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [role, setRole] = useState<string>('USER');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    storage.removeToken();
    dispatch(logoutUser());
    router.push('/');
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (token) {
      const userWithRole = jwtDecode<any>((token as string) || '');
      setRole(userWithRole.role as string);
    }

    setIsClient(true);
  }, []);

  return (
    <Container maxWidth='lg'>
      <Stack justifyContent='space-between' direction='row' alignItems='center' sx={{ py: 2 }}>
        <Logo />
        {token && isClient ? (
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
                <Stack sx={{ py: 1, px: 4 }} alignItems='center'>
                  {role === 'ADMIN' && (
                    <Typography
                      component={Link}
                      href='/admin'
                      sx={{
                        textDecoration: 'none',
                        fontSize: '1.3rem',
                        color: theme.palette.primary.main,
                        borderBottom: `2px solid transparent`,
                        transition: 'border 0.3s ease',
                        '&:hover': {
                          borderBottom: `2px solid ${theme.palette.primary.main}`,
                        },
                      }}
                    >
                      Admin Dashboard
                    </Typography>
                  )}
                  <Typography
                    component={Link}
                    href='/dashboard'
                    sx={{
                      textDecoration: 'none',
                      fontSize: '1.3rem',
                      color: theme.palette.primary.main,
                      borderBottom: `2px solid transparent`,
                      transition: 'border 0.3s ease',
                      '&:hover': {
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    My Bookmarks
                  </Typography>

                  <Typography
                    component={Link}
                    href='/profile'
                    sx={{
                      textDecoration: 'none',
                      fontSize: '1.3rem',
                      color: theme.palette.primary.main,
                      borderBottom: `2px solid transparent`,
                      transition: 'border 0.3s ease',
                      '&:hover': {
                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    My Profile
                  </Typography>
                  <Button startIcon={<LogoutIcon />} sx={{ mt: 2 }} onClick={handleLogout}>
                    Logout
                  </Button>
                </Stack>
              </Menu>
            </Box>
          </>
        ) : (
          <Stack>
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
