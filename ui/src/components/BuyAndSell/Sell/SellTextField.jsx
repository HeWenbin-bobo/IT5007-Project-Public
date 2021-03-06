import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

function InputAdornmentsContent(props) {
  const [values, setValues] = React.useState({
    quantity: 0,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
            <FormControl sx={{ m: 1, width: '25ch', p: 1, mx: 'auto', }} variant="outlined">
                <OutlinedInput
                    id="quantity"
                    value={values.quantity}
                    onChange={handleChange('quantity')}
                    endAdornment={<InputAdornment position="end">Quantity</InputAdornment>}
                    aria-describedby="outlined-quantity-helper-text"
                    inputProps={{
                    'aria-label': 'quantity',
                    }}
                />
            </FormControl>
        </div>
    </Box>
  )
}

export default class SellTextField extends React.Component {
  constructor() {
      super();
  }

  static contextTypes = {
    types: PropTypes.array,
  };

  render() {
    return <InputAdornmentsContent types={this.context.types}/>;
  }
}