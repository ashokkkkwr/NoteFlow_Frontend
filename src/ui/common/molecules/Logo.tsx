import React from 'react'
import { logoLabel } from '@data/localization/common/logo'
import useLang from '@hooks/useLang'

export default function Logo() {
    const {lang} = useLang()
  return (
<>
  <span className="text-lg font-bold text-gray-800 p-3 rounded-md ">
    {logoLabel.logo[lang]}
  </span>
</>
  )
}
