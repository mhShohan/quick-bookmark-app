import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, InputBase, Pagination, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const BookmarkSide = () => {
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>
      </Stack>
      <Stack my={2}>
        <Stack maxHeight='280px' minHeight='200px' overflow='auto'>
          <Grid container spacing={1}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <SingleBookmark key={i} />
            ))}
          </Grid>
        </Stack>
        <Stack my={1} alignItems='center'>
          <Pagination
            count={10}
            color='secondary'
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#fff',
                border: '1px solid #fff',
              },
            }}
          />
        </Stack>
      </Stack>
    </Grid>
  );
};

export default BookmarkSide;

const SingleBookmark = () => {
  return (
    <Grid item xs={12} md={6}>
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
        Lorem ipsum dolor sit amet.
      </Box>
    </Grid>
  );
};
