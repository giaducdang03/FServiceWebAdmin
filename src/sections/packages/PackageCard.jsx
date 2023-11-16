import PropTypes from 'prop-types';
import {  UseNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { fCurrency } from 'src/utils/format-number';


// ----------------------------------------------------------------------

export default function packageItemCard({ packageItem }) {
const navigate = UseNavigate();

  const handleClick = () => {
    navigate(`/packages/detail/${packageItem.id}`);
  }

  const renderImg = (
    <Box
      component="img"
      alt={packageItem.name}
      src={packageItem.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {/* <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
     
      </Typography>
      &nbsp; */}
      {/* {fCurrency(packageItem.price)} */}
      {packageItem.price}
    </Typography>
  );

  return (
    <Card    onClick = {handleClick}  > 
      <Box sx={{ pt: '100%', position: 'relative' }}>
       

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        
          {packageItem.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

packageItemCard.propTypes = {
  packageItem: PropTypes.object,
};
