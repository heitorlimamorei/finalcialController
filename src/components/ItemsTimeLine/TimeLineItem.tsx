import { memo } from 'react';
import { sheetItemProps } from "../../types/sheetTypes";
import Item from './Item';

interface ITimeLineProps {
  date: string;
  items: sheetItemProps[];
}

const TimeLineItem = ({date, items}: ITimeLineProps) => {
  return (
    <li className=''>
      <h1>
        {date}
      </h1>
      <ul>
        {items.map(item => <Item key={item.id} item={item} />)}
      </ul>
    </li>
  )
}

export default memo(TimeLineItem);