import "./videoList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { VideoContext } from "../../context/videoContext/VideoContext";
import { deleteVideo, getVideos } from "../../context/videoContext/apiCalls";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import storage from "../../firebase";

export default function VideoList() {
  const { videos, dispatch } = useContext(VideoContext);

  useEffect(() => {
    getVideos(dispatch);
  }, [dispatch]);

  const handleDelete = async (id, video) => {
    deleteVideo(id, dispatch);

    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage on delete of video object
      if (video.thumbnail) {
        const oldFileName = video.thumbnail.split("items%2F")[1].split("?")[0]
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

      if (video.video) {
        const oldFileName = video.video.split("items%2F")[1].split("?")[0]
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
    { field: "_id", headerName: "ID", width: 140 },
    {
      field: "video",
      headerName: "Video",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.thumbnail || "https://cdn.pixabay.com/photo/2013/07/12/16/56/play-151523_1280.png"} alt="" /> */}
            <img className="productListImg" src={"https://cdn.pixabay.com/photo/2013/07/12/16/56/play-151523_1280.png"} alt="" />

            {params.row.title}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 150 },
    { field: "year", headerName: "Year", width: 115 },
    { field: "duration", headerName: "Duration", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              // to={{ pathname: "/video/" + params.row._id, video: params.row }}
              to={`/admin/video/${params.row._id}`}
              state={{ video: params.row }} // <-- state prop
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id, params.row)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={videos}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </div>
      </div>
    </>
  );
}
