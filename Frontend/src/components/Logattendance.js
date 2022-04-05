import react, { useState, useEffect } from 'react'
import QRCode from "react-qr-code";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { GenerateCode } from "../redux/actions/attendance/attendanceaction";


const Logattendance = () => {
    const [value, setValue] = useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const dispatch = useDispatch();

    const generateCodeDetails = useSelector((state) => state.generateCode);
    const { code } = generateCodeDetails;
    useEffect(() => {
        dispatch(GenerateCode(code));
    }, [dispatch]);
    return (
        <div>
            <h4>Choose Yours !!</h4>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Select a place</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label="Select a place"
                >
                    <MenuItem value="maths">Maths</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="college">College</MenuItem>
                    <MenuItem value="canteen">Canteen</MenuItem>

                </Select>
                {value && (
                    <QRCode
                        title="logs"
                        value={value}
                    />

                )}


            </FormControl>

        </div>
    )
}

export default Logattendance





