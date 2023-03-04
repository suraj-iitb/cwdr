import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container } from '@mui/material';

import { db } from "../../firebase";
import { COLLECTIONS } from '../../constants/constants';

import "./FieldWorkerList.scss";

export function FieldWorkerList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState([]);
  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = React.useState(0);
  const [selectedWorkerName, setSelectedWorkerName] = React.useState();

  const fetchData = async () => {
    await getDocs(collection(db, COLLECTIONS.USER)).then((querySnapshot) => {
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
    await deleteDoc(doc(db, COLLECTIONS.USER, id));
    fetchData();
    setOpenDialog(false);
    setDisableForm(false);
  };

  const handleOpenDialog = (id, fullName) => {
    setSelectedWorkerId(id);
    setSelectedWorkerName(fullName);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <button
              className="fieldWorkerEditButton"
              // onClick={() => handleOpenFormDialog(params.row)}
            >
              <EditOutlined fontSize="small" />
            </button>
            <DeleteOutline
              className="fieldWorkerDeleteButton"
              onClick={() => handleOpenDialog(params.row.id, params.row.firstName + " " + params.row.lastName)}
            />
          </>
        );
      },
    },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "noOfApplicants", headerName: "No of Applicants", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
  ];

  return (
<div style={{ height: 580, width: "100%" }}>

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove this field worker?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove field worker {selectedWorkerName}!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(selectedWorkerId)} color="secondary" disabled={disableForm}>
            Yes
          </Button>
          <Button onClick={() => handleCancelDelete()} color="primary" autoFocus disabled={disableForm}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        className="fieldWorkerListPage"
        rows={data}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        pagination
        disableSelectionOnClick
      />
      </div>
  );
}
