import react, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Logattendance from './Logattendance';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function CreateAttendance() {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div >
            {checked === false ? <h4></h4> : < Logattendance />}
            <div hidden={checked ? true : false}>
                <FormGroup
                    sx={{
                        marginTop: 10,
                        marginBottom: 15,
                        marginLeft: 90,
                        marginRight: 90,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontFamily: 'cursive',
                        backgroundColor: 'Navy',
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}
                        label={<span style={{ fontSize: '2rem', color: 'silver' }}>
                            Take Attendance

                        </span>} />
                </FormGroup>

            </div>

        </div>

    );
}

export default CreateAttendance



