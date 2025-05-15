import { useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// https://baseweb.design/components/button/
import { Button as BaseButton } from "baseui/button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { createTheme, Theme, useMediaQuery } from "@mui/material";
import { scroller, Element, Link } from 'react-scroll';
import Homepage from "./homepage";
import Host from "./Host";
import "./App.css";
import { Category, Project } from "./types";
import NavigateButton from "./NavigateButton";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
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
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const categories: Category[] = [
  {
    name: "Personal Projects",
    projects: [
      {
        name: "Hidden Gems",
        link: "HiddenGems",
        external: false,
        idx: 0,
      },
      {
        name: "AI Teacher",
        link: "AI_Teacher",
        external: false,
        idx: 1,
      },
      {
        name: "Wolfie's Escape",
        link: "WolfiesEscape",
        external: false,
        idx: 2,
      },
      {
        name: "3D Raymarching",
        link: "CS114_Final",
        external: false,
        idx: 3,
      },
    ],
  },
];

type RGBA = [number, number, number, number];

function App() {
  const prefersDarkMode: boolean = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const isDesktop: boolean = useMediaQuery("(min-width: 800px)");
  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const [open, setOpen] = useState(false);
  const [atHome, setAtHome] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const radialString = (
    startClr: RGBA,
    endClr: RGBA
  ) => `radial-gradient(circle,
      rgba(${startClr[0]},${startClr[1]},${startClr[2]},${startClr[3]}) 0%,
      rgba(${endClr[0]},${endClr[1]},${endClr[2]},${endClr[3]}) 50%)`;

  const lightBkgd: string = radialString([1, 79, 82, 0.5], [0, 221, 225, 0.2]);
  const darkBkgd: string = radialString([255, 113, 0, 1], [0, 0, 0, 1]);

  const setSelected = (to: string) => {
    setAtHome(to === 'home');
  };

  const onlyProjects = () => {
    const projects: Project[] = [];
    categories.forEach((cat) => projects.push(...cat.projects));
    return projects;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{marginBottom: "5em" }}>
          <Toolbar
            sx={{
              backgroundColor: prefersDarkMode ? "black" : "white",
              width: "100vw",
            }}
          >
            <BaseButton className='skip-link' href="#main">Skip to Main Content</BaseButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
              component="div"
            >
              <Link
                tabIndex={0}
                spy
                smooth
                offset={-100}
                className="bare-link title"
                to="home"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSelected("home");
                    scroller.scrollTo("home", {
                      smooth: true
                    });
                  }
                }}
                onSetActive={setSelected}
              >
                {!atHome ? "Paul's Projects" : "Home"}
              </Link>
              <div className="project-links">
                {isDesktop
                  ? onlyProjects().map((project, idx) => (
                      <Link
                        key={idx}
                        onSetActive={setSelected}
                        tabIndex={0}
                        spy
                        smooth
                        offset={-100}
                        activeClass="sel-link"
                        className="bare-link link"
                        to={project.link}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSelected(project.link);
                            scroller.scrollTo(project.link, {
                              smooth: true
                            });
                          }
                        }}
                      >
                        {project.name}
                      </Link>
                    ))
                  : ""}
              </div>
            </Typography>
            {!isDesktop ? (
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDrawerOpen();
                  }
                }}
                sx={{ ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
        <NavigateButton
          route="/blog"
          left={false}
          light={!prefersDarkMode}
          label="Go to Blog"
        />
        <Main
          id="main"
          open={open}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: prefersDarkMode ? darkBkgd : lightBkgd,
            // Use the styling from the styled component.
            margin: isDesktop ? 0 : "",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
            <Element name="home">
              <Homepage />
            </Element>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10em",
              marginTop: "10em",
              marginBottom: "10em",
              placeContent: "center",
            }}>
              {onlyProjects().map((project, idx) => (
                <Element key={idx} name={project.link} style={{ zIndex: 2 }}>
                  <Host project={project} />
                </Element>
              ))}
            </div>
        </Main>
        <Drawer
          sx={{
            display: isDesktop ? "none" : "flex",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          anchor="right"
          variant="persistent"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {categories.map((category, idx) => (
            <div key={idx} className="category">
              <h3 className="category-title title">{category.name}</h3>
              <Divider />
              <List disablePadding dense>
                {category.projects.map((project, pidx) => (
                  <ListItem
                    key={pidx}
                    className="item"
                    disablePadding
                  >
                    <Link
                      tabIndex={0}
                      className="bare-link link"
                      onSetActive={setSelected}
                      spy
                      smooth
                      activeClass="sel-link"
                      to={project.link}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelected(project.link);
                          scroller.scrollTo(project.link, {
                            smooth: true
                          });
                        }
                      }}
                    >
                      {project.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          ))}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
