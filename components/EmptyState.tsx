import { View, Text } from "react-native"
import { ClipboardList } from "lucide-react-native"
import { theme } from "./util/theme"

const EmptyState = () => {
    return (
        <View className="flex-1 justify-center items-center p-5">
            <ClipboardList size={64} color={theme.primary} className="opacity-70 mb-4" />
            <Text className="text-xl font-bold mb-2" style={{ color: theme.text }}>
                No tasks yet
            </Text>
            <Text className="text-base text-center max-w-[300px]" style={{ color: theme.textLight }}>
                Add your first task to get started
            </Text>
        </View>
    )
}

export default EmptyState;