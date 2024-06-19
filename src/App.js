import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'
import TaskItem from './components/TakItem/indes'



const App=()=>{
  const [tasks,setTasks] = useState([])
  const [taskName,setTaskName]=useState("")
  const [updateTaskStatusMsg,setUpdateTaskMsg]=useState("Tasks Fetched Successfully")

  const fetchTaskSOnceFromDB=async()=>{
    const res=await axios.get('https://tasks-database-3.onrender.com/get-tasks')
    const updateTasks=res.data.map((each)=>{
      return {id:each.id,taskName:each.task_name,isCompleted:each.is_completed}
    })
    setTasks(updateTasks)
  }

  const addTask=async()=>{
    if (taskName ===""){
      alert("Invalid Input")
    }else{
    const taskData={taskName:taskName,isCompleted:false}
    const addTaskUrl="https://tasks-database-3.onrender.com/add-task"
    const res=await axios.post(addTaskUrl,taskData)
    if (res.status===200){
      setUpdateTaskMsg(res.data)
      setTaskName("")
      fetchTaskSOnceFromDB()
    }
  }
  }

  const downloadTasks=()=>{
    const content=document.getElementById("tasks")
    var printWindow = window.open();
    printWindow.document.write('<html><head><title>Print</title>');
  printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Downlodable Content</h1>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  useEffect(()=>{
    fetchTaskSOnceFromDB()
  },[updateTaskStatusMsg])
  return (
    <div className='bg-cont'>
      <nav >
        <img alt="logo" src="https://media.licdn.com/dms/image/D560BAQHBSZ1Apw7WrQ/company-logo_200_200/0/1707289640489/shanture_logo?e=1726704000&v=beta&t=FEAInODrJH79ZSIhA3DL-xVmZQ8K12fh8wxEzo9b1x8"/>
      
      <h1 className='heading'>To-Do List</h1>
      </nav>
      <button onClick={downloadTasks}>Download</button>
      <div  className='task-input-container'>
        
          <input value={taskName} onChange={(event)=>setTaskName(event.target.value)} className='task-input' type='text' placeholder='Add Task' />
        
          <button onClick={addTask}>Add</button>
      </div>
      <p className='msg'>DB MSG:{updateTaskStatusMsg}</p>
      <ul id="tasks" className='show-tasks'>
        {tasks.map((task)=><TaskItem taskDetails={task} key={task.id} setUpdateTaskMsg={setUpdateTaskMsg} fetchTaskSOnceFromDB={fetchTaskSOnceFromDB}/>)}
      </ul>
      </div>
  )
}

export default App;