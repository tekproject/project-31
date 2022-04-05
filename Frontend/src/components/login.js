import react, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { useForm } from "react-hook-form";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/users/useractions";


const theme = createTheme()

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const history = useNavigate();
    const dispatch = useDispatch();

    const userLoginDetails = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginDetails;

    useEffect(() => {
        if (userInfo) {
            history("/user-profile");
        }
    }, [dispatch, userInfo, history]);


    function onSubmit() {
        setOpen(true)
        dispatch(loginUser({ username, password }));
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 25,
                        marginBottom: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2, border: '1px dashed grey'
                    }}
                >
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h4">
                        LogIn
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            margin='normal'
                            fullWidth
                            required
                            id='name'
                            type="name"
                            {...register("name", {
                                required: true, maxLength: 10
                            })}
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            label='User Name'
                            name='name'
                            autoComplete='name'
                            autoFocus


                        />

                        {errors.name && errors.name.type === "maxLength" && (
                            <span role="alert" style={{ color: "red", fontStyle: "italic" }}>Minimum of 10 characters</span>
                        )}

                        <TextField
                            margin='normal'
                            fullWidth
                            required
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 8
                            })}
                            id='password'
                            label='Password'
                            name='password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            autoComplete='current-password'
                            autoFocus

                        />
                        {errors.name && errors.name.type === "minLength" && (
                            <span role="alert" style={{ color: "red", fontStyle: "italic" }}>Minimum of 20 characters</span>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            varinat="contained"
                            sx={{ mt: 3 }}
                        >
                            Sign In
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Logged In
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    You Have Logged In!!
                                </Typography>

                            </Box>
                        </Modal>
                    </Box>

                </Box>

            </Container >

        </ThemeProvider >
    )
}

export default Login