import { useGetAllFolderQuery } from '@/store/api/folder.api';
import { IFolder, TSetQuery } from '@/types';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FolderIcon from '@mui/icons-material/Folder';
import { Button, Divider, Grid, Stack } from '@mui/material';
import CreateFolderModel from './CreateFolderModel';
import { useState } from 'react';

interface FolderSideProps {
  setQuery: TSetQuery;
  folders?: IFolder[];
  query: {
    folderId?: string;
    search?: string;
    page: number;
    limit: number;
  };
}

const FolderSide = ({ query, setQuery, folders }: FolderSideProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12} md={3} m={2} height='100%'>
      <Stack
        py={2}
        px={4}
        height='calc(100% - 1.8rem)'
        borderRadius={4}
        border='1px solid gray'
        overflow='auto'
        spacing={1}
      >
        <Button
          startIcon={<FolderIcon />}
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'primary.main',
            },
          }}
          onClick={() => setOpen(true)}
        >
          Create New Folder
        </Button>
        <CreateFolderModel open={open} setOpen={setOpen} />

        <Divider color='info' sx={{ my: 1 }} />
        <Button
          startIcon={<AllInclusiveIcon />}
          onClick={() => setQuery((prev) => ({ ...prev, folderId: '', search: '' }))}
          sx={{
            bgcolor: query.folderId === '' ? 'primary.light' : 'info.light',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'primary.main',
            },
          }}
        >
          View All
        </Button>

        {folders?.map((folder: any) => (
          <Button
            key={folder._id}
            onClick={() => setQuery((prev) => ({ ...prev, folderId: folder._id, search: '' }))}
            sx={{
              bgcolor: query.folderId === folder._id ? 'primary.light' : 'info.light',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.main',
              },
            }}
          >
            {folder.name}
          </Button>
        ))}
      </Stack>
    </Grid>
  );
};

export default FolderSide;
