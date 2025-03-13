import { useState } from "react"
import { View, TextInput, TouchableOpacity, Keyboard, Modal, Text } from "react-native"
import { Plus, Eye } from "lucide-react-native"

type AddTaskProps = {
    onAddTask: (title: string, description?: string) => void
}

const AddTask = ({ onAddTask }: AddTaskProps) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [showPreview, setShowPreview] = useState(false)

    const handleAddTask = () => {
        if (title.trim()) {
            onAddTask(title, description)
            setTitle("")
            setDescription("")
            Keyboard.dismiss()
        }
    }

    const togglePreview = () => {
        if (title.trim()) {
            setShowPreview(!showPreview)
        }
    }

    return (
        <>
            <View className="p-4 border-t border-gray-200 bg-white">
                <TextInput
                    className="h-12 border border-gray-300 rounded-lg px-4 text-base bg-gray-50 mb-2"
                    placeholder="Task title..."
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                />

                <TextInput
                    className="h-20 border border-gray-300 rounded-lg px-4 py-2 text-base bg-gray-50 mb-3"
                    placeholder="Description (optional)..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />

                <View className="flex-row justify-end">
                    <TouchableOpacity
                        className={`h-10 rounded-lg px-4 mr-2 justify-center items-center flex-row ${title.trim() ? "bg-gray-200" : "bg-gray-100"}`}
                        onPress={togglePreview}
                        disabled={!title.trim()}
                    >
                        <Eye size={18} color={title.trim() ? "#333" : "#999"} />
                        <Text className={`ml-2 ${title.trim() ? "text-gray-800" : "text-gray-400"}`}>Preview</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`h-10 rounded-lg px-4 justify-center items-center flex-row ${title.trim() ? "bg-green-500" : "bg-gray-200"}`}
                        onPress={handleAddTask}
                        disabled={!title.trim()}
                    >
                        <Plus size={18} color="#fff" />
                        <Text className="ml-2 text-white font-medium">Add Task</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Preview Modal */}
            <Modal animationType="fade" transparent={true} visible={showPreview} onRequestClose={() => setShowPreview(false)}>
                <View className="flex-1 bg-black/50 justify-center items-center p-5">
                    <View className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">
                        <Text className="text-xl font-bold mb-1">Task Preview</Text>
                        <View className="h-px bg-gray-200 w-full mb-4" />

                        <View className="mb-5">
                            <Text className="text-sm text-gray-500 mb-1">Title</Text>
                            <Text className="text-lg font-medium">{title}</Text>

                            {description.trim() && (
                                <View className="mt-3">
                                    <Text className="text-sm text-gray-500 mb-1">Description</Text>
                                    <Text className="text-base">{description}</Text>
                                </View>
                            )}
                        </View>

                        <View className="flex-row justify-end">
                            <TouchableOpacity className="px-4 py-2 rounded-lg bg-gray-200 mr-2" onPress={() => setShowPreview(false)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="px-4 py-2 rounded-lg bg-green-500"
                                onPress={() => {
                                    setShowPreview(false)
                                    handleAddTask()
                                }}
                            >
                                <Text className="text-white font-medium">Add Task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default AddTask