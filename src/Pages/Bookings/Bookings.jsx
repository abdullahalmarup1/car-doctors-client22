import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);


    const url = `http://localhost:5000/bookings?email=${user?.email}`

    useEffect(() => {

        axios.get(url, {
            withCredentials: true
        })
            .then(res => {
                setBookings(res.data);
            })


        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url])

    const handleDelete = id => {
        // const proceed = confirm("are you sure to delete");
        // if (proceed) {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);


                if (data.deletedCount > 0) {

                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({

                                title: "Deleted!",
                                text: "Your Service has been deleted.",
                                icon: "success"
                            });
                        }
                    });
                    const remaining = bookings.filter(booking =>
                        booking._id !== id);
                    setBookings(remaining)
                }
            })
        // }
    }

    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = bookings.filter(booking =>
                        booking._id !== id);
                    const updated = bookings.find(booking =>
                        booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);


                    // Swal.fire({
                    //     title: "Do you want to Confirm the Services?",
                    //     showDenyButton: true,
                    //     showCancelButton: true,
                    //     confirmButtonText: "Confirm",
                    //     denyButtonText: `Don't Confirm`
                    // }).then((result) => {
                    //     /* Read more about isConfirmed, isDenied below */
                    //     if (result.isConfirmed) {
                    //         Swal.fire("Confirmed!", "", "success");
                    //     } else if (result.isDenied) {
                    //         Swal.fire("Services are not Confirmed", "", "info");
                    //     }
                    // });
                }
            })
    }

    return (
        <div>
            <h2 className="text-2xl">Your Bookings : {bookings.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-slate-200">
                        <tr>
                            <th>Delete Services</th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map(booking =>
                                <BookingRow key={booking._id}
                                    booking={booking}
                                    handleDelete={handleDelete}
                                    handleBookingConfirm={handleBookingConfirm}
                                ></BookingRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;