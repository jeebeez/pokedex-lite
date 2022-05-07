interface Stats {
  header: string
  value: number
  max: number
}

function StatBar({ header, value, max }: Stats) {
  const percentValue = (value / max) * 100
  return (
    <div className='flex font-light text-xs gap-2 uppercase  items-center'>
      <h2 className='w-10'> {header}</h2>

      <div className='flex-grow bg-gray-200 ml-2 rounded-full h-4 dark:bg-gray-500'>
        <div className='bg-amber-400 h-4 rounded-full' style={{ width: `${percentValue}%` }} />
      </div>
      <span className='text-gray-400 text-center'>{max}</span>
    </div>
  )
}

export default StatBar
