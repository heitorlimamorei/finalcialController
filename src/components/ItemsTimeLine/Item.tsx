import { memo } from 'react'
import { sheetItemProps } from '../../types/sheetTypes';

const Item = ({ item } : { item: sheetItemProps }) => {
  return (
   <li>
   <h1>
   {item.name}
   </h1>
   <p>
    R${item.value}
   </p>
   </li>
  )
}

export default memo(Item);