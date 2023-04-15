import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icon-search.png"
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import Tasks from "./Tasks";
const serverDomain = "https://todo-app-dc70.onrender.com";



function Dashboard() {
    const [userData, setUserData] = useState('');
    const [todos, setTodos] = useState('');
    const [grabTodo, setGrabTodo] = useState({ title: "Click on a todo to add a task", tasks: [] });

    const navigate = useNavigate('');

    useEffect(() => {
        fetchUser()
        fetchTodos();
    }, [userData]);

    //fetch the current user
    const fetchUser = async () => {
        try {
            const resp = await axios.get(`${serverDomain}/dashboard`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            if (resp.data.user.length !== 0) { setUserData(resp.data.user); }
        } catch (error) {
            console.log(error);
        }
    };

    //logout the current user
    const logOut = () => {
        const getConfirm = window.confirm("Do you really want to logout?")
        if (getConfirm === true) {
            localStorage.clear();
            navigate('/')
        }
    }


    // fetch all todos
    const fetchTodos = async () => {
        try {
            const getTodos = await axios.get(`${serverDomain}/getAllTodos`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
            if (getTodos.data.todos.length !== 0) {
                const filteredTodos = getTodos.data.todos.filter(todos => todos.user === userData._id);
                setTodos(filteredTodos);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //create a new todo
    const createTodo = async () => {
        const newTodo = {
            title: prompt("Enter new todo"),
            user: userData._id
        };
        await axios.post(`${serverDomain}/api/todo/create`, newTodo, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        fetchTodos();
    }

    //edit the todo
    const editTodo = async (_id) => {
        const newTodoTitle = { title: prompt("Enter new title of todo") };
        await axios.put(`${serverDomain}/editTodo/${_id}`, newTodoTitle, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        fetchTodos();
    }

    //delete the todo
    const handleDelete = async (id) => {
        await axios.delete(`${serverDomain}/deleteTodo/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        alert("Todo is deleted successfully")
        fetchTodos();
    }

    //search todos
    const handleSearch = async (event) => {
        const key = event.target.value;
        if (key) {
            const result = await axios.get(`${serverDomain}/search/${key}`)
            const filteredTodo = result.data.todo.filter(todo => todo.user === userData._id)
            setTodos(filteredTodo);
        } else {
            fetchTodos();
        }
    }

    //sorting todos
    const sortByCreateDate = async () => {
        const getTodos = await axios.get(`${serverDomain}/sortByCreateDate`)
        if (getTodos.data.sortedTodos.length !== 0) { setTodos(getTodos.data.sortedTodos); }
    }

    const sortByModifiedDate = async () => {
        const getTodos = await axios.get(`${serverDomain}/sortByModifiedDate`)
        if (getTodos.data.sortedtodos.length !== 0) { setTodos(getTodos.data.sortedtodos); }
    }


    //fetch all tasks
    const exploreTasks = (clickedTodo) => {
        setGrabTodo(clickedTodo);
    }


    return (
        <>
            <div className="todo-app">
                <h1>Todo Application</h1>
            </div>
            <div className="topbar">
                <h2>Welcome {userData.name}</h2>
                <div className="nav-buttons">
                    <button className="create" onClick={createTodo}>Create new todo</button>
                    <div className="search-div">
                        <input type="search" className="input-search" placeholder="search" onChange={handleSearch} />
                        <img src={searchIcon} alt="" className="search-img" />
                    </div>
                    <button className="logout" onClick={logOut}>Logout</button>
                </div>
            </div>

            <section className="hero">
                <div className="header">
                    <div>
                        <h2>All Todos</h2>
                    </div>
                    <div className="sorting">
                        <h3>Sort By</h3>
                        <button className="sort-btn" onClick={sortByCreateDate}>Created Date</button>
                        <button className="sort-btn" onClick={sortByModifiedDate}>Modified Date</button>
                    </div>
                </div>
            </section>

            <div className="hero-div">

                <section className="todos">
                    {
                        todos && todos.map((todo) => (
                            <div className="todo-div" key={todo._id} onClick={() => { exploreTasks(todo); }}>
                                <h3>{todo.title}</h3>
                                <div className="action">
                                    <img src={editIcon} alt="" onClick={() => { editTodo(todo._id) }} />
                                    <img src={deleteIcon} alt="" onClick={() => { handleDelete(todo._id) }} />
                                </div>
                            </div>
                        ))
                    }
                </section >

                <Tasks grabTodo={grabTodo} setGrabTodo={setGrabTodo} />
            </div>
        </>
    )
}

export default Dashboard;