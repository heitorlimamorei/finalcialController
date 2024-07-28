interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="my-2">
      <label className={`text-lg mb-2 font-bold ${error && 'text-red-400'}`}>
        {label}
        {required && '*'}
      </label>
      {children}
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
}
