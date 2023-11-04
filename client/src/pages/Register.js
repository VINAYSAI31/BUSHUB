import React from 'react'
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from "axios";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axios.post("/api/users/register", values);
            if (response.data.success) {
                message.success(response.data.message);
                 navigate("/login");
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);

        }
        console.log(values)
    };
    return (

        <div class="login-box">
            <div className="container">
                <h1 style={{ color: '#ffff' }}>
                    BUSHUB - Register

                </h1>

                <Form label="USER" layout="vertical" onFinish={onFinish}>
                    <div class="user-box">
                        <h3 style={{ color: '#03e9f4' }}>username</h3>
                        <Form.Item label="Name" name='name'>
                            <input type="text" />
                        </Form.Item>
                        <h3 style={{ color: '#03e9f4' }}>email</h3>
                        <Form.Item label="Email" name='email'>
                            <input type="text" />
                        </Form.Item>
                        <h3 style={{ color: '#03e9f4' }}>password</h3>

                        <Form.Item label="Password" name='password'>
                            <input type="password" />

                        </Form.Item>
                        <div classname=".dflex.justify-content-between align-items-center">
                            <a href="#">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <button type='submit'>
                                    REGISTER NOW
                                </button>
                            </a>

                            <Link to="/login"> click here to Login </Link>

                        </div>
                    </div>
                </Form>
            </div>
        </div>





    )
}

export default Register
