import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

import '../packages/CardDetail.css'
const columns = [
    { id: "img", label: "Ảnh", minWidth: 20 },
    { id: "name", label: "Tên", minWidth: 170 },
    { id: "description", label: "Mô tả", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 170 },

];

const rows = [
    {
        id: 1,
        img: "",
        name: "Package 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        action: "",
    }
];

const columns1 = [
    { id: "id", label: "STT", minWidth: 20 },
    { id: "name", label: "Tên", minWidth: 170 },
    { id: "extra", label: "Extra Price", minWidth: 100 },
    { id: "price", label: "Giá", minWidth: 100 },

];

const rows1 = [
    {
        id: 1,
        name: "Service 1",
        extra: "1000$",
        price: '10$'
    }
]; // You should populate this array with your data
const building = [
    { label: 'S101-1PM' },

];


function PackageCardDetail() {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const { id } = useParams();
    const [data, setData] = useState({ packageDetails: [], serviceDetails: [] });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const packageResponse = await axios.get('https://fservices.azurewebsites.net/api/packages');
                setPackages(packageResponse.data);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        };

        fetchPackages();
    }, []); // Dependency array is empty, so this runs once on mount


    useEffect(() => {
        fetchPackage();
    }, []);

    const fetchPackage = async () => {
        try {
            const initialResponse = await config.get(
                `/api/packages/${id}?typeId=${2}`
            );

            if (initialResponse.data && initialResponse.data.packageDetails) {
                const serviceIds = initialResponse.data.packageDetails.map(
                    (pd) => pd.serviceId
                );

                const serviceResponses = await Promise.all(
                    serviceIds.map((id) => config.get(`/api/services/${id}`))
                );
                const services = serviceResponses.map((response) => response.data);
                setData({
                    packageDetails: initialResponse.data.packageDetails,
                    serviceDetails: services,
                });
            }
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the data", error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {/* Image and Title Section */}
            <div className="left-section">

                <div className='picture'>
                    <img src={packages[0]?.image || "path-to-default-image"} alt="Package Image" className="package-image" />
                </div>
                {/* <div>
                    <button className="choose">Choose</button>
                </div> */}
            </div>

            <div className="right-section">
                <table className="title-table" style={{ padding: '100px', fontSize: '20px' }}>
                    <tbody>
                        <tr>
                            <thead>Tên:</thead>
                            <td>
                                Gói thông thường
                            </td>
                        </tr>

                        <tr>
                            <thead>Mô tả:</thead>
                            <td>
                                <td>{packages[0]?.description || "Default Description"}</td>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {/* Source Section */}

            <div className='service'>
                <h3>Service</h3>
                <div className="table container">
                    <div className='service-table'>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.id} style={{ minWidth: column.minWidth, textAlign: column.align }}>
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.serviceDetails.map((service) => (
                                    <tr key={service.id}>
                                        <td><img src={service.image || "path-to-default-image"} alt={service.name} style={{ width: '100px' }} /></td>
                                        <td>{service.name}</td>
                                        <td>{service.description}</td>

                                        {/* <td>
                                          
                                            <button onClick={() => { }}>Update</button>
                                            <button onClick={() => { }}>Delete</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='service-detail'>
                <div className='select' >
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={building}
                        getOptionLabel={(option) => option.label}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label='Chọn tòa nhà' />}
                    />
                </div>
                <div className='table container'>
                    <div className='service-table'>
                        <table >
                            <thead>
                                <tr>
                                    {columns1.map((column1) => (
                                        <th key={column1.id} style={{ minWidth: column1.minWidth, textAlign: column1.align }}>
                                            {column1.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows1.map((row1, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns1.map((column1) => (
                                            <td key={column1.id} style={{ minWidth: column1.minWidth, textAlign: column1.align }}>
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
        </div>

    );
}




export default PackageCardDetail;
