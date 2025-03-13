import { View, Text } from "react-native"
import { ClipboardList } from "lucide-react-native"

const EmptyState = () => {
    return (
        <View className="flex-1 justify-center items-center p-5">
            <ClipboardList size={64} color="#ccc" />
            <Text className="text-xl font-bold text-gray-600 mt-4">No tasks yet</Text>
            <Text className="text-base text-gray-500 mt-2">Add a task to get started</Text>
        </View>
    )
}

export default EmptyState;