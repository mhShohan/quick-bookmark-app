import CircularLoader from '@/components/UI/CircularLoader';
import { Stack } from '@mui/material';

const loading = () => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(15, 21, 28, 0.7)',
      }}
    >
      <CircularLoader />
    </Stack>
  );
};

export default loading;
