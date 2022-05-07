interface ErrorProps {
  message: string
}
function Error({ message }: ErrorProps) {
  return (
    <div className='flex items-center justify-center h-[67vh] w-screen'>
      <h2>{message}</h2>
    </div>
  )
}

export default Error
