import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}

export type tasksObjectType = {
    [todolistID:string]:Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id:todoListID_1, title:"What to learn", filter:"all"},
        {id:todoListID_2, title:"What to buy", filter:"all"},
    ])


    let [tasks, setTasks] = useState<tasksObjectType>({
        [todoListID_1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todoListID_2]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    });


    function removeTask(todoListID:string, taskID: string) {
   /*     const copyArr = tasks[todoListID]
        const newArr = copyArr.filter(f=>f.id!==taskID)
        tasks[todoListID] = newArr
        setTasks({...tasks})*/

        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(f=>f.id!==taskID)})
    }

    function addTask(todoListID:string, title: string) {
        const newTask = {id:v1(), title, isDone:false}
        /*tasks[todoListID] = [newTask, ...tasks[todoListID] ]
        setTasks({...tasks})*/

        setTasks({...tasks, [todoListID]:[newTask, ...tasks[todoListID]]})
    }

    function changeStatus(todoListID:string, taskID:string, isDone: boolean) {
      setTasks({...tasks, [todoListID]:tasks[todoListID].map(m=>m.id==taskID?{...m, isDone}:m)})
    }

    const removeTodoList =(todoListID:string)=>{
        setTodoList(todoList.filter(m=>m.id!==todoListID))
    }



    function changeFilter(todoListID:string, value: FilterValuesType) {

      setTodoList(todoList.map(f=>f.id===todoListID? {...f, filter:value}:f))

    }




    return (
        <div className="App">
            {todoList.map(m=>{

                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                     tasksForTodolist = tasks[m.id].filter(t => !t.isDone );
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        id={m.id}
                        key={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                        removeTodoList={removeTodoList}
                    />
                )

            })}
        </div>
    );
}

export default App;
