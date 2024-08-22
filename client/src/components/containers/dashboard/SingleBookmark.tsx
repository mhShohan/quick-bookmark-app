import { IBookmark } from '@/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import DeleteBookmarkModal from './DeleteBookmarkModal';

const SingleBookmark = ({ bookmark }: { bookmark: IBookmark }) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack mb={1}>
      <DeleteBookmarkModal open={open} setOpen={setOpen} id={bookmark._id} />
      <Grid
        container
        sx={{
          bgcolor: 'info.light',
          borderRadius: 1,
          padding: '2px 8px',
          color: '#fff',
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': {
            bgcolor: 'primary.light',
            color: 'primary.main',
          },
        }}
      >
        <Grid
          component={Link}
          href={bookmark.link}
          target='_blank'
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Typography variant='h6' lineHeight={0.9} my={1} textTransform='capitalize' ml={1}>
            {bookmark.title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          component={Link}
          href={bookmark.link}
          target='_blank'
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Typography fontWeight={500} ml={1}>
            Tags:{' '}
            {bookmark.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  p: 0,
                  height: '16px',
                  mr: 0.5,
                  color: 'primary.light',
                  bgcolor: 'primary.main',
                }}
                variant='filled'
              />
            ))}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <Tooltip title='Edit Bookmark' placement='bottom'>
            <IconButton>
              <EditNoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Bookmark' placement='bottom'>
            <IconButton onClick={() => setOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SingleBookmark;
