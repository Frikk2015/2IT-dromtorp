interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: ButtonProps): JSX.Element {
    return <button {...props}>{children}</button>;
}

export default Button;
