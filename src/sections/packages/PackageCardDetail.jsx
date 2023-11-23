/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import config from 'src/utils/cus-axios';

import './CardDetail.css';
import { Container } from '@mui/material';

const columns = [
  { id: 'img', label: 'Ảnh', minWidth: 20 },
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'description', label: 'Mô tả', minWidth: 100 },
];

const columns1 = [
  { id: 'id', label: 'STT', minWidth: 20 },
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'extra', label: 'Extra Price', minWidth: 100 },
  { id: 'price', label: 'Giá', minWidth: 100 },
];

const rows1 = [
  {
    id: 1,
    name: 'Service 1',
    extra: '1000$',
    price: '10$',
  },
]; // You should populate this array with your data
const building = [{ label: 'S101-1PM' }];

function PackageCardDetail() {
  //   const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({ packageDetails: [], serviceDetails: [] });
  const [setLoading] = useState(true);

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
    try {
      const initialResponse = await config.get(`/api/packages/${id}?typeId=1`);
      setPackages(initialResponse.data);

      if (initialResponse.data && initialResponse.data.packageDetails) {
        const serviceIds = initialResponse.data.packageDetails.map((pd) => pd.serviceId);

        const serviceResponses = await Promise.all(
          serviceIds.map((ids) => config.get(`/api/services/${ids}`))
        );
        const services = serviceResponses.map((response) => response.data);
        setData({
          packageDetails: initialResponse.data.packageDetails,
          serviceDetails: services,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the data', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Image and Title Section */}
      <div className='columns-2'>
        <div className="title-section" style={{ padding: '30px', fontSize: '20px' }}>
          <div className="title-item">
            <h4>Tên:</h4> {packages?.name || 'Default Name'}
          </div>
          <div className="title-item">
            <h4>Mô tả:</h4> {packages?.description || 'Default Description'}
          </div>
        </div>
        <div className="picture">
          <img src={packages?.image} alt="" className="package-image" />
        </div>
      </div>

      {/* Source Section */}

      <div className="service">
        <h2>Dịch Vụ</h2>
        <div className="table container">
          <div className="service-table">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      style={{ minWidth: column.minWidth, textAlign: column.align }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.serviceDetails.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <img
                        src={service.image || 'path-to-default-image'}
                        alt={service.name}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="service-detail">
        <div className="select">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={building}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Chọn tòa nhà" />}
          />
        </div>
        <div className="table container">
          <div className="service-table">
            <table>
              <thead>
                <tr>
                  {columns1.map((column1) => (
                    <th
                      key={column1.id}
                      style={{ minWidth: column1.minWidth, textAlign: column1.align }}
                    >
                      {column1.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows1.map((row1, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns1.map((column1) => (
                      <td
                        key={column1.id}
                        style={{ minWidth: column1.minWidth, textAlign: column1.align }}
                      >
                        {row1[column1.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PackageCardDetail;
