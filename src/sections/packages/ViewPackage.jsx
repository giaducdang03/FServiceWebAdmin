// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { products } from 'src/_mock/products';
import PackageSort from './PackageSort';
import PackageCardWidget from './PackageCardWidget';
import PackageCard from './PackageCard';
// import ProductFilters from '../product-filters';

// ----------------------------------------------------------------------

export default function ViewPackage() {

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/packages/new');
  };
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Package</Typography>

        <Button 
        variant="contained"
         color="inherit" 
         startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}>
          New Package
        </Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          

          <PackageSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <PackageCard product={product} />
          </Grid>
        ))}
      </Grid>

      <PackageCardWidget />
    </Container>
  );
}
