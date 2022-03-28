import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/users/useractions";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";



function NavBar() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser());
        history("/");
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Touchless Timesheet Tracker
                    </Typography>
                    {userInfo ?
                        <button onClick={logoutHandler} className="logout">
                            <LogoutIcon />
                        </button>
                        :
                        ""}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar