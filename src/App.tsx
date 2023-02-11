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
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import Work from './Work';

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
    "name": "Work Experience",
    "projects": [
      {
        "name": "AutoCAD Trace",
        "link": "work",
        "idx": 0
      },
    ]
  },
  {
    "name": "Frontend Mentor",
    "projects": [
      {
        "name": "QR Code",
        "link": "project/QR-Component-FM",
        "idx": 1
      },
      {
        "name": "Product Preview",
        "link": "project/Product-Preview-FM",
        "idx": 2
      }
    ]
  },
  {
    "name": "Graphics Project",
    "projects": [
      {
        "name": "Bubbles and Glass",
        "link": "project/CS114_Final",
        "idx": 3
      }
    ]
  }
];

type RGBA = [number, number, number, number];

function App() {
  const prefersDarkMode: boolean = useMediaQuery("(prefers-color-scheme: dark)");
  const isDesktop: boolean = useMediaQuery("(min-width: 800px)");
  const theme: Theme = useMemo(() =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light"
      }
    }), [prefersDarkMode]);
  const [open, setOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(() => {
    const initVal = localStorage.getItem("selected") || "-1";
    return Number(initVal);
  });

  useEffect(() => {
    localStorage.setItem("selected", String(selectedProject));
  }, [selectedProject]);

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

  const lightBkgd: string = radialString([0, 221, 225, .5], [1, 79, 82, .2]);
  const darkBkgd: string = radialString([255, 113, 0, 1], [82, 34, 1, 1]);

  const setSelectedFactory = (idx: number) => {
    return () => {
      setSelectedProject(idx);
    };
  };

  const onlyProjects = () => {
    const projects = [];
    for (const cat of categories)
      projects.push(...cat["projects"]);
    return projects;
  };

  const isSelected = (idx: number) => 
    selectedProject === idx;

  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename='/'>
        <Box sx={{ display: 'flex', height: "100vh" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar sx={{ 
              backgroundColor: 
                prefersDarkMode ? "black" : "white",
              width: "100vw"
            }}>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }} component="div">
                <Link 
                  onClick={setSelectedFactory(-1)}
                  className='bare-link' 
                  to={"/"}
                >
                  Paul's Projects
                </Link>
                <div className='project-links'>
                  {isDesktop ? onlyProjects().map((project, idx) =>
                    <Link
                      key={idx}
                      onClick={setSelectedFactory(idx)}
                      className={
                        `bare-link
                        link
                        ${isSelected(idx) ? "sel-link" : "not-sel-link"}`
                      }
                      to={`${project["link"]}/`}
                    >
                      {project["name"]}
                    </Link>
                  ) : ""}
                </div>
              </Typography>
              { !isDesktop ?
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton> : ""}
            </Toolbar>
          </AppBar>
          <Main open={open} sx={{ 
            display: "flex",
            justifyContent: "center",
            background: prefersDarkMode ?
              darkBkgd : lightBkgd,
            // Use the styling from the styled component.
            margin: isDesktop ? 0 : "",
            overflowY: "auto"
          }}>
            <Routes>
              <Route path='/' element={<Homepage />}/>
              <Route path='/work' element={<Work />}/>
              <Route path='/project/:project' element={<Host />}/>
            </Routes>
          </Main>
          <Drawer
            sx={{
              display: isDesktop ? "none" : "flex",
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
            {categories.map((category, idx) => (
              <div key={idx} className='category'>
                <h3 className='category-title'>{category["name"]}</h3>
                <Divider />
                <List disablePadding dense>
                  {category["projects"].map((project) => (
                    <ListItem 
                      key={project["idx"]}
                      onClick={setSelectedFactory(project["idx"])}
                      className={"item"}
                      disablePadding
                    >
                      <Link className={`bare-link link ${isSelected(project["idx"]) ? "sel-link" : "not-sel-link"}`} to={`${project["link"]}/`}>{project["name"]}</Link>
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
