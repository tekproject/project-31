import * as React from 'react';
import Button from '@mui/material/Button'


const Attendance = () => {
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                varinat="contained"
                sx={{ mt: 3 }}
            >
                Create Attendance
            </Button>
        </div>
    )
}

export default Attendance