import React, { useEffect, useState } from "react";
import axios from "axios";



function Dashboard() {
    const [userData, setUserData] = useState('');
    const [todos, setTodos] = useState([]);
    const [tasks, setTasks] = useState('');

    //fetch the current user
    const fetchUser = async () => {
        const resp = await axios.get("http://localhost:4000/dashboard", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        if (resp.data.user.length !== 0) { setUserData(resp.data.user); }
    };

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    // fetch all todos
    const fetchTodos = async () => {
        const getTodos = await axios.get("http://localhost:4000/getAllTodos", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        if (getTodos.data.todos.length > 0) {
            const finalTodos = getTodos.data.todos.filter(element => element.user == userData._id);

            setTodos(getTodos.data.todos);
        }
    }


    //function to toggle the tasks contents between showing and hiding
    // function showFaq(a) {
    //     let contents = document.querySelectorAll(".tasks-div");

    //     if (contents[a].style.display !== 'block') {
    //         contents[a].style.display = 'block';
    //     } else if (contents[a].style.display = 'block') {
    //         contents[a].style.display = 'none';
    //     }
    // }

    const showFaq = () => {
        let content = document.querySelector(".tasks-div");

        if (content.style.display !== 'flex') {
            content.style.display = 'flex';
        } else if (content.style.display = 'none') {
            content.style.display = 'flex';
        }
    }

    // let buttons = document.querySelectorAll('.todo-div');
    // buttons.forEach((e, i) => {
    //     e.addEventListener('click', () => { showFaq(i) })
    // });





    useEffect(() => {
        fetchTodos();
        fetchUser()
    }, []);

    console.log(todos);

    return (
        <>
            <div className="todo-app">
                <h1>Todo Application</h1>
            </div>
            <div className="topbar">
                <h2>Welcome {userData.name}</h2>
                <div className="nav-buttons">
                    <button className="create">Create new todo</button>
                    <input type="search" placeholder="search" />
                    <button className="logout">Logout</button>
                </div>
            </div>

            <section className="hero">
                <div className="header">
                    <div>
                        <h2>All Todos</h2>
                    </div>
                    <div className="sorting">
                        <h3>Sort By</h3>
                        <button className="create">Created Date</button>
                        <button className="create">Modified Date</button>
                    </div>
                </div>
            </section>

            <section className="todos">
                {todos && todos.map((todo) => (

                    <div className="todo-div" key={todo._id}>
                        <div className="todo-name">
                            <h3>{todo.title}</h3>
                            <div className="tasks-div">
                                <p>first task</p>
                                <p>first task</p>
                                <p>first task</p>
                                <p>first task</p>
                                <p>first task</p>
                            </div>
                        </div>
                        <div className="action">
                            <button className="edit-btn">Edit todo</button>
                            <button className="delete-btn">Delete todo</button>
                        </div>
                    </div>
                ))}
            </section >



        </>
    )
}

export default Dashboard;