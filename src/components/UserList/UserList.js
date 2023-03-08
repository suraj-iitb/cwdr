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
import { useDispatch, useSelector } from "react-redux";

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
import FieldWorkerRoot from "../FieldWorkerForms/FieldWorkerRoot";
import { fetchAllUsersData, updateData } from "../../firebase/commonUtil";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { setOpenEditDialog } from "../../redux/slices/openEditDialogSlice";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export function UserList() {
  const openEditDialog = useSelector((state) => state.openEditDialogReducer.value);

  const dispatch = useDispatch();
  const [pageSize, setPageSize] = React.useState(10);
  const [gridInfo, setGridInfo] = useState({ data: [], columns: [] });

  const [disableForm, setDisableForm] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(0);
  const [selectedUserName, setSelectedUserName] = React.useState();
  const [selectedRowData, setselectedRowData] = useState([]);

  // const [openFormDialog, setOpenFormDialog] = React.useState(false);

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
    console.log(id)
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
    console.log(id)
    setSelectedUserId(id);
    setSelectedUserName(fullName);
    setOpenDialog(true);
  };
  const handleOpenFormDialog = (rowData) => {
    console.log(rowData, openEditDialog)
    setselectedRowData(rowData);
    dispatch(setOpenEditDialog(true));
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleFormClose = () => {
    dispatch(setOpenEditDialog(false));
  };

  return (
    <div style={{ height: 580, width: "100%" }}>
      <Dialog
        open={openEditDialog}
        onClose={handleFormClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <BootstrapDialogTitle id="customized-dialog-title" onClose={handleFormClose}>
          Edit User
        </BootstrapDialogTitle>
        <DialogContent dividers>
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
