import { useContext, useEffect, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { getVideos } from "../../context/videoContext/apiCalls";
import { VideoContext } from "../../context/videoContext/VideoContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function NewList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate()

  const { dispatch } = useContext(ListContext);
  const { videos, dispatch: dispatchVideo } = useContext(VideoContext);

  const [err, setErr] = useState({
    "validate_list": ""
  })

  useEffect(() => {
    getVideos(dispatchVideo);
  }, [dispatchVideo]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!list) {
      setErr((prevErr) => ({ ...prevErr, validate_list: "Please enter List Details!" }));
    }
    else if (list.title.trim().length > 0) {
      createList(list, dispatch);
      navigate("/admin/lists")
    }
  };

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New List</h1>
          <form>
            <div className="addProductForm">
              <div className="formLeft">
                <div className="addProductItem">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="List Title"
                    name="title"
                    required
                    onChange={handleChange}
                  />
                  {
                    (list?.title === undefined || list?.title.trim().length === 0) && <span style={{ color: 'red', fontSize: "12px", marginBottom: "10px" }}>Please enter List Title!</span>
                  }
                </div>
                <div className="addProductItem">
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    name="category"
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Type</label>
                  <select name="type" onChange={handleChange}>
                    <option value={list?.type}>Type</option>
                    <option value="Mandatory">Mandatory</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>
                {
                  list === null && err.validate_list && <span style={{ color: 'red', fontSize: "12px" }}> {err.validate_list}</span>
                }
              </div>
              <div className="formRight">
                <div className="addProductItem">
                  <label>Content</label>
                  <select
                    multiple
                    name="content"
                    onChange={handleSelect}
                    style={{ height: "280px" }}
                  >
                    {videos.map((video) => (
                      <option key={video._id} value={video._id}>
                        {video.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>

  );
}
