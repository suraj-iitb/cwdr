import * as React from "react";
import { useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

import { userRows as rows } from "../../data/dummyUserData";
import './UserList.scss'

export function UserList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState(rows);

  let { org } = useParams();
 
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }
  
  const columns = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "dob", headerName: "Date of Birth", width: 200 },
    { field: "aadhar", headerName: "Aadhar", width: 200 },
    { field: "mobile", headerName: "Mobile", width: 200 },
    { field: "billNo", headerName: "Bill No", width: 200 },
    { field: "referenceNo", headerName: "Reference No", width: 200 },
    { field: "dependents", headerName: "Dependents", width: 200 },
    { field: "employed", headerName: "Employed", width: 200 },
    { field: "company", headerName: "Company", width: 200 },
    { field: "occupation", headerName: "Occupation", width: 200 },
    { field: "experiecne", headerName: "Experiecne", width: 200 },
    { field: "fieldWorkerEmail", headerName: "Field Worker Email", width: 200 },
    { field: "nextRenewalDate", headerName: "Next Renewal Date", width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`}>
              <button className="userListEditButton ">Approve</button>
            </Link>
            <Link to={`/user/${params.row.id}`}>
              <button className="userListEditButton ">Edit</button>
            </Link>
            <DeleteOutline className='userListDeleteButton' onClick={() => handleDelete(params.row.id)}/>
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
