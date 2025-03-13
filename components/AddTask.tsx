import { useState } from "react"
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native"
import { Plus } from "lucide-react-native"

type AddTaskProps = {
    onAddTask: (title: string, description?: string) => void
}

const AddTask = ({ onAddTask }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTask = () => {
        if (title.trim()) {
            onAddTask(title, description);
            setTitle("");
            setDescription("");
            Keyboard.dismiss();
        }
    }

    return (
        <View className="flex-row p-4 border-t border-gray-200 bg-white">
            <TextInput
                className="flex-1 h-12 border border-gray-300 rounded-lg px-4 text-base bg-gray-50"
                placeholder="Add a new task..."
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={handleAddTask}
                returnKeyType="done"
            />
            <TouchableOpacity
                className={`w-12 h-12 rounded-full ml-3 justify-center items-center ${title.trim() ? "bg-green-400" : "bg-gray-200"}`}
                onPress={handleAddTask}
                disabled={!title.trim()}
            >
                <Plus size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default AddTask;