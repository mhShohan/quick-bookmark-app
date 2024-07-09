import FolderIcon from '@mui/icons-material/Folder';
import { Button, Grid, Stack } from '@mui/material';

const FolderSide = () => {
  return (
    <Grid item xs={12} md={3} m={2} height='100%'>
      <Stack
        py={2}
        px={4}
        height='calc(100% - 1.8rem)'
        borderRadius={4}
        border='1px solid gray'
        overflow='auto'
      >
        <Button
          startIcon={<FolderIcon />}
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'info.main',
              color: 'primary.main',
            },
          }}
        >
          Create New Folder
        </Button>
      </Stack>
    </Grid>
  );
};

export default FolderSide;
