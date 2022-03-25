import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'


const theme = createTheme()

export default function Login({ handleSubmit, errors, onChange }) {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        marginBottom: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'secondary.main'
                    }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" varinat="h5">
                        LogIn
                    </Typography>
                    <Box component="form" onSubmit={e => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            fullWidth
                            required
                            id='email'
                            type="email"
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={e => onChange(e)}
                            error={!errors.email ? false : true}
                            helperText={errors.email ? '' : errors.email}
                        />

                        <TextField
                            margin='normal'
                            fullWidth
                            required
                            type="password"
                            id='password'
                            label='Password'
                            name='password'
                            autoComplete='current-password'
                            autoFocus
                            onChange={e => onChange(e)}
                            error={!errors.password ? false : true}
                            helperText={errors.password ? '' : errors.password}
                        />

                        {errors.authFail && <Alert severity='error'>{errors.authFail}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            varinat="contained"
                            sx={{ mt: 3 }}
                        >
                            Sign In
                        </Button>
                    </Box>

                </Box>

            </Container>

        </ThemeProvider>
    )
}