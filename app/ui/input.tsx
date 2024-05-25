import clsx from 'clsx'

export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'w-full rounded-md border border-primary-black bg-secondary-white p-2 focus:outline-none',
        className
      )}
      {...rest}
    />
  )
}
