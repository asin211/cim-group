import { useState, useEffect } from "react";
import "./bookingList.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import BASE_URL from '../../apiConfig';

export default function BookingList() {
    const [booking_list, setBookingList] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/bookings`, {
                    headers: {
                        token:
                            "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
                    },
                });
                const updatedBookingList = res.data.map(booking => ({
                    ...booking,
                    date_time: `${new Date(booking.date_time).toLocaleDateString()} - ${new Date(booking.date_time).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}`
                }));
                setBookingList(updatedBookingList);
            } catch (err) {
                console.log(err);
            }
        };
        getBookings();
    }, []);

    const columns = [
        // { field: "_id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 120 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "date_time", headerName: "Booking Details", width: 180 },
        { field: "service", headerName: "Service", width: 130 },
        { field: "message", headerName: "Message", width: 550 },
    ];

    return (
        <>
            <Topbar />
            <div className="outer-container">
                <Sidebar />
                <div className="productList">
                    <h1 style={{ marginBottom: "10px" }}>Bookings</h1>
                    <DataGrid
                        rows={booking_list}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={8}
                        checkboxSelection
                        getRowId={(r) => r._id}
                    />
                </div>
            </div>
        </>
    );
}