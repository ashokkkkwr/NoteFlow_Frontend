import React from 'react'
import { logoLabel } from '@data/localization/common/logo'
import useLang from '@hooks/useLang'

export default function Logo() {
    const {lang} = useLang()
  return (
<>
    <div className='flex items-center space-x-2 mt-5 ml-5'>
  <span className="text-black text-4xl font-bold">
    {logoLabel.post[lang]}
  </span>
  <span className='text-red-500 text-4xl font-bold'>
    {logoLabel.flow[lang]}
  </span>
  </div>
</>
  )
}
