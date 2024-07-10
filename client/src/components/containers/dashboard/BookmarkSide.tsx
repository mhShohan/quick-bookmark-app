import SearchInput from '@/components/UI/SearchInput';
import { IBookmark, IFolder, TSetQuery } from '@/types';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import CreateBookmarkModel from './CreateBookmarkModel';
import SingleBookmark from './SingleBookmark';

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
