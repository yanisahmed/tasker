
import { FaStar } from "react-icons/fa";
import { IDefaultTask } from "./TaskBoard";

type TaskListProps = {
    tasks: IDefaultTask[]
    onEdit: (task: IDefaultTask) => void
}
export default function TaskList({ tasks, onEdit }: TaskListProps) {
    console.log(tasks)
    return (
        <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks.map(task => (
                            <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                                <td>{task.isFavourite ? <FaStar color="yellow" /> : <FaStar color="gray" />}</td>
                                <td>{task.title}</td>
                                <td>
                                    <div>
                                        {task.description}
                                    </div>
                                </td>
                                <td>
                                    <ul className="flex justify-center gap-1.5 flex-wrap">
                                        {
                                            task.tags.map((tag) => (
                                                <li>
                                                    <span
                                                        className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">{tag}</span>
                                                </li>
                                            ))
                                        }
                                        {/* <li>
                                            <span
                                                className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">Web</span>
                                        </li>
                                        <li>
                                            <span
                                                className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#1C92FFB0] px-2.5 text-sm capitalize text-[#F4F5F6]">Python</span>
                                        </li>
                                        <li>
                                            <span
                                                className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#FE1A1AB5] px-2.5 text-sm capitalize text-[#F4F5F6]">API</span>
                                        </li> */}
                                    </ul>
                                </td>
                                <td className="text-center">{task.priority}</td>
                                <td>
                                    <div className="flex items-center justify-center space-x-3">
                                        <button className="text-red-500">Delete</button>
                                        <button onClick={() => onEdit(task)} className="text-blue-500">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}
