type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  return <button type="button" {...props} />;
}