interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text?: string;
  colour?: string;
}

const Button = (props: ButtonProps) => {
  // @ts-ignore
  return <button {...props}>{props.text}</button>;
};

export default Button;
