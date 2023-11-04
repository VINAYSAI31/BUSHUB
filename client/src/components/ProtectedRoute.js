import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import { useDispatch, useSelector } from 'react-redux'; // Importing useSelector and useDispatch
import SetUser from '../redux/usersSlice';
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const validateToken = async () => {
        try {
            const response = await axios.post("/api/users/get-user-by-id", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                setLoading(false);
                dispatch(SetUser(response.data.data));
            } else {
                setLoading(false);
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/') 
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, []);

  

    return (
        <div>
            <DefaultLayout>{children}</DefaultLayout>
        </div>
    );
}

export default ProtectedRoute;
