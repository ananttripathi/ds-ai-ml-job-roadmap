export default function Spinner({ size = 5 }) {
  return (
    <div className={`w-${size} h-${size} border-2 border-neutral-200 border-t-neutral-800
                    dark:border-neutral-700 dark:border-t-brand-500 rounded-full animate-spin`} />
  )
}
