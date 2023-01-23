import * as React from "react";
import { useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { userRows as rows } from "../data/dummyFieldWorkerData";
import './FieldWorkerList/FieldWorkerList.scss'

export function DownloadData() {
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = useState(rows);
  
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }
  
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
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
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </div>
  );
}
