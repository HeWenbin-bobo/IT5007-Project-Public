import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import PropTypes from 'prop-types';


const user = {
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    city: 'GuangZhou',
    country: 'China',
    jobTitle: 'TBC',
    displayName: 'Katarina Smith',
    timezone: 'GTM-8',
    email: 'test@test.com',
    phone: 'test',
    currentCity: 'GuangZhou',
    cities: [
        {
            value: 'Foshan',
            label: 'Foshan'
        },
        {
            value: 'HK',
            label: 'HK'
        },
        {
            value: 'Beijing',
            label: 'Beijing'
        }
    ],
};


function AccountProfileDetailsContent(props) {

    const values = {
        firstName: props.currentUser.displayName != undefined? props.currentUser.displayName.split(" ").at(0) : user.displayName.split(" ").at(0),
        lastName: props.currentUser.displayName != undefined? props.currentUser.displayName.split(" ").at(1) : user.displayName.split(" ").at(1),
        email: props.currentUser.email != undefined? props.currentUser.email : user.email,
        phone: props.currentUser.phone != undefined? props.currentUser.phone : user.phone,
        country: props.currentUser.country != undefined? props.currentUser.country : user.country,
        currentCity: props.currentUser.currentCity != undefined? props.currentUser.currentCity : user.currentCity,
        cities: props.currentUser.cities != undefined? props.currentUser.cities : user.cities,
    }

    const handleSubmit = (event) => {
        alert("not developed yet!")
    };

    return (
        <form
            autoComplete="off"
            noValidate
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="ProfilePage"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the first name"
                                label="First name"
                                name="firstName"
                                // onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Last name"
                                name="lastName"
                                // onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                // onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                // onChange={handleChange}
                                type="number"
                                value={values.phone}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                // onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Select City"
                                name="City"
                                // onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.currentCity}
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            >
                                {values.cities.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit()}
                    >
                        Save details
                    </Button>
                </Box>
            </Card>
        </form>
    );
};


export class AccountProfileDetails extends React.Component {
    static contextTypes = {
        currentUser: PropTypes.object,
    };

    render() {
        return (
            <AccountProfileDetailsContent currentUser={this.context.currentUser} />
        );
    }
}