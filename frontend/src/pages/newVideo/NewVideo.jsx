import { useContext, useState } from "react";
import "./newVideo.css";
import storage from "../../firebase";
import { createVideo } from "../../context/videoContext/apiCalls";
import { VideoContext } from "../../context/videoContext/VideoContext";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function NewVideo() {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(null);

  const [err, setErr] = useState({
    "validate_video": ""
  })

  const navigate = useNavigate()
  const { dispatch } = useContext(VideoContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setVideo({ ...video, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!video) {
        setErr((prevErr) => ({ ...prevErr, validate_video: "Please enter valid Video Details!" }));
        console.log('jjjjjj: ', err.validate_video)
      }
      else {
        if (video.title.trim().length > 0) {
          createVideo(video, dispatch);
          navigate("/admin/videos");
        } else {
          setErr((prevErr) => ({ ...prevErr, validate_video: "Please enter valid Video Details!" }));
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleUpload = async (e) => {
    const label = e.target.name
    const file = e.target.files[0]
    const fileName = new Date().getTime() + "_" + e.target.name + "_" + file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(file);
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
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setVideo((prev) => {
            return { ...prev, [e.target.name]: url };
          });
        });
      }
    );

    // delete first file from firebase storage if user attempt to load another one
    await new Promise((resolve, reject) => {
      // for deleting old file in firebase storage
      if (video !== null && video[label]) {
        console.log('inside delete...')
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
  };

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Video</h1>
          <form>
            <div className="addProductForm">
              <div className="addProductItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
                {
                  (video?.title === undefined || video?.title.trim().length === 0) && <span style={{ color: 'red', fontSize: "12px", marginBottom: "10px" }}>Please enter Video Title!</span>
                }
              </div>
              <div className="addProductItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Year</label>
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  name="category"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="Duration"
                  name="duration"
                  onChange={handleChange}
                />
              </div>
              <div className="addProductItem">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option value="Mandatory">Mandatory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>
              <div className="addProductItem">
                <label>Thumbnail</label>
                <input
                  type="file"
                  id="img"
                  name="thumbnail"
                  onChange={handleUpload}
                />
                {progress
                  && <i>{`File is ${progress} % uploaded`}</i>
                }
                {/* {
                  (video === null && err.validate_video) && <span style={{ color: 'red', fontSize: "12px" }}> {err.validate_video}</span>
                } */}
              </div>
              <div className="addProductItem">
                <label>Video</label>
                <input
                  type="file"
                  name="video"
                  onChange={handleUpload}
                />
              </div>
            </div>
            <>
              {
                (video === null && err.validate_video) && <span style={{ color: 'red', fontSize: "12px", display: 'block' }}> {err.validate_video}</span>
              }
            </>
            {
              (progress === null || progress === 100) &&
                
                <button className="addProductButton" onClick={handleSubmit}>
                  Create
                </button>
            }
          </form>
        </div>
      </div>
    </>
  );
}
