import { Stack, Pagination } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface CustomPaginationProps {
  totalPage: number;
  query: {
    page: number;
    limit: number;
    search: string;
  };
  setQuery: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
      search: string;
    }>
  >;
}

const CustomPagination = ({ totalPage, query, setQuery }: CustomPaginationProps) => {
  return (
    <Stack spacing={2} direction='row' mt={4} justifyContent='center' width='100%'>
      <Pagination
        variant='outlined'
        color='standard'
        shape='rounded'
        count={totalPage}
        page={query.page}
        onChange={(_event, value) => setQuery((prev) => ({ ...prev, page: value }))}
        sx={{
          '& .MuiPaginationItem-root': {
            border: '1px solid #B6FFFA',
            color: '#B6FFFA',
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#B6FFFA',
            color: 'black',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#B6FFFA',
            },
          },
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
