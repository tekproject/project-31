import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from "react-redux";
import { getstudentDetail } from "../redux/actions/attendance/attendanceaction";
import { Button } from "@mui/material";

const GetStudentDetail = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const dispatch = useDispatch();
    const time = null;
    const [ctime, setDate] = useState(time);

    const handelTime = () => {
        let time = new Date().toLocaleTimeString();
        setDate(time);
    }

    useEffect(() => {
        dispatch(getstudentDetail());
    }, [dispatch]);

    const getProfile = useSelector((state) => state.getProfile);
    const { users } = getProfile;
    console.log(users)

    const renderTable = () => {
        if (users) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Qr Code</StyledTableCell>
                                <StyledTableCell align="left">Place</StyledTableCell>
                                <StyledTableCell align="left">CheckInTime</StyledTableCell>
                                <StyledTableCell align="left">CheckOutTime</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .map((user) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell>{user.date}</StyledTableCell>
                                        <StyledTableCell>{user.qrCodeId}</StyledTableCell>
                                        <StyledTableCell>{user.place}</StyledTableCell>
                                        <StyledTableCell>{user.checkInTime}</StyledTableCell>
                                        <StyledTableCell>{ctime}</StyledTableCell>
                                        <StyledTableCell>{user.user}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                onClick={handelTime}
                                                style={{ backgroundColor: "darkgray" }}
                                            >
                                                CheckOut
                                            </Button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            );
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col mt-5">
                    <Typography variant="h3" component="h2"
                        sx={{
                            marginTop: 10
                        }}
                    >
                        Know Your Data
                    </Typography>
                </div>
            </div>
            <div className="row">
                <div className="col">{renderTable()}</div>
            </div>
        </div>
    );
};

export default GetStudentDetail;

