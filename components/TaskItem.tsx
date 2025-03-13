import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import type { Task } from "./util/types"
import { Check, Trash2, ChevronDown, ChevronUp } from "lucide-react-native"
import { theme } from "./util/theme"

type TaskItemProps = {
    task: Task
    onToggle: () => void
    onDelete: () => void
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
    const [expanded, setExpanded] = useState(false)

    const toggleExpanded = () => {
        if (task.description) {
            setExpanded(!expanded)
        }
    }

    return (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm" style={{ backgroundColor: theme.card }}>
            <View className="flex-row items-center">
                <TouchableOpacity
                    className="w-6 h-6 rounded-full border-2 mr-3 justify-center items-center"
                    style={{
                        borderColor: task.completed ? theme.success : theme.borderDark,
                        backgroundColor: task.completed ? theme.success : "transparent",
                    }}
                    onPress={onToggle}
                >
                    {task.completed && <Check size={14} color="white" />}
                </TouchableOpacity>

                <TouchableOpacity className="flex-1" onPress={toggleExpanded} disabled={!task.description}>
                    <Text
                        className="text-base"
                        style={{
                            color: task.completed ? theme.textLight : theme.text,
                            textDecorationLine: task.completed ? "line-through" : "none",
                        }}
                    >
                        {task.title}
                    </Text>
                </TouchableOpacity>

                {task.description && (
                    <TouchableOpacity className="p-2 mr-1" onPress={toggleExpanded}>
                        {expanded ? (
                            <ChevronUp size={18} color={theme.textLight} />
                        ) : (
                            <ChevronDown size={18} color={theme.textLight} />
                        )}
                    </TouchableOpacity>
                )}

                <TouchableOpacity className="p-2" onPress={onDelete}>
                    <Trash2 size={18} color={theme.danger} />
                </TouchableOpacity>
            </View>

            {expanded && task.description && (
                <View className="mt-2 ml-9 border-l-2 pl-3" style={{ borderLeftColor: theme.border }}>
                    <Text style={{ color: theme.textLight }}>{task.description}</Text>
                </View>
            )}
        </View>
    )
}

export default TaskItem;