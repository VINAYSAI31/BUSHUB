import React from 'react';
import { Col, Form, Modal, Row , message } from 'antd';
import { axiosInstance } from "../helpers/axiosinstance";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import moment from "moment";

function BusForm({ showBusForm, setShowBusForm , type='add', getData , selectedBus,setSelectedBus}) {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
   
        try {
            
            let response = null
            if (type === 'add') {
            response = await axios.post("/api/buses/addbus", values);
            }else{
               response = await axios.post("/api/buses/update-bus",{
                ...values,
            _id: selectedBus._id,
               });


            }
                
              
              if (response.data.success) {
                message.success(response.data.message);
            }
            
            
             else {
                message.error(response.data.message);
            }
                      getData();
                 setShowBusForm(false);
                 setSelectedBus(null);
           
        } catch (error) {
            message.error(error.message);
            
        }
        console.log(values);
    };
    return (
        <div>
            <Modal width={800}
             title={type=="add" ? "Add Bus" : "Update Bus"}
              visible={showBusForm}
               onCancel={() => {

              setSelectedBus(null);
              setShowBusForm(false)} 
              }
              footer={false}>
                <Form layout="vertical" 
                onFinish={onFinish}
                initialValues={selectedBus}>
                    <Row gutter={[10, 10]}>
                        <Col lg={24} xs={24}>
                            <Form.Item label='Bus Name' name='name'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='Bus Number' name='number'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='Capacity' name='capacity'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='From' name='from'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='To' name='to'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label='Journey Date' name='journeyDate'>
                                <input type="date" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label='Departure' name='departure'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label='Arrival' name='arrival'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='Type' name='type'>
                                <input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label='Fare' name='fare'>
                                <input type="string" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className="primary-btn" type="Submit" >Save</button>
                    </div>
                </Form>


            </Modal>
        </div>
    )

}
export default BusForm;