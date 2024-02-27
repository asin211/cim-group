import { Link, useLocation } from "react-router-dom";
import "./list.css";

import { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

import { VideoContext } from "../../context/videoContext/VideoContext";
import { getVideos } from "../../context/videoContext/apiCalls";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


export default function List() {
  const location = useLocation();
  const selected_list = location.state.list;

  const [list, setList] = useState(selected_list);
  const { dispatch } = useContext(ListContext);
  const navigate = useNavigate()

  const { videos, dispatch: dispatchVideo } = useContext(VideoContext);

  const [err, setErr] = useState({
    "validate_list": ""
  })

  useEffect(() => {
    getVideos(dispatchVideo);
  }, [dispatchVideo]);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list.title.trim().length === 0) {
      setErr((prevErr) => ({ ...prevErr, validate_list: "Please enter valid list details!" }));
    } else {
      updateList(list, dispatch);
      navigate("/admin/lists")
    }
  };

  return (
    <>
      <Topbar />
      <div className="outer-container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">List</h1>
            <Link to="/admin/newList">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{list._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">title:</span>
                  <span className="productInfoValue">{list.title}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">category:</span>
                  <span className="productInfoValue">{list.category}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">type:</span>
                  <span className="productInfoValue">{list.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form>
              <div className="productForm">
                <div className="productFormLeft">
                  <label>List Title</label>
                  <input
                    type="text"
                    name="title"
                    value={list.title}
                    required
                    placeholder={list.title}
                    onChange={handleChange}
                  />
                  {
                    list.title.trim().length === 0 && <span style={{ color: 'red', fontSize: "12px", marginBottom: "10px" }}>Please enter List Title!</span>
                  }
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={list.category}
                    placeholder={list.category}
                    onChange={handleChange}

                  />
                  <label>Type</label>
                  <select name="type" onChange={handleChange}>
                    <option value={list.type}>Type</option>
                    <option value="Mandatory">Mandatory</option>
                    <option value="Optional">Optional</option>
                  </select>
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
                        <option
                          key={video._id}
                          value={video._id}
                          selected={list.content.includes(video._id)}
                        >
                          {video.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                {
                  list.title.trim().length === 0 && err.validate_list && <span style={{ color: 'red', fontSize: "12px", marginTop: "10px" }}>{err.validate_list}</span>
                }
              </div>
              <div className="productFormRight">
                <button className="productButton" onClick={handleSubmit} >Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}