import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Check, Clear } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import storage from "../../firebase";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = async (id, user) => {
    deleteUser(id, dispatch);

    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage on delete of user object
      if (user.profile_img) {
        const oldFileName = user.profile_img.split("items%2F")[1].split("?")[0]
        const deleteOldFile = storage.ref(`/items/${oldFileName || ""}`);

        //delete user firebase storage files from firebase storage
        deleteOldFile.delete().then(() => {
          console.log("File deleted successfully")
          resolve()
        }).catch((error) => {
          console.log("Error: ", error)
          reject(error)
        })
      }
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 110  },
    {
      field: "user",
      headerName: "User",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profile_img || ""} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "full_name",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "staff_id",
      headerName: "Staff ID",
      width: 125,
    },
    {
      field: "is_admin",
      headerName: "Admin",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            { params.row.is_admin ? <Check /> : <Clear /> }
          </div>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Active",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.is_active? <Check /> : <Clear />}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/admin/user/" + params.row._id}
              state={{ user: params.row }} // <-- state prop
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id, params.row)}
            />
          </>
        );
      },
    },
  ];
  // columns[0].headerName = (
  //   <span style={{ fontSize: "18px" }}>ID</span>
  // );
  return (
      <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </>
  );
}
