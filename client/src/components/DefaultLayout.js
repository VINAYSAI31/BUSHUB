import React from 'react';
import '../resourses/layout.css';
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";


function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const {user} = useSelector(state => state.users);
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Bookings',
            path: '/bookings',
            icon: 'ri-file-list-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Logout',
            path: '/admin/logout',
            icon: 'ri-logout-box-line'
        },

    ];
    const adminMenu = [

        {
            name: 'Home',
            path: '/admin',
            icon: 'ri-home-line'
        },
        {
            name: 'Buses',
            path: '/admin/buses',
            icon: 'ri-bus-2-fill'
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: 'ri-user-line'
        },
        {
            name: 'Bookings',
            path: '/admin/bookings',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Logout',
            path: '/admin/logout',
            icon: 'ri-logout-box-line'
        },
    ];
    const menuToBeRendered =  userMenu  ;

    const activeRoute = window.location.pathname;
    return (
        <div className="layout-parent">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1 className="logo">BH</h1> 
                    <h1 className="role">Role:{user?.isAdmin ? 'Admin' : 'User'}</h1>
                    </div>
                <div className="d-flex flex-column gap-3 justify-content-start menu ">
                    {menuToBeRendered.map((item, index) => {
                        return (
                           <div className={`${activeRoute === item.path && 'active-menu-item'} menu-item`}>
                                <i className={item.icon}></i>
                                {!collapsed && <span onClick={() => {
                                    if (item.path === "/admin/logout") {
                                        localStorage.removeItem("token");
                                        navigate("/login");
                                    }
                                    else {
                                        navigate(item.path);

                                    }
                                }}> {item.name}</span>}

                            </div>);
                    })}
                </div>


            </div>
            <div className="body">
                <div className="header">
                    {collapsed ? (
                        <i class="ri-menu-2-fill"
                            onClick={() => setCollapsed(!collapsed)}
                        ></i>
                    ) : (<i class="ri-close-line"
                        onClick={() => setCollapsed(!collapsed)}

                    ></i>)}
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout;
