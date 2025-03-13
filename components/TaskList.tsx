import { FlatList } from "react-native"
import TaskItem from "./TaskItem"
import type { Task } from "./util/types"

type TaskListProps = {
    tasks: Task[]
    onToggle: (id: string) => void
    onDelete: (task: Task) => void
}

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TaskItem task={item} onToggle={() => onToggle(item.id)} onDelete={() => onDelete(item)} />
            )}
            className="flex-1"
            contentContainerClassName="px-4 py-2"
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        />
    )
}

export default TaskList;