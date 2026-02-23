import { useNavigate } from "react-router";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => navigate('/')}
                > Forum </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <Button color="inherit" onClick={() => navigate('/list-menu')}>List Menu</Button>
                    {/* <Button color="inherit" onClick={() => navigate('/menu/:id')}>List Detail</Button> */}
                    <Button color="inherit" onClick={() => navigate('/create-menu')}>Create Menu</Button>
                    {/* <Button color="inherit" onClick={() => navigate('/update-menu/:id')}>Update Menu</Button>
                    <Button color="inherit" onClick={() => navigate('/delete-menu/:id')}>Delete Menu</Button> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
}