import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, EditOutlined, DoneOutline } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { db } from "../../firebase";
import "./UserList.scss";
import FieldWorkerRoot from "../FieldWorkerForms/FieldWorker.root";
import { fetchAllUsersData } from "../../firebase/commonUtil";

export function UserList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState([]);
  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [selectedUserName, setSelectedUserName] = React.useState();
  const [selectedRowData, setselectedRowData] = useState([]);

  const [openFormDialog, setOpenFormDialog] = React.useState(false);

  let { org } = useParams();
  const fetchData = async () => {
    fetchAllUsersData(org).then((response) => {
      setData(response);
      console.log(data, response);
    });
    // await getDocs(collection(db, org)).then((querySnapshot) => {
    //   const newData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setData(newData);
    //   console.log(data, newData);
    // });
  };

  useEffect(() => {
    fetchData();
  }, [org]);

  const handleDelete = async (id) => {
    setDisableForm(true);
    await deleteDoc(doc(db, org, id));
    fetchData();
    setOpenDialog(false);
    setDisableForm(false);
  };

  const handleOpenDialog = (id, fullName) => {
    setSelectedUserId(id);
    setSelectedUserName(fullName);
    setOpenDialog(true);
  };
  const handleOpenFormDialog = (rowData) => {
    setselectedRowData(rowData);
    setOpenFormDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className="userListDoneButton ">
              <DoneOutline fontSize="small" />
            </button>
            <button
              className="userListEditButton"
              onClick={() => handleOpenFormDialog(params.row)}
            >
              <EditOutlined fontSize="small" />
            </button>
            <DeleteOutline
              className="userListDeleteButton"
              onClick={() =>
                handleOpenDialog(
                  params.row.id,
                  params.row.firstName + " " + params.row.lastName
                )
              }
            />
          </>
        );
      },
    },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: (params) => params.row.address.addLine1,
    },
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
  ];

  return (
    <div style={{ height: 670, width: "100%" }}>
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <FieldWorkerRoot
            org={selectedRowData.org}
            showHeader={false}
            memberID={selectedRowData.memberID}
          />
        </DialogContent>
      </Dialog>
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
          <Button
            onClick={() => handleDelete(selectedUserId)}
            color="secondary"
            disabled={disableForm}
          >
            Yes
          </Button>
          <Button
            onClick={() => handleCancelDelete()}
            color="primary"
            autoFocus
            disabled={disableForm}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        className="userListPage"
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
