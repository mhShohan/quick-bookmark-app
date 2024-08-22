import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import bannerImg from '@/assets/banner.png';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Container>
      <Stack>
        <Grid container mt={5}>
          <Grid item xs={12} md={8}>
            <Stack
              spacing={1}
              justifyContent='center'
              textAlign={{ xs: 'center', md: 'left' }}
              height='100%'
            >
              <Typography variant='h3' fontWeight='800'>
                Save and Organize <br /> Your Bookmarks Effortlessly.
              </Typography>
              <Typography>
                Create an account to easily save, manage, and access your favorite bookmarks from
                anywhere. Our intuitive platform ensures that your important links are always just a
                click away, keeping your digital life organized and clutter-free.
              </Typography>
              <Link href='/login'>
                <Button color='info'>Get Start</Button>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack marginTop={{ xs: 4, md: 1 }}>
              <Image
                src={bannerImg}
                alt='logo'
                width={500}
                height={500}
                style={{ width: '100%', maxHeight: '400px' }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default HomePage;
