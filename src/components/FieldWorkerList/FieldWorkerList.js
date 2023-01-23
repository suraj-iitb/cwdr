import * as React from "react";
import { useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { userRows as rows } from "../../data/dummyFieldWorkerData";
import './FieldWorkerList.scss'

export function FieldWorkerList() {
  const [pageSize, setPageSize] = React.useState(10);

  const [data, setData] = useState(rows);
  
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }
  
  const columns = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "noOfApplicants", headerName: "No of Applicants", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`}>
              <button className="editButton ">Edit</button>
            </Link>
            <DeleteOutline className='deleteButton' onClick={() => handleDelete(params.row.id)}/>
          </>
        )
      }
    }
  ];

  return (
    <div style={{ height: 670, width: "100%" }}>
      <DataGrid
        className='userListPage'
        rows={data}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        pagination
      />
    </div>
  );
}
