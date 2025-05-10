import { useDatesByRange } from '@/hooks/data-base/useDates';
import { addDays } from '@/lib/date.utils';
import { Text, View } from 'react-native';

export function Badge() {
  const startDate = new Date().toISOString().slice(0, 10);
  const endDate = addDays(startDate, 15).toISOString().slice(0, 10);
  const { data, isLoading, isError } = useDatesByRange(startDate, endDate);

  return (
    <View className="absolute -top-1  -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center z-10 shadow">
      <Text className="text-xs text-white">
        {isLoading && '\u221E'}
        {isError && '\u221E'}
        {data && data?.length < 99 ? data?.length : '\u221E'}
      </Text>
    </View>
  );
}
