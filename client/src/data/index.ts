import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ApiIcon from '@mui/icons-material/Api';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

export const navbarData = [
  { id: 1, name: 'Login', path: '/login' },
  { id: 2, name: 'Register', path: '/register' },
]


export const sidebarData = [
  { id: '1', name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { id: '3', name: 'Technologies', icon: ApiIcon, path: '/dashboard/technologies' },
  { id: '2', name: 'Educations', icon: SchoolIcon, path: '/dashboard/educations' },
  { id: '4', name: 'Experiences', icon: BackupTableIcon, path: '/dashboard/experiences' },
  { id: '5', name: 'Projects', icon: BeenhereIcon, path: '/dashboard/projects' },
  { id: '6', name: 'Create Blog', icon: BookIcon, path: '/dashboard/blogs' },
  { id: '7', name: 'Update Profile', icon: AccountCircleIcon, path: '/dashboard/profile' },
];

