import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDeleteBookmarkMutation } from '@/store/api/bookmark.api';
import { toast } from 'sonner';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

interface TransitionsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export default function DeleteBookmarkModal({ open, id, setOpen }: TransitionsModalProps) {
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await deleteBookmark(id).unwrap();

      if (res.success) {
        toast.success('Bookmark deleted successfully');
        handleClose();
      }
    } catch (error) {
      toast.error('Failed to delete bookmark');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} display='flex' flexDirection='column' alignItems='center'>
            <Typography id='transition-modal-title' variant='h6'>
              Are you sure?
            </Typography>
            <Typography id='transition-modal-description'>
              You want to delete this bookmark?
            </Typography>
            <Box mt={2} display='flex' gap={1}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant='outlined'
                sx={{
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
                onClick={() => handleDelete(id)}
              >
                {isLoading ? (
                  <CircularProgress
                    color='warning'
                    sx={{
                      width: '25px !important',
                      height: '25px !important',
                    }}
                  />
                ) : (
                  'Delete'
                )}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
