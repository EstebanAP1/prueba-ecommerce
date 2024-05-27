import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-interactive select-none rounded-xl px-4 py-2 text-primary-black transition-all hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}>
      {children}
    </button>
  )
}
