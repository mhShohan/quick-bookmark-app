import SearchInput from '@/components/UI/SearchInput';
import { IBookmark, TSetQuery } from '@/types';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import Link from 'next/link';

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
}

const BookmarkSide = ({ bookmarks, query, setQuery, totalPage = 1 }: BookmarkSideProps) => {
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
          <Grid container spacing={1}>
            {bookmarks?.map((bookmark: IBookmark) => (
              <SingleBookmark key={bookmark._id} bookmark={bookmark} />
            ))}
          </Grid>
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
      </Stack>
    </Grid>
  );
};

export default BookmarkSide;

const SingleBookmark = ({ bookmark }: { bookmark: IBookmark }) => {
  return (
    <Grid item xs={12} md={6}>
      <Link href={bookmark.link} target='_blank' style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            bgcolor: 'info.light',
            borderRadius: 1,
            padding: '2px 8px',
            color: 'primary.main',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              bgcolor: 'primary.light',
            },
          }}
        >
          {bookmark.title}
        </Box>
      </Link>
    </Grid>
  );
};
