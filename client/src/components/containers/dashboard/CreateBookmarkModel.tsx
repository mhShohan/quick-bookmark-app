import CustomForm from '@/components/shared/form/CustomForm';
import CustomInput from '@/components/shared/form/CustomInput';
import CustomSelectField from '@/components/shared/form/CustomSelect';
import { useAddNewBookmarkMutation } from '@/store/api/bookmark.api';
import { useAddNewFolderMutation } from '@/store/api/folder.api';
import { IFolder } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const defaultValues = {
  title: '',
  link: '',
  folderId: '',
  type: '',
  tags: '',
};

const validationSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters'),
  link: z.string({ required_error: 'Link is required' }).min(1, 'Link is required'),
  folderId: z.string({ required_error: 'Folder is required' }).min(1, 'Folder is required'),
  type: z.string({ required_error: 'Type is required' }).min(1, 'Type is required'),
  tags: z.string().optional(),
});

interface CreateBookmarkModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  folders?: IFolder[];
}

const CreateBookmarkModel = ({ open, setOpen, folders }: CreateBookmarkModelProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [addBookmark] = useAddNewBookmarkMutation();

  const handleSubmit = async (data: any) => {
    const payload = { ...data, tags: data.tags.split(',') };
    try {
      setIsLoading(true);
      const res = await addBookmark(payload).unwrap();

      if (res.success) {
        toast.success('Bookmark created successfully');
        setOpen(false);
        return true;
      }
    } catch (error) {
      toast.error('Failed to create Bookmark');
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
        <DialogTitle>Add new bookmark</DialogTitle>
        <DialogContent>
          <CustomForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(validationSchema)}
          >
            <Stack my={1} spacing={1} minWidth='350px'>
              <CustomInput label='Title' name='title' />
              <CustomInput label='Bookmark Link' name='link' />
              <CustomInput
                label='Tags'
                name='tags'
                placeholder='Example(give comma between tags): React, nodejs, express.js ....'
              />
              <CustomSelectField
                label='Select a folder'
                name='folderId'
                items={folders?.map((folder) => ({ name: folder.name, value: folder._id })) || []}
              />
              <CustomSelectField
                label='Bookmark Type'
                name='type'
                items={['video', 'blog', 'book', 'documentation'].map((t) => ({
                  name: t,
                  value: t,
                }))}
              />
              <Button type='submit'>{isLoading ? 'Adding new bookmark...' : 'Add Bookmark'}</Button>
            </Stack>
          </CustomForm>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateBookmarkModel;
