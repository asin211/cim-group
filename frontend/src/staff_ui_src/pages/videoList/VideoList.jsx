import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./videoList.scss";
import List from "../../components/list/List";
import axios from "axios";
import { useEffect, useState } from "react";

import videos_img from "../../assets/images/videos_img.jpg"
import Footer from "../../components/footer/Footer";

import BASE_URL from '../../../apiConfig';

const VideoList = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/lists`, {
                    headers: {
                        token:
                            "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                    },
                });
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, []);

    return (
        <div className="home">
            <Navbar />

            <div class="position-relative" style={{ height: "600px" }}>
                <img src={videos_img} alt="Image" class="img-fluid" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                <div class="position-absolute top-50 start-50 translate-middle">
                    <h1 class="display-3 text-white animated slideInDown" style={{ fontWeight: "400" }} >Project Videos</h1>
                </div>
            </div>
            <div style={{minHeight: "100vh"}}>
                {lists.map((list) => (
                    <List list={list} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default VideoList;