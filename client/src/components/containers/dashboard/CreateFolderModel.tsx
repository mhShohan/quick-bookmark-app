import { useAddNewFolderMutation } from '@/store/api/folder.api';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { toast } from 'sonner';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface CreateFolderModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFolderModel = ({ open, setOpen }: CreateFolderModelProps) => {
  const [folderName, setFolderName] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addFolder] = useAddNewFolderMutation();

  const handleSubmit = async () => {
    if (!folderName) {
      setError('Folder name is required');
      return;
    }
    if (folderName.length < 3) {
      setError('Folder name should be atleast 3 characters');
      return;
    }
    try {
      setIsLoading(true);
      const res = await addFolder({ name: folderName }).unwrap();

      if (res.success) {
        toast.success('Folder created successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error('Failed to create folder');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Create New folder to save bookmark</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            label='Folder Name'
            type='text'
            variant='outlined'
            color='primary'
            size='small'
            fullWidth
            placeholder='Folder Name'
            required
            error={!!error}
            helperText={error}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>{isLoading ? 'Creating...' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateFolderModel;
