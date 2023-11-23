import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify/iconify';

import PackageSort from './PackageSort';
import PackageCard from './PackageCard';
import PackageCardWidget from './PackageCardWidget';

// ----------------------------------------------------------------------

export default function ViewPackage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://fservices.azurewebsites.net/api/packages');
        console.log(response.data);
        setPackages(response.data); // Assuming the API returns an array
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleAdd = () => {
    navigate('/packages/new');
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gói dịch vụ</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
        >
          Thêm gói dịch vụ
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
        {packages.map((packageItem) => (
          <Grid key={packageItem.id} xs={12} sm={6} md={3}>
            <PackageCard packageItem={packageItem} />
          </Grid>
        ))}
      </Grid>

      <PackageCardWidget />
    </Container>
  );
}
