import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { db } from "../../firebase";
import './UserList.scss'

export function UserList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState([]);
  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [selectedUserName, setSelectedUserName] = React.useState();

  let { org } = useParams();

  const fetchData = async () => {
    await getDocs(collection(db, "mythri1")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
      console.log(data, newData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDisableForm(true);
    await deleteDoc(doc(db, "mythri1", id));
    fetchData();
    setOpenDialog(false);
    setDisableForm(false);
  };

  const handleOpenDialog = (id, fullName) => {
    setSelectedUserId(id);
    setSelectedUserName(fullName);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };
  
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
            <DeleteOutline className='userListDeleteButton' onClick={() => handleOpenDialog(params.row.id, params.row.firstName + " " + params.row.lastName)} />
          </>
        )
      }
    }
  ];

  return (
    <div style={{ height: 670, width: "100%" }}>
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove user {selectedUserName}!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(selectedUserId)} color="secondary" disabled={disableForm}>
            Yes
          </Button>
          <Button onClick={() => handleCancelDelete()} color="primary" autoFocus disabled={disableForm}>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
