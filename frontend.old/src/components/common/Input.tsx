interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, ...props }: InputProps): JSX.Element {
    return (
        <div>
            {label && <label>{label}</label>}
            <input {...props} />
        </div>
    );
}
