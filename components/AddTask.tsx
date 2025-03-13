import { useState } from "react"
import { View, TextInput, TouchableOpacity, Modal, Text, Pressable } from "react-native"
import { Plus, Eye, X } from "lucide-react-native"
import { theme } from "./util/theme"

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
        }
    }

    const togglePreview = () => {
        if (title.trim()) {
            setShowPreview(!showPreview)
        }
    }

    return (
        <>
            <View
                className="p-4 border-t"
                style={{
                    borderTopColor: theme.border,
                    backgroundColor: theme.card,
                }}
            >
                <TextInput
                    className="h-12 border rounded-lg px-4 text-base mb-2"
                    style={{
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                        color: theme.text,
                    }}
                    placeholder="Task title..."
                    placeholderTextColor={theme.textLight}
                    value={title}
                    onChangeText={setTitle}
                    returnKeyType="next"
                />

                <TextInput
                    className="h-20 border rounded-lg px-4 py-3 text-base mb-3"
                    style={{
                        borderColor: theme.border,
                        backgroundColor: theme.background,
                        color: theme.text,
                    }}
                    placeholder="Description (optional)..."
                    placeholderTextColor={theme.textLight}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                />

                <View className="flex-row justify-end">
                    <TouchableOpacity
                        className="h-10 rounded-lg px-4 mr-2 justify-center items-center flex-row"
                        style={{
                            backgroundColor: title.trim() ? theme.border : theme.background,
                        }}
                        onPress={togglePreview}
                        disabled={!title.trim()}
                    >
                        <Eye size={18} color={title.trim() ? theme.text : theme.textLight} />
                        <Text
                            className="ml-2"
                            style={{
                                color: title.trim() ? theme.text : theme.textLight,
                            }}
                        >
                            Preview
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="h-10 rounded-lg px-4 justify-center items-center flex-row"
                        style={{
                            backgroundColor: title.trim() ? theme.primary : theme.border,
                        }}
                        onPress={handleAddTask}
                        disabled={!title.trim()}
                    >
                        <Plus size={18} color="#fff" />
                        <Text className="ml-2 text-white font-medium">Add Task</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* preview modal */}
            <Modal animationType="fade" transparent={true} visible={showPreview} onRequestClose={() => setShowPreview(false)}>
                <Pressable className="flex-1 bg-black/50 justify-center items-center p-5" onPress={() => setShowPreview(false)}>
                    <Pressable className="w-full max-w-md rounded-xl p-5 shadow-xl" style={{ backgroundColor: theme.card }}>
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-xl font-bold" style={{ color: theme.primary }}>
                                Task Preview
                            </Text>
                            <TouchableOpacity onPress={() => setShowPreview(false)}>
                                <X size={20} color={theme.textLight} />
                            </TouchableOpacity>
                        </View>

                        <View className="h-px w-full mb-4" style={{ backgroundColor: theme.border }} />

                        <View className="mb-5">
                            <Text className="text-sm mb-1" style={{ color: theme.textLight }}>
                                Title
                            </Text>
                            <Text className="text-lg font-medium" style={{ color: theme.text }}>
                                {title}
                            </Text>

                            {description.trim() && (
                                <View className="mt-3">
                                    <Text className="text-sm mb-1" style={{ color: theme.textLight }}>
                                        Description
                                    </Text>
                                    <Text className="text-base" style={{ color: theme.text }}>
                                        {description}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View className="flex-row justify-end">
                            <TouchableOpacity
                                className="py-2 px-4 rounded-lg mr-2"
                                style={{ backgroundColor: theme.border }}
                                onPress={() => setShowPreview(false)}
                            >
                                <Text style={{ color: theme.text }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="py-2 px-4 rounded-lg"
                                style={{ backgroundColor: theme.primary }}
                                onPress={() => {
                                    setShowPreview(false)
                                    handleAddTask()
                                }}
                            >
                                <Text className="text-white font-medium">Add Task</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

export default AddTask;