import * as React from "react";
import { useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { userRows as rows } from "../../data/dummyUserData";
import './UserData.scss'

export function UserData() {
  const [pageSize, setPageSize] = React.useState(5);

  const [data, setData] = useState(rows);
  
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }
  
  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
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
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        className='userListPage'
        rows={data}
        columns={columns}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25, 50]}
        pagination
      />
    </div>
  );
}
