import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import Host from './Host';
import "./App.css";
import { createTheme, Theme, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const categories = [
  {
    "name": "Frontend Mentor",
    "projects": [
      {
        "name": "QR Code",
        "link": "QR-Component-FM"
      },
      {
        "name": "Product Preview",
        "link": "Product-Preview-FM"
      }
    ]
  },
  {
    "name": "Graphics Project",
    "projects": [
      {
        "name": "Bubbles and Glass",
        "link": "CS114_Final"
      }
    ]
  }
];

type RGBA = [number, number, number, number];

function App() {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const theme: Theme = useMemo(() =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light"
      }
    }), [prefersDarkMode]);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const radialString = (startClr: RGBA, endClr: RGBA) => {
    return `radial-gradient(circle,
      rgba(${startClr[0]},${startClr[1]},${startClr[2]},${startClr[3]}) 0%,
      rgba(${endClr[0]},${endClr[1]},${endClr[2]},${endClr[3]}) 100%)`;
  };

  const lightBkgd: string = radialString([0, 221, 225, 1], [1, 79, 82, 0.73]);
  const darkBkgd: string = radialString([255, 113, 0, 1], [82, 34, 1, 1]);

  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename='/'>
        <Box sx={{ display: 'flex', height: "100vh" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar sx={{ backgroundColor: prefersDarkMode ? "black" : "white" }}>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                <Link className='bare-link' to={"/"}>Paul's Projects</Link>
              </Typography>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Main open={open} sx={{ 
            display: "flex",
            justifyContent: "center",
            background: prefersDarkMode ?
              darkBkgd : lightBkgd,
            height: "100vh" 
          }}>
            <Routes>
              <Route path='/' element={<Homepage />}/>
              <Route path='/:project' element={<Host />}/>
            </Routes>
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              }
            }}
            anchor="right"
            variant='persistent'
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {categories.map((category) => (
              <div className='category'>
                <h3 className='category-title'>{category["name"]}</h3>
                <List>
                  {category["projects"].map((project, idx) => (
                    <ListItem key={idx} disablePadding>
                      <Link to={`${project["link"]}/`}>{project["name"]}</Link>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </div>
            ))}
          </Drawer>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
