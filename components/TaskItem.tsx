import { useState } from "react"
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native"
import type { Task } from "./util/types"
import { Check, Trash2, X } from "lucide-react-native"

type TaskItemProps = {
    task: Task
    onToggle: () => void
    onDelete: () => void
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
    const [showConfirm, setShowConfirm] = useState(false)

    const confirmDelete = () => {
        // Use different approach based on platform
        if (Platform.OS === "web") {
            setShowConfirm(true)
        } else {
            // Native platforms use Alert.alert
            Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: onDelete, style: "destructive" },
            ])
        }
    }

    const handleConfirm = () => {
        onDelete()
        setShowConfirm(false)
    }

    const handleCancel = () => {
        setShowConfirm(false)
    }

    return (
        <>
            <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow-sm">
                <TouchableOpacity
                    className={`w-6 h-6 rounded-full border-2 border-primary mr-3 justify-center items-center ${task.completed ? "bg-primary" : "bg-transparent"
                        }`}
                    onPress={onToggle}
                >
                    {task.completed && <Check size={16} color="green" />}
                </TouchableOpacity>

                <Text className={`flex-1 text-base ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>
                    {task.title}
                </Text>

                <TouchableOpacity className="p-1" onPress={confirmDelete}>
                    <Trash2 size={20} color="#ff4d4f" />
                </TouchableOpacity>
            </View>

            {/* Web-only confirmation dialog */}
            {Platform.OS === "web" && showConfirm && (
                <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <View className="bg-white rounded-lg p-5 m-4 max-w-sm w-full">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold">Delete Task</Text>
                            <TouchableOpacity onPress={handleCancel}>
                                <X size={20} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <Text className="mb-4">Are you sure you want to delete this task?</Text>
                        <View className="flex-row justify-end space-x-2">
                            <TouchableOpacity className="py-2 px-4 rounded-md bg-gray-200" onPress={handleCancel}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-2 px-4 rounded-md bg-red-500" onPress={handleConfirm}>
                                <Text className="text-white">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}

export default TaskItem;