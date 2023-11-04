
import './home.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import Bus from '../components/Bus';

import { axiosInstance } from '../helpers/axiosinstance';
import { Table, message } from 'antd';


function Home() {
  const { user } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const getBuses = async () => {
    try {
        
        const response = await axiosInstance.post("/api/buses/get-all-buses", {});
       
        if (response.data.success) {
            setBuses(response.data.data);
        } else {
            message.error(response.data.message);
        }
    } catch (error) {
         // Assuming you have a hideLoading action defined
        message.error(error.message);
    }
};
useEffect(() => {
  getBuses();
}, []);
  return (
    <div>
      <div>

      </div>
<div>
  <Row>
       {buses.map(bus =>(
        <Col lg={12} xs={24} sm={24}>
        <Bus bus={bus}/>
        </Col>
       ))}

  </Row>
</div>
    </div>
  );
}

export default Home;
