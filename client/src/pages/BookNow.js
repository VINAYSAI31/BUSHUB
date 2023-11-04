import React from 'react';
import './home.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import { axiosInstance } from '../helpers/axiosinstance';
import StripeCheckout from 'react-stripe-checkout';


function BookNow() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    const [bus, setBus] = useState(null);
    const getBus = async () => {
        try {

            const response = await axiosInstance.post("/api/buses/bus-by-id", {
                _id: params.id,
            });

            if (response.data.success) {
                setBus(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            // Assuming you have a hideLoading action defined
            message.error(error.message);
        }
    };

    const bookNow = async () => { // Add async keyword here
        try {
            const response = await axiosInstance.post("/api/bookings/book-seat", {
                bus: bus._id,
                seats: selectedSeats,
            });
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    const onToken = async (token) => {
        try {
            const response = await axiosInstance.post("/api/bookings/make-payment",{
                token,
                amount: selectedSeats.length * bus.fare,
            });
            if(response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message); // Corrected from message.error(response.data.message)
        }
    }
    


    useEffect(() => {
        getBus();
    }, []);
    return (
        <div>
            {bus && (
                <Row className="mt-3" gutter={20}>
                    <Col lg={12} xs={24} sm={24}>
                        <h1 className="text-2xl text-secondary">{bus.name}</h1>
                        <h1 className="text-md">{bus.from}-{bus.to}</h1>
                        <hr />
                        <div className='flex flex-col gap-1'>
                            <h1 className="text-lg"><b>Journey Date</b>  :{bus.journeyDate}</h1>
                            <h1 className="text-lg"><b> Fare</b>  :rs {bus.fare}/-</h1>
                            <h1 className="text-lg"><b> Departure Time</b>  :{bus.departure}</h1>
                            <h1 className="text-lg"><b> Arrival Time</b>  :{bus.arrival}</h1>
                            <h1 className="text-lg"><b>  Capacity</b>  :{bus.capacity}</h1>
                            <h1 className="text-lg"><b> Seats Left</b>  :{bus.capacity - bus.seatsBooked.length}</h1>



                        </div>
                        <hr />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl "><b>SelectedSeats:</b> {selectedSeats.join(",")}
                            </h1>
                            <h1 className="text-xl">Price :rs.{bus.fare * selectedSeats.length}</h1>
                            <hr />
                            <StripeCheckout
                            billingAddress
                                token={onToken}
                                amount={bus.fare * selectedSeats.length*100}
                                currency="INR"
                                stripeKey="pk_test_51O8oHhSAo6Ac8f4rgeTFAqehSKtRRk2HZvPlqmRqGQRR4Nbx9wwnA0nWmDdG85Pagp8vxBIwF6DdqZxFeZ5tD2vd00K39LXQiH"
                            >
                                <button className={`btn btn-primary ${selectedSeats.length === 0 && "disabled-btn"
                                    }`} disabled={selectedSeats.length === 0}>Book Now</button>
                            </StripeCheckout>



                        </div>
                    </Col>
                    <Col lg={12} xs={24} sm={24}>
                        <SeatSelection
                            selectedSeats={selectedSeats}
                            setSelectedSeats={setSelectedSeats}
                            bus={bus} />
                    </Col>
                </Row>)}
        </div>
    )
}
export default BookNow