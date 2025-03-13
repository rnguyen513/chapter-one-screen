import { useState } from "react"
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native"
import type { Task } from "./util/types"
import { Check, Trash2, ChevronDown, ChevronUp } from "lucide-react-native"

type TaskItemProps = {
    task: Task
    onToggle: () => void
    onDelete: () => void
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
    const [expanded, setExpanded] = useState(false)

    const handleDelete = () => {
        // if not on web, we can use the native alert modal. otherwise use the custom one.
        if (Platform.OS !== "web") {
            Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: onDelete, style: "destructive" },
            ])
        } else {
            onDelete()
        }
    }

    const toggleExpanded = () => {
        if (task.description) {
            setExpanded(!expanded)
        }
    }

    return (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center">
                <TouchableOpacity
                    className={`w-6 h-6 rounded-full border-2 mr-3 justify-center items-center ${task.completed ? "bg-green-500 border-green-500" : "border-gray-300 bg-transparent"
                        }`}
                    onPress={onToggle}
                >
                    {task.completed && <Check size={14} color="white" />}
                </TouchableOpacity>

                <TouchableOpacity className="flex-1" onPress={toggleExpanded} disabled={!task.description}>
                    <Text className={`text-base ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>
                        {task.title}
                    </Text>
                </TouchableOpacity>

                {task.description && (
                    <TouchableOpacity className="p-2 mr-1" onPress={toggleExpanded}>
                        {expanded ? <ChevronUp size={18} color="#666" /> : <ChevronDown size={18} color="#666" />}
                    </TouchableOpacity>
                )}

                <TouchableOpacity className="p-2" onPress={handleDelete}>
                    <Trash2 size={18} color="#ff4d4f" />
                </TouchableOpacity>
            </View>

            {expanded && task.description && (
                <View className="mt-2 ml-9 border-l-2 border-gray-200 pl-3">
                    <Text className="text-gray-600">{task.description}</Text>
                </View>
            )}
        </View>
    )
}

export default TaskItem

