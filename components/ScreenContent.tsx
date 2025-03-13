import { useState } from "react"
import { View, Text, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from "react-native"
import TaskList from "./TaskList"
import AddTask from "./AddTask"
import EmptyState from "./EmptyState"
import type { Task } from "./util/types"

const ScreenContent = () => {
	const [tasks, setTasks] = useState<Task[]>([])

	const addTask = (text: string, description?: string) => {
		if (text.trim().length === 0) return

		const newTask: Task = {
			id: Date.now().toString(),
			title: text.trim(),
			description: description,
			completed: false,
		}

		setTasks([...tasks, newTask])
	}

	const toggleTask = (id: string) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
	}

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<StatusBar barStyle="dark-content" />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
				<View className="p-5 pb-2.5">
					<Text className="text-3xl font-bold text-gray-800">Task Manager</Text>
					<Text className="text-base text-gray-600 mt-1">
						{tasks.length} task{tasks.length !== 1 ? "s" : ""}
						{tasks.filter((t) => t.completed).length > 0 && ` (${tasks.filter((t) => t.completed).length} completed)`}
					</Text>
				</View>

				{tasks.length > 0 ? <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} /> : <EmptyState />}

				<AddTask onAddTask={addTask} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default ScreenContent;