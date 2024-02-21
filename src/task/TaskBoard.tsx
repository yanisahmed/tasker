import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export type IDefaultTask = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    priority: string;
    isFavourite: boolean;
}

export default function TaskBoard() {
    const defaultTask: IDefaultTask = {
        id: crypto.randomUUID(),
        title: 'Learn React',
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero enim quidem sapiente dolorem aperiam quae, eius molestiae minus, voluptatum quia! Libero, praesentium corporis totam obcaecati sed fugit optio ipsa.",
        tags: ['web', 'react', 'mern'],
        priority: "High",
        isFavourite: true
    }
    const [tasks, setTasks] = useState([defaultTask] || null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState<IDefaultTask | null>(null)
    const [isFav, setIsFav] = useState<boolean>(false)

    const handleAddEditTask = (newTask: IDefaultTask, isAdd: boolean): void => {
        if (isAdd) {
            setTasks([...tasks, newTask])
        } else {
            setTasks(tasks.map((task) => {
                if (task.id === newTask.id) {
                    return newTask;
                }
                return task;
            }))
        }
        setShowAddModal(false);

    }

    const handleEditTask = (task: IDefaultTask): void => {
        setTaskToUpdate(task);
        setShowAddModal(true);

    }

    const handleTaskClose = () => {
        setTaskToUpdate(null);
        setShowAddModal(false);
    }

    const handleTaskDelete = (id: string): void => {
        const taskAfterDelete = tasks.filter(task => task.id !== id);
        setTasks(taskAfterDelete);

        // setTasks(tasks.filter((task) => {
        //     if (task.id !== id) {
        //         return task;
        //     }
        // }));
    }

    const handleDeleteAll = () => {
        tasks.length = 0;
        setTasks([...tasks]);
    }

    const handleFavourite = (id: string) => {

        const taskIndex = tasks.findIndex(task => task.id === id);
        console.log(taskIndex);
        const newTask = [...tasks]

        newTask[taskIndex].isFavourite = !newTask[taskIndex].isFavourite;
        setTasks(newTask);

        // const result = tasks.filter(task => {
        //     if (task.id === id) {
        //         task.isFavourite = (!task.isFavourite)
        //         return task;
        //     }
        //     return task;
        // })
        // setTasks([...result])
    }

    const handleSearch = (text: string): void => {
        const filteredText = tasks.filter(task => task.title.toLowerCase().includes(text.toLowerCase()))
        setTasks([...filteredText])
    }
    return (

        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onClose={handleTaskClose} />}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onClickAdd={() => setShowAddModal(true)} onClickDeleteAll={handleDeleteAll} />
                    {
                        tasks.length > 0 ? (<TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleTaskDelete} onFav={handleFavourite} />) : <NoTaskFound />
                    }
                </div>
            </div>
        </section>
    )
}
