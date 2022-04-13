import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import PropTypes from 'prop-types';
import GenerateTypes from '../../GenerateTypes';

function BuyOrderTypeContent(props) {
    return (
        <React.Fragment>
            <Box sx={{ minWidth: 120 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Buy
                </InputLabel>
                <FormControl fullWidth>
                    <NativeSelect
                        defaultValue='Limit'
                        inputProps={{
                            name: 'age',
                            id: 'BuyOrderType',
                        }}
                    >
                        {GenerateTypes([{id:'Limit',typeName:'Limit'}, {id:'Market',typeName:'Market'}])}
                    </NativeSelect>
                </FormControl>
            </Box>
        </React.Fragment>
    );
}

export default class BuyOrderType extends React.Component {
    constructor() {
        super();
    }

    /*
    static contextTypes = {
        types: PropTypes.array,
    };
    */

    render() {
        return <BuyOrderTypeContent types={this.context.types}/>;
    }
}