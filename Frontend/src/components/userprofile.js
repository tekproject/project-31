import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { fetchUserprofile } from "../redux/actions/users/useractions";

const UserProfiles = (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserprofile());
    }, [dispatch]);

    const userProfile = useSelector((state) => state.userProfile);
    const { users, loading } = userProfile;
    console.log(users)
    const newarray = useMemo(
        () => {
            let a = new Array()
            users && a.push(users)
            return a
        }

    )
    return (
        <div className="container-fluid">
            <Card sx={{
                maxWidth: 600,
                maxHeight: 700,
                marginLeft: 80,
                marginTop: 20,
                color: 'red',

            }}>
                <Avatar sx={{
                    marginLeft: 35
                }} />
                <CardActionArea>

                    {newarray &&
                        newarray.map((user) => (
                            <CardContent key={user.id}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <small className="small">Name: </small>
                                    {user.username}

                                </Typography >
                                <Typography gutterBottom variant="h5" component="div">
                                    <small className="small">Email: </small>
                                    {user.email}

                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <small className="small">Date Of Joined: </small>
                                    {user.date_joined}

                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    <small className="small">Last Login: </small>
                                    {user.last_login}

                                </Typography>
                            </CardContent>
                        ))}

                </CardActionArea>
            </Card>


        </div>

    );
};

export default UserProfiles;
