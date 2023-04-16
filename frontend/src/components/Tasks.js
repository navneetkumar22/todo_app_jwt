import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import addIcon from "../assets/add-btn.png";
const serverDomain = "https://todo-app-dc70.onrender.com";

const Tasks = ({ grabTodo, setGrabTodo }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAllTasks();
    },);

    const clickedTodo = grabTodo;

    // fetch all tasks
    const fetchAllTasks = async () => {
        try {
            const allTasks = await axios.get(`${serverDomain}/getAllTasks/${clickedTodo._id}`)
            setTasks(allTasks.data.tasks);
            // console.log(allTasks);
        } catch (error) {
            console.log(error);
        }
    }

    // add a new task
    const addNewTask = async (id) => {
        const newTask = { task: prompt("Enter new Task") }
        try {
            await axios.post(`${serverDomain}/addTask/${id}`, newTask)
            fetchAllTasks();
        } catch (error) {
            console.log(error);
        }
    }

    //edit task
    const editTask = async (id) => {
        const newTask = { task: prompt("Enter new task") }
        try {
            await axios.put(`${serverDomain}/editTask/${clickedTodo._id}/${id}`, newTask)
            fetchAllTasks();
        } catch (error) {
            console.log(error);
        }
    }

    //delete task
    const deleteTask = async (id) => {
        try {
            const confirm = window.confirm("Do you want to delete this task?")
            if (confirm) {
                await axios.delete(`${serverDomain}/deleteTask/${clickedTodo._id}/${id}`)
                fetchAllTasks();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="main">
                <div className="wrapper-div">
                    <div className="todo-title">
                        <h2>{grabTodo.title}</h2>
                        <img src={addIcon} alt="" onClick={() => { addNewTask(grabTodo._id) }} />
                    </div>
                    <div>
                    </div>
                    <div className="tasks-container">
                        {
                            tasks.map((task) => (
                                <div className="task" key={task._id}>
                                    <p>{task.taskTitle}</p>
                                    <div className="task-action">
                                        <img src={editIcon} alt="" onClick={() => { editTask(task._id) }} />
                                        <img src={deleteIcon} alt="" onClick={() => { deleteTask(task._id) }} />
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tasks;