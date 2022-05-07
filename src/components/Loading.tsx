function Loading() {
  return (
    <div className='flex items-center justify-center h-[67vh] w-screen'>
      <div className='loader bg-orange-500 mr-1 animate-bounce' />
      <div className='loader bg-white border border-blue-500 mr-1 animate-bounce200' />
      <div className='loader bg-green-500 animate-bounce400' />
    </div>
  )
}

export default Loading
