interface TaskSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export function TaskSearch({
    searchTerm,
    onSearchChange,
}: TaskSearchProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    );
}