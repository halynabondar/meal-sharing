import {
    AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,
    ListItemText, Button, useMediaQuery, useTheme
} from '@mui/material';
import React, {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNavigation = (path) => {
        try {
            navigate(path);
            setDrawerOpen(false);
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    const menuItems = [
        {text: 'Home', path: '/'},
        {text: 'Meals', path: '/meals'},
        {text: 'About Us', path: '/aboutUs'}
    ];

    const renderMenuItem = (item) => (
        <ListItem button key={item.text} onClick={() => handleNavigation(item.path)}>
            <ListItemText primary={item.text}/>
        </ListItem>
    );

    return (
        <AppBar position="fixed" sx={{backgroundColor: '#313131', color: 'white', height: '80px'}}>
            <Toolbar sx={{ height: '100%', display: 'flex', justifyItems: 'center', alignItems: 'center'}} >
                <Typography onClick={handleBackHome} variant="h6" sx={{flexGrow: 1, fontFamily: "Great Vibes", fontSize: 32, cursor: 'pointer'}}>
                    Meal Sharing
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            <List>
                                {menuItems.map(renderMenuItem)}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    menuItems.map((item) => (
                        <Button sx={{ alignSelf: 'center', '&:hover': {
                                backgroundColor: '#525252'}, }} color="inherit" key={item.text} onClick={() => handleNavigation(item.path)}>
                            {item.text}
                        </Button>
                    ))
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;