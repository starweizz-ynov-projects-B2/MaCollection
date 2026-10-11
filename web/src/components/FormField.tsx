type FormFieldProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export default function FormField({ id, label, type, value, placeholder, onChange }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-semibold tracking-wide text-ink uppercase">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="border-2 border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-basil"
            />
        </div>
    );
}
