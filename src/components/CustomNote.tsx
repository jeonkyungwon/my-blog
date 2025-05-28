type Props = {
  message: string;
};

export default function CustomNote({ message }: Props) {
  return (
    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded">
      💡 {message}
    </div>
  );
}
