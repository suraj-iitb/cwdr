import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { db } from "../../firebase";
import "./FieldWorkerList.scss";

export function FieldWorkerList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState([]);
  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = React.useState(0);
  const [selectedWorkerName, setSelectedWorkerName] = React.useState();

  const fetchData = async () => {
    await getDocs(collection(db, "mythri-me")).then((querySnapshot) => {
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
    await deleteDoc(doc(db, "mythri-me", id));
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
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "noOfApplicants", headerName: "No of Applicants", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`}>
              <button className="fieldWorkerEditButton ">Edit</button>
            </Link>
            <DeleteOutline
              className="fieldWorkerDeleteButton"
              onClick={() => handleOpenDialog(params.row.id, params.row.firstName + " " + params.row.lastName)}
            />
          </>
        );
      },
    },
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
