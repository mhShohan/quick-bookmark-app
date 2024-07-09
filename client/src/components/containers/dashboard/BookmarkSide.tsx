import SearchInput from '@/components/UI/SearchInput';
import { IBookmark, IFolder, TSetQuery } from '@/types';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateBookmarkModel from './CreateBookmarkModel';
import { useState } from 'react';

interface BookmarkSideProps {
  bookmarks?: IBookmark[];
  totalPage: number;
  query: {
    folderId?: string;
    search?: string;
    page: number;
    limit: number;
  };
  setQuery: TSetQuery;
  folders?: IFolder[];
}

const BookmarkSide = ({
  bookmarks,
  folders,
  query,
  setQuery,
  totalPage = 1,
}: BookmarkSideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Grid item xs={12} m={2} md={8}>
      <Stack
        boxShadow={24}
        p={2}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent='space-between'
        spacing={1}
      >
        <Box>
          <Button
            fullWidth
            onClick={() => setIsOpen(true)}
            startIcon={<BookmarkAddIcon />}
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.main',
              },
            }}
          >
            Add Bookmark
          </Button>
        </Box>
        <Box>
          <SearchInput setQuery={setQuery} />
        </Box>
      </Stack>
      <Stack my={2}>
        <Stack maxHeight='280px' minHeight='200px' overflow='auto'>
          <>
            {bookmarks?.map((bookmark: IBookmark) => (
              <SingleBookmark key={bookmark._id} bookmark={bookmark} />
            ))}
          </>
        </Stack>
        <Stack my={1} alignItems='center'>
          <Pagination
            count={totalPage}
            color='primary'
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#fff',
                border: '1px solid #fff',
              },
            }}
            page={query.page}
            onChange={(e, page) => setQuery((prev) => ({ ...prev, page: page }))}
          />
        </Stack>
        <CreateBookmarkModel open={isOpen} setOpen={setIsOpen} folders={folders} />
      </Stack>
    </Grid>
  );
};

export default BookmarkSide;

const SingleBookmark = ({ bookmark }: { bookmark: IBookmark }) => {
  return (
    <Stack mb={1}>
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
          <Typography variant='h6' textTransform='capitalize' ml={1}>
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
          <Typography fontWeight={500}>
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
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Stack>
  );
};
