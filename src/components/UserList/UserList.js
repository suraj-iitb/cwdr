import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  DeleteOutline,
  EditOutlined,
  DoneOutline,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { getNextMemberId, encrypt, decrypt, retrieveDoc } from "../../firebase";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { usersListGridOrder } from "../../constants/constants";
import { db } from "../../firebase";
import "./UserList.scss";
import FieldWorkerRoot from "../FieldWorkerForms/FieldWorker.root";
import { fetchAllUsersData, updateData } from "../../firebase/commonUtil";

export function UserList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [gridInfo, setGridInfo] = useState({ data: [], columns: [] });

  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [selectedUserName, setSelectedUserName] = React.useState();
  const [selectedRowData, setselectedRowData] = useState([]);

  const [openFormDialog, setOpenFormDialog] = React.useState(false);

  let { org } = useParams();
  const dataGridCols = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userListDoneButton"
              onClick={() => handleApproval(params.row)}
            >
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
  ];

  useEffect(() => {
    fetchAllUsersData(org).then(async (response) => {
      if (response.length > 0) {
        const columns = Object.keys(response?.[0]).map((key) => {
          const desiredColumn = usersListGridOrder[org].find(
            (column) => column.key === key
          );
          return {
            field: key,
            headerName: desiredColumn
              ? desiredColumn.headerName
              : key.charAt(0).toUpperCase() + key.slice(1),
            ...(key === "address" && {
              valueGetter: (params) => params.row.address.addLine1,
            }),
            cellClassName: (params) =>
            params.row.approved ? 'approved-row' : '',
            width: 200,
          };
        });
        dataGridCols.push(...columns.filter((column) => column.field !== "id"));
        const sortedColumns =
          usersListGridOrder[org].map((fieldName) => {
            return dataGridCols.find((column) => {
              return column.field === fieldName.key;
            });
          }) || [];
          for (let i = 0; i < response.length; i++) {
            const decryptedAadhar =  await decrypt({cipherText: response[i].aadhar});
            response[i].aadhar = decryptedAadhar.data.originalText;
          }
        setGridInfo({ data: response, columns: sortedColumns });
      } else {
        setGridInfo({ data: [], columns: [] });
      }
    });
  }, [org]);

  const handleApproval = (rowData) => {
    rowData = { ...rowData, approved: true };
    updateData(rowData.id, rowData, org)
      .then(() => {
        setGridInfo((prevState) => ({
          ...prevState,
          data: prevState.data.map((row) => {
            if (row.id === rowData.id) {
              console.log('here')
              return {
                ...row,
                approved: true,
              };
            }
            return row;
          }),
        }));
      })
      .catch((err) => {
        console.log("Could not update approval status!", err);
      });
  };

  const handleDelete = async (id) => {
    setDisableForm(true);
    deleteDoc(doc(db, org, id)).then(() => {
      setGridInfo((prevState) => ({
        ...prevState,
        data: prevState.data.filter((row) => row.id !== id),
      }));
      setOpenDialog(false);
      setDisableForm(false);
    });
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

  return (
    <div style={{ height: 580, width: "100%" }}>
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
        rows={gridInfo.data}
        columns={gridInfo.columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
        pagination
      />
    </div>
  );
}
