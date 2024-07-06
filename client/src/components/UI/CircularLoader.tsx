import { CircularProgress } from '@mui/material';

const CircularLoader = () => {
  return (
    <CircularProgress
      color='info'
      sx={{
        width: '200px !important',
        height: '200px !important',
      }}
    />
  );
};

export default CircularLoader;
