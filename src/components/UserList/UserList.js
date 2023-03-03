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
  ];

  useEffect(() => {
    fetchAllUsersData(org).then((response) => {
      const desiredOrder = {
        snehidi: [
          { key: "action", headerName: "Action" },
          { key: "memberID", headerName: "Member ID" },
          { key: "firstName", headerName: "First Name" },
          { key: "lastName", headerName: "Last Name" },
          { key: "dob", headerName: "Date Of Birth" },
          { key: "renewalDate", headerName: "Renewal Date" },
          { key: "address", headerName: "Address" },
          { key: "institutionName", headerName: "Institution Name" },
          { key: "courseName", headerName: "Course Name" },
          { key: "billNo", headerName: "Bill Number" },
          { key: "refNo", headerName: "Reference Number" },
          { key: "fieldStaffName", headerName: "Field Staff Name" },
        ],
        manushi: [
          { key: "action", headerName: "Action" },
          { key: "memberID", headerName: "Member ID" },
          { key: "firstName", headerName: "First Name" },
          { key: "lastName", headerName: "Last Name" },
          { key: "dob", headerName: "Date Of Birth" },
          { key: "renewalDate", headerName: "Renewal Date" },
          { key: "address", headerName: "Address" },
          { key: "phone", headerName: "Phone Number" },
          { key: "aadhar", headerName: "Aadhar Number" },
          { key: "billNo", headerName: "Bill Number" },
          { key: "refNo", headerName: "Reference Number" },
          { key: "fieldStaffName", headerName: "Field Staff Name" },
          { key: "dependants", headerName: "Dependants" },
        ],
        mythri: [
          { key: "action", headerName: "Action" },
          { key: "memberID", headerName: "Member ID" },
          { key: "firstName", headerName: "First Name" },
          { key: "lastName", headerName: "Last Name" },
          { key: "dob", headerName: "Date Of Birth" },
          { key: "renewalDate", headerName: "Renewal Date" },
          { key: "address", headerName: "Address" },
          { key: "phone", headerName: "Phone Number" },
          { key: "aadhar", headerName: "Aadhar Number" },
          { key: "billNo", headerName: "Bill Number" },
          { key: "refNo", headerName: "Reference Number" },
          { key: "fieldStaffName", headerName: "Field Staff Name" },
          { key: "dependants", headerName: "Dependants" },
        ],
      };
      if (response.length > 0) {
        const columns = Object.keys(response?.[0]).map((key) => {
          const desiredColumn = desiredOrder[org].find(
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
            width: 200,
          };
        });

        dataGridCols.push(...columns.filter((column) => column.field !== "id"));
        console.log("snehidiColumns", columns);
        const sortedColumns =
          desiredOrder[org].map((fieldName) => {
            return dataGridCols.find((column) => {
              return column.field === fieldName.key;
            });
          }) || [];
        setGridInfo({ data: response, columns: sortedColumns });
      } else {
        setGridInfo({ data: [], columns: [] });
      }
    });
  }, [org]);

  const handleDelete = async (id) => {
    setDisableForm(true);
    await deleteDoc(doc(db, org, id));
    // fetchData();
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
