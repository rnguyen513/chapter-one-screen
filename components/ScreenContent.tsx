import { useState } from "react"
import { View, Text, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import TaskList from "./TaskList"
import AddTask from "./AddTask"
import EmptyState from "./EmptyState"
import { X } from "lucide-react-native"
import type { Task } from "./util/types"

const ScreenContent = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

    const addTask = (text: string, description?: string) => {
        if (text.trim().length === 0) return

        const newTask: Task = {
            id: Date.now().toString(),
            title: text.trim(),
            description: description?.trim() || undefined,
            completed: false,
        }

        setTasks([...tasks, newTask])
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    const confirmDelete = (task: Task) => {
        setTaskToDelete(task)
        if (Platform.OS != "web") {
            handleDeleteConfirm()
        }
    }

    const handleDeleteConfirm = () => {
        if (taskToDelete) {
            setTasks(tasks.filter((task) => task !== taskToDelete))
            setTaskToDelete(null)
        }
    }

    const handleDeleteCancel = () => {
        setTaskToDelete(null)
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <View className="p-5 pb-2.5">
                    <Text className="text-2xl font-bold text-gray-800">Task Manager</Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                        {tasks.filter((t) => t.completed).length > 0 && ` (${tasks.filter((t) => t.completed).length} completed)`}
                    </Text>
                </View>

                {tasks.length > 0 ? <TaskList tasks={tasks} onToggle={toggleTask} onDelete={confirmDelete} /> : <EmptyState />}

                <AddTask onAddTask={addTask} />

                {/* Delete confirmation modal - state is transferred from the bottom back to the root here (only on web)*/}
                {Platform.OS === "web" && taskToDelete !== null && (
                    <View className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <View className="bg-white rounded-lg p-5 m-4 max-w-sm w-full">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-bold">Delete Task</Text>
                                <TouchableOpacity onPress={handleDeleteCancel}>
                                    <X size={20} color="#666" />
                                </TouchableOpacity>
                            </View>
                            <Text className="mb-4">Are you sure you want to delete <Text className="font-bold text-red-400">{taskToDelete.title}</Text>?</Text>
                            <View className="flex-row justify-end space-x-2">
                                <TouchableOpacity className="py-2 px-4 rounded-md bg-gray-200 mr-2" onPress={handleDeleteCancel}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="py-2 px-4 rounded-md bg-red-500" onPress={handleDeleteConfirm}>
                                    <Text className="text-white">Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ScreenContent