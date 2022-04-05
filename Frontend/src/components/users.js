import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../src/redux/actions/users/useractions";
import Loading from "./loading";


const Users = () => {
    const [search, setSearch] = useState("");

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
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleInputSearch = (e) => {
        setSearch(e.target.value);
    };

    const usersList = useSelector((state) => state.usersList);
    const { users, loading } = usersList;

    const renderTable = () => {
        if (users) {
            return (

                < TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">UserId</StyledTableCell>
                                <StyledTableCell align="left">UserName</StyledTableCell>
                                <StyledTableCell align="left">UserEmail</StyledTableCell>
                                <StyledTableCell align="left">Date Of Joined</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.filter((user) =>
                                user.username
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                                .map((user) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell>{user.id}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {user.username}
                                        </StyledTableCell>
                                        <StyledTableCell>{user.email}</StyledTableCell>
                                        <StyledTableCell>{user.date_joined}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer >


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
                        List of Users
                    </Typography>
                    <TextField
                        sx={{
                            marginLeft: 200,
                            marginBottom: 2
                        }}
                        id="outlined-basic"
                        label="Search With Name"
                        variant="outlined"
                        value={search}
                        onChange={handleInputSearch} />
                    {loading && <Loading />}
                </div>
            </div>

            <div className="row">
                <div className="col">{renderTable()}</div>
            </div>
        </div>
    );
};

export default Users;







