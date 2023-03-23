import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();

    useEffect(() => { }, [])

    const handleLogout = async () => {
        //
    }

    return (
        <>
            {userData ? (
                <>
                    <section className='navigation'>
                        <div className="navbar">
                            <div className="welcome">
                                <h1>Welcome <span className='name'>{userData.name}</span></h1>
                            </div>
                            <div className='dashboard-btn'>

                                <input type="search" name="search" id="search" placeholder='Search' />
                                <button className='logout' onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </section>


                    {/* Todo and task Section */}

                    <section className='hero'>
                        <div className='todo-head'>
                            <div>
                                <button className='create-btn'>Create new todo</button>
                            </div>
                            <div>
                                <h2>All Todos</h2>
                            </div>
                            <div className="sorting">
                                <p>Sort By</p>
                                <select name="sort" id="sort">
                                    <option value="Created Date" selected>Created Date</option>
                                    <option value="Modified Date">Modified Date</option>
                                    <option value="Alphabetic">Alphabetic</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className='todos'>
                        <div className="container">
                            <div className="todo">
                                <div>Expand to see tasks</div>
                                <div>todo title</div>
                                <div>
                                    <button className='todo-edit'>Edit</button>
                                    <button className='todo-dlt'>Delete</button>
                                </div>
                            </div>
                            <div className="tasks">
                                <div className="task">
                                    <div className="tasktitle"><p>TaskTitle</p></div>
                                    <div className="task-btn">
                                        <button>Edit Task</button>
                                        <button>Delete Task</button>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <p>Please login to add Todo
                    <Link to="/login">Login
                    </Link>
                </p>
            )}
        </>
    )
}

export default Dashboard;