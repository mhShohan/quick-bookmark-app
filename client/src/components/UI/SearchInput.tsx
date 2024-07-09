import { TSetQuery } from '@/types';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

interface SearchInputProps {
  placeholder?: string;
  setQuery: TSetQuery;
}

const SearchInput = ({ setQuery, placeholder = 'Search…' }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setQuery((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => {
      clearTimeout(debounceId);
    };
  }, [searchTerm]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchInput;
