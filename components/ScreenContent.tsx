import { useState } from "react"
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native"
import TaskList from "./TaskList"
import AddTask from "./AddTask"
import EmptyState from "./EmptyState"
import { X } from "lucide-react-native"
import { theme } from "./util/theme"
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
        // update task to be completed if id matches, otherwise keep iterating through tasks - O(n)
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    const confirmDelete = (task: Task) => {
        if (Platform.OS !== "web") {
            // For mobile, use Alert directly
            Alert.alert("Delete Task", `Are you sure you want to delete "${task.title}"?`, [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        // Delete directly without using state
                        setTasks(tasks.filter((t) => t.id !== task.id))
                    },
                },
            ])
        } else {
            // For web, use the modal
            setTaskToDelete(task)
        }
    }

    const handleDeleteConfirm = () => {
        if (taskToDelete) {
            //search for taskToDelete in tasks. keep all tasks where task.id isn't equal to the task to delete
            setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
            setTaskToDelete(null)
        }
    }

    const handleDeleteCancel = () => {
        setTaskToDelete(null)
    }

    return (
        <View className="flex-1">
            <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                    <View className="p-5 pb-2.5">
                        <Text className="text-2xl font-bold" style={{ color: theme.primary }}>
                            Ryan's Task Manager
                        </Text>
                        <Text className="text-sm mt-1" style={{ color: theme.textLight }}>
                            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                            {tasks.filter((t) => t.completed).length > 0 && ` (${tasks.filter((t) => t.completed).length} completed)`}
                        </Text>
                    </View>

                    {/* if there are tasks, display them otherwise show there are none */}
                    {tasks.length > 0 ? (
                        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={confirmDelete} />
                    ) : (
                        <EmptyState />
                    )}
                    
                    {/* component with fields to add new tasks */}
                    <AddTask onAddTask={addTask} />

                    {/* Delete confirmation modal - only on web. implemented here at the top level to be on top of everything */}
                    {Platform.OS === "web" && taskToDelete !== null && (
                        <View className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                            <View className="bg-white rounded-xl p-5 m-4 max-w-sm w-full shadow-lg">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-lg font-bold" style={{ color: theme.text }}>
                                        Delete Task
                                    </Text>
                                    <TouchableOpacity onPress={handleDeleteCancel}>
                                        <X size={20} color={theme.textLight} />
                                    </TouchableOpacity>
                                </View>
                                <Text className="mb-4" style={{ color: theme.text }}>
                                    Are you sure you want to delete{" "}
                                    <Text className="font-bold" style={{ color: theme.danger }}>
                                        {taskToDelete.title}
                                    </Text>
                                    ?
                                </Text>
                                <View className="flex-row justify-end">
                                    <TouchableOpacity
                                        className="py-2 px-4 rounded-lg mr-2"
                                        style={{ backgroundColor: theme.border }}
                                        onPress={handleDeleteCancel}
                                    >
                                        <Text style={{ color: theme.text }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="py-2 px-4 rounded-lg"
                                        style={{ backgroundColor: theme.danger }}
                                        onPress={handleDeleteConfirm}
                                    >
                                        <Text className="text-white font-medium">Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default ScreenContent;