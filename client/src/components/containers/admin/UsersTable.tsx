import { IconButton as MuiIconButton, Stack, styled, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PreviewIcon from '@mui/icons-material/Preview';

function createData(name: string, email: string, role: string) {
  return { name, email, role };
}

const rows = [
  createData('John Doe', 'john@gmail.com', 'Admin'),
  createData('Jane Doe', 'jane@gmail.com', 'User'),
];

const TableCell = styled(MuiTableCell)({
  color: 'white !important',
});

const IconButton = styled(MuiIconButton)({
  color: 'white !important',
  padding: 0,
  '&:hover': {
    color: '#B6FFFA !important',
  },
});

export default function UsersTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Role</TableCell>
            <TableCell align='right'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.role}</TableCell>
              <TableCell align='right'>
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                  <Tooltip title='View User Details' placement='top'>
                    <IconButton>
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Edit User Role' placement='top'>
                    <IconButton>
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete User' placement='top'>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
