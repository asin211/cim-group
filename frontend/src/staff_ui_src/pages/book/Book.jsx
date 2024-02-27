import Navbar from "../../components/navbar/Navbar";
import "./book.scss";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

import booking_img from "../../assets/images/booking_img.jpg"

import BASE_URL from '../../../apiConfig';

const Book = () => {
    const [booking, setBooking] = useState(null);
    const navigate = useNavigate()

    // Email Pattern to test a valid email address
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Current date to validate booking
    const twoDaysAheadDate = new Date(Date.now() + (2 * 86400000)).toISOString().slice(0, 16);

    const [err, setErr] = useState({
        "validate_user": ""
    })

    const handleChange = (e) => {
        const value = e.target?.value;
        setBooking({ ...booking, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!booking) {
            setErr((prevErr) => ({ ...prevErr, validate_booking: "Please enter valid booking details!" }));
        } else {
            console.log("from submit --> ", booking)
            if (email_pattern.test(booking.email) && booking.name && booking.date_time) {
                try {
                    const res = await axios.post(`${BASE_URL}/bookings`, booking, {
                        headers: {
                            token:
                                "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                        },
                    });
                    alert("Booking Request successfully sent!")
                    navigate("/")
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    return (
        <div className="home">
            <Navbar />

            <div class="position-relative" style={{ height: "600px" }}>
                <img src={booking_img} alt="Image" class="img-fluid" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>
            
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                                <h6 className="text-white text-uppercase">Booking</h6>
                                <h1 className="text-white mb-4">Online Booking</h1>
                                <p className="mb-4">
                                    Book appointments to discuss a wide range of services for your financial needs, receive tailored advice for your business ventures, explore opportunities in real estate acquisitions, or delve into the world of investments.
                                </p>
                                <p className="mb-4">
                                    Please add any special requests you have for a customer, ensuring that we cater to your unique needs and preferences. Whether it's a personalized financial plan, tailored business strategy, specific real estate requirements, or investment preferences, we are here to accommodate your individual requests and provide a truly customized experience.
                                </p>
                                {/* <a className="btn btn-outline-light py-3 px-5 mt-2" href="">Read More</a> */}
                            </div>
                            <div className="col-md-6">
                                <h1 className="text-white mb-4">Booking</h1>
                                <form>
                                    <div className="row g-3" >
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" name="name" className="form-control bg-transparent text-white" id="name"
                                                    placeholder="Your Name" onChange={handleChange} required minLength={2} maxLength={15} />
                                                <label for="name">Your Name</label>
                                                {
                                                    (booking?.name === undefined || booking?.name?.trim().length <= 1) && <span style={{ color: 'red', fontSize: "12px" }}>Please enter a valid name!</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" name="email" className="form-control bg-transparent text-white" id="email"
                                                    placeholder="Your Email" onChange={handleChange} required />
                                                <label for="email">Your Email</label>
                                                {
                                                    !email_pattern.test(booking?.email) && <span style={{ color: 'red', fontSize: "12px" }}>Please enter a valid email address!</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date" id="date3" data-target-input="nearest">
                                                <input type="datetime-local" name="date_time" className="form-control bg-transparent datetimepicker-input"
                                                    id="date_time" placeholder="Date & Time" data-target="#date3"
                                                    data-toggle="datetimepicker"
                                                    min={twoDaysAheadDate}
                                                    onChange={handleChange}
                                                    style={{ filter: 'invert(1)' }}
                                                    required
                                                />
                                                <label for="datetime">Date & Time</label>
                                                {
                                                    !booking?.date_time && <span style={{ color: 'red', fontSize: "12px" }}>Please select booking date & time!</span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select name="service" className="form-select bg-transparent text-white" id="select1" onChange={handleChange}>
                                                    <option value="Real Estate">Real Estate</option>
                                                    <option value="Finance">Finance</option>
                                                    <option value="Investor">Investor</option>
                                                </select>
                                                <label for="select1">Service</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea name="message" className="form-control bg-transparent text-white" placeholder="Special Request" onChange={handleChange}
                                                    id="message" style={{ height: "100px" }}></textarea>
                                                <label for="message">Special Request</label>
                                            </div>
                                        </div>
                                        {
                                            !booking && err.validate_booking && <span style={{ color: 'red', fontSize: "12px"}}>{err.validate_booking}</span>
                                        }
                                        <div className="col-12">
                                            <button
                                                className="btn btn-outline-light w-100 py-3"
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Book;
