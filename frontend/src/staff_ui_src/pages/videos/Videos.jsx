import Navbar from "../../components/navbar/Navbar";
import "./videos.scss";
import ListItem from "../../components/listItem/ListItem";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import videos_img from "../../assets/images/videos_img.jpg"

import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
} from "@material-ui/icons";
import Footer from "../../components/footer/Footer";

import BASE_URL from '../../../apiConfig';

const Video = () => {
    const [videos, setVideos] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/videos/`, {
                    headers: {
                        token:
                            "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                    },
                });
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos();
    }, []);

    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);


    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef?.current.getBoundingClientRect().x - 50;
        console.log('kkk: ', listRef)
        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        // if (direction === "right" && slideNumber < 5) {
        if (direction === "right" && slideNumber < clickLimit) {
            // console.log('right: ', list.content.length)
            // if (list.content.length > 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            // } 
        }
    };

    return (
        <div className="home">
            <Navbar />

            <div class="position-relative" style={{ height: "500px" }}>
                <img src={videos_img} alt="Image" class="img-fluid" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                <div class="position-absolute top-50 start-50 translate-middle">
                    <h1 class="display-3 text-white animated slideInDown" style={{ fontWeight: "400" }} >Videos</h1>
                </div>
            </div>
            <div style={{ minHeight: "100vh" }}>
                <div className="list">
                    <span className="listTitle">New Videos</span>
                    <div className="wrapper">
                        <ArrowBackIosOutlined
                            className="sliderArrow left"
                            onClick={() => handleClick("left")}
                            style={{ display: !isMoved && "none" }}
                        />
                        <div className="container" ref={listRef}>
                            {videos?.map((video, index) => (
                                <ListItem index={index} item={video._id} />
                            ))}
                        </div>
                        <ArrowForwardIosOutlined
                            className="sliderArrow right"
                            onClick={() => handleClick("right")}
                        />
                    </div>
                </div>

                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h2 className="mb-5 text-white">Training Videos</h2>
                            <div className="row g-4 justify-content-center">

                                {videos.map((video, index) => (
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="package-item">
                                            <Link
                                                to={"/watch"}
                                                state={{ video: video }}
                                            >
                                                <div className="overflow-hidden">
                                                    <img height="250px" width="100%" src={video.thumbnail || ""} alt="" />
                                                </div>
                                            </Link>
                                            <div className="d-flex border-bottom">
                                                <small className="flex-fill text-center border-end py-2 text-white-50"><i>{video.duration}</i></small>
                                                <small className="flex-fill text-center border-end py-2 text-white-50"><i>{video.type}</i></small>
                                                <small className="flex-fill text-center py-2 text-white-50"><i>{video.year}</i></small>
                                            </div>
                                            <p className="my-2 text-white-50">{video.title}</p>
                                            <p>{video.desc}</p>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
};

export default Video;
