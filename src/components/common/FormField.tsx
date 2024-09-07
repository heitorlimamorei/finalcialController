interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className=" flex flex-col my-1 w-full">
      <label className={`text-lg mb-1 font-bold ${error && 'text-red-400'}`}>
        {label}
        {required && '*'}
      </label>
      {children}
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
}
