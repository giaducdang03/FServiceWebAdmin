import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
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
]; // You should populate this array with your data

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
    return (
        <div className="container">
            {/* Image and Title Section */}
            <div className="left-section">

                <div className='picture'>
                    <img src="path-to-your-image" alt="Your Image" className="package-image" />
                </div>
                <div>
                    <button className="choose">Choose</button>
                </div>
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
                                Description
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>

            {/* Source Section */}
            <div>
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
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column) => (
                                            <td key={column.id} style={{ minWidth: column.minWidth, textAlign: column.align }}>
                                                {row[column.id]}
                                            </td>
                                        ))}
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
        </div>

    );
}




export default PackageCardDetail;
