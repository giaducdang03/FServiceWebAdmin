/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Stack, Button, Container, Typography } from '@mui/material';

import { fetchUser } from 'src/services/UserService';

import Iconify from 'src/components/iconify';

// import { formatDate } from 'src/utils/tools';
// import DeleteModal from 'src/sections/listUser/DeleteModal';

function ViewUser() {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataDelete, setDataDelete] = useState('');

  const handleDelete = (item) => {
    setDataDelete(item.id);
    setOpen(true);
  };
  const styles = {
    buttonContainer: {
      display: 'flex',
      gap: '8px',
    },
  };

  const columns = [
    { field: 'name', headerName: 'Tên người dùng', width: 200 },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      type: 'string',
      width: 150,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Ngày sinh',
      type: 'string',
      width: 150,
    },
    { field: 'address', headerName: 'Địa chỉ', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'action',
      headerName: 'Chức năng',
      width: 150,
      renderCell: (params) => (
        <div style={styles.buttonContainer}>
          <Button variant="contained" color="info" size="small">
            Update
          </Button>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    try {
      const res = await fetchUser(page);
      if (res && res.data) {
        const xPaginationHeader = res.headers?.['x-pagination'];
        if (xPaginationHeader) {
          const paginationData = JSON.parse(xPaginationHeader);
          const countUser = paginationData.TotalCount;
          setTotalUser(countUser);
        }
        setListUser(res.data);
      }
    } catch (error) {
      console.log('Error Getting User', error);
    }
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Danh Sách Người Dùng</Typography>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm người dùng
          </Button>
        </Stack>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            style={{ minHeight: '80vh' }}
            rows={listUser}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            rowCount={totalUser}
          />
        </div>
      </Container>
      {/* <DeleteModal /> */}
    </>
  );
}

export default ViewUser;
