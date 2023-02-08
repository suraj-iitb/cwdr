import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase";
import "./FieldWorkerList.scss";

export function FieldWorkerList() {
  const [pageSize, setPageSize] = React.useState(10);
  const [data, setData] = useState([]);

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

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 670, width: "100%" }}>
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
