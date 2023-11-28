import { useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Stack, Button, Container, Typography } from '@mui/material';

import { getService } from 'src/services/UserService';

import Iconify from 'src/components/iconify';

export default function ViewPackage() {
  const columns = [
    { field: 'name', headerName: 'Tên dịch vụ', width: 130 },
    {
      field: 'description',
      headerName: 'Mô tả',
      type: 'string',
      width: 90,
    },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      type: 'string',
      width: 160,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  useEffect(() => {
    getListService();
  }, []);

  const getListService = async () => {
    try {
      const res = await getService();
      console.log('check service', res.data);
    } catch (error) {
      console.log('Error Getting Service', error);
    }
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Dịch vụ</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Dịch vụ mới
        </Button>
      </Stack>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
