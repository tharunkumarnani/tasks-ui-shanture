import axios from 'axios';
import { MdOutlineDelete } from "react-icons/md";
import './index.css'

const TaskItem=(props)=>{
    const {taskDetails,fetchTaskSOnceFromDB,setUpdateTaskMsg}=props;
    const {id,taskName,isCompleted}=taskDetails;
    const checkStatus=async()=>{
        //updateCheckStatus(id);
        const res=await axios.put(`https://tasks-database-3.onrender.com/update-task-status/${id}`)
        setUpdateTaskMsg(res.data)
        fetchTaskSOnceFromDB()
    }
    const deleteTask=async()=>{
        console.log("triggered delete")
        const res=await axios.delete(`https://tasks-database-3.onrender.com/delete-task/${id}`)
        setUpdateTaskMsg(res.data)
        fetchTaskSOnceFromDB()
    }
    
    return (
        <li className="task-item">
            <input id={id} onChange={checkStatus} checked={isCompleted==='0'?false:true} type="checkbox" className='check'/>
            <label htmlFor={id} className="task-item-content">
                <p className='task-name'>{taskName}</p>

            </label>
            <button className='delete-btn'><MdOutlineDelete onClick={deleteTask} className='delete-icon'/></button>
        </li>
    )
}

export default TaskItem;