import { Input } from "@/components/ui/input";

export function SearchInput({ onChange }: { onChange: (value: string) => void }) {
  return (
    <Input
      className="w-1/3 rounded-md py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
      placeholder="Тикет..."
      type="text"
      onChange={(event) => onChange(event.target.value)}
    />
  );
}