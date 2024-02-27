import { Link, useLocation } from "react-router-dom";
import "./video.css";
import { Publish } from "@material-ui/icons";
import storage from "../../firebase";

import { useContext, useEffect, useState } from "react";
import { VideoContext } from "../../context/videoContext/VideoContext";
import { updateVideo } from "../../context/videoContext/apiCalls";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Video() {
  const location = useLocation();
  const selected_video = location.state.video;

  const [video, setVideo] = useState(selected_video);
  const { dispatch } = useContext(VideoContext);
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null);
  const [upload, setUpload] = useState(false);

  const [err, setErr] = useState({
    "validate_video": ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setVideo({ ...video, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video.title.trim().length === 0) {
      setErr((prevErr) => ({ ...prevErr, validate_video: "Please enter valid Video details!" }));

    } else {
      updateVideo(video, dispatch);
      navigate("/admin/videos")
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const label = e.target.name

    // uploading new file to firebase storage
    const fileName = new Date().getTime() + "_" + e.target.name + "_" + file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(file);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress)
        },
        (error) => {
          console.log(error);
          reject(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setVideo((prev) => {
              return { ...prev, [e.target.name]: url };
            });
            resolve()
            setUpload(true)
          })
        }
      )
    })

    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage
      if (video[label]) {
        const oldFileName = video[label].split("items%2F")[1].split("?")[0]
        const deleteOldFile = storage.ref(`/items/${oldFileName}`);

        //delete old file from firebase storage
        deleteOldFile.delete().then(() => {
          console.log("File deleted successfully")
          resolve()
        }).catch((error) => {
          console.log("Error: ", error)
          reject(error)
        })
      }
    });
  }

  useEffect(() => {
    if (upload) {
      updateVideo(video, dispatch);
      console.log("Video updated in the database: ", video);
      setUpload(false)
    }
  }, [upload]);

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Video</h1>
            <Link to="/admin/newVideo">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={"https://cdn.pixabay.com/photo/2013/07/12/16/56/play-151523_1280.png"} alt="" className="productInfoImg" />
                {/*<img src={video.thumbnail || "https://cdn.pixabay.com/photo/2013/07/12/16/56/play-151523_1280.png"} alt="" className="productInfoImg" /> */}
                <span className="productName">{video.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{video._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">category:</span>
                  <span className="productInfoValue">{video.category}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">year:</span>
                  <span className="productInfoValue">{video.year}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">duration:</span>
                  <span className="productInfoValue">{video.duration}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">type:</span>
                  <span className="productInfoValue">{video.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Video Title</label>
                <input type="text" name="title" value={video.title} onChange={handleChange} placeholder={video.title} />
                {
                  video.title.trim().length === 0 && <span style={{ color: 'red', fontSize: "12px", marginBottom: "10px" }}>Please enter Video Title!</span>
                }
                <label>Description</label>
                <input type="text" name="desc" value={video.desc} onChange={handleChange} placeholder={video.desc} />
                <label>Year</label>
                <input type="text" name="year" value={video.year} onChange={handleChange} placeholder={video.year} />
                <label>Category</label>
                <input type="text" name="category" value={video.category} onChange={handleChange} placeholder={video.category} />
                <label>Duration</label>
                <input type="text" name="duration" value={video.duration} onChange={handleChange} placeholder={video.duration} />
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option value={video.type}>Type</option>
                  <option value="Mandatory">Mandatory</option>
                  <option value="Optional">Optional</option>
                </select>
                <label>Video</label>
                <input type="file" name="video" onChange={handleUpload} placeholder={video.video} />
                {progress
                  && <i>{`File is ${progress} % uploaded`}</i>
                }
                {
                  video.title.trim().length === 0 && err.validate_video && <span style={{ color: 'red', fontSize: "12px", marginTop: "10px" }}>{err.validate_video}</span>
                }
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={video.thumbnail || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                    alt=""
                    name="thumbnail"
                    className="productUploadImg"
                  // onChange={handleUpload}
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" name="thumbnail" onChange={handleUpload} id="file" style={{ display: "none" }} />
                </div>
                {
                  (progress === null || progress === 100) &&
                  <button className="productButton" onClick={handleSubmit}>
                    Update
                  </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}