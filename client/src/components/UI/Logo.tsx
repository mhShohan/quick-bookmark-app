import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/' style={{ textDecoration: 'none' }}>
      <Box>
        <Typography sx={{ fontSize: '2rem', fontWeight: '700' }}>
          Quick
          <Typography
            component='span'
            sx={{ fontSize: '2rem', fontWeight: '700', color: 'info.main' }}
          >
            Bookmark
          </Typography>
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
