import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
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
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState<IDefaultTask | null>(null)

    const handleAddTask = (newTask: IDefaultTask): void => {
        console.log("Add task clicked", newTask);
        setTasks([...tasks, newTask])
        setShowAddModal(false);

    }

    const handleEditTask = (task: IDefaultTask): void => {
        console.log(task);
        setTaskToUpdate(task);
        setShowAddModal(true);

    }
    return (

        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} />}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions onClickAdd={() => setShowAddModal(true)} />
                    <TaskList tasks={tasks} onEdit={handleEditTask} />
                </div>
            </div>
        </section>
    )
}
