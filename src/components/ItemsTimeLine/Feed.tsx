import { memo } from 'react';
import useSheets from '../../data/hook/useSheets';
import _ from "lodash";
import { firestoreTimestampToDate, formatDate } from '../../utils/dateMethods';
import TimeLineItem from './TimeLineItem';

const TimeLineFeed = () => {
  const { sheet } = useSheets();
  const items  = sheet.items;

  const getTimeLine = () => {
    const getItemsByDate = () => _.groupBy(items, (item) => formatDate(firestoreTimestampToDate(item.date)));
    const agroupedItems = Object.entries(getItemsByDate()).map((item) => ({date: item[0], items: item[1]}));
    const sortItemsByDate = _.sortBy(agroupedItems, (day) => firestoreTimestampToDate(day.items[0].date));
    return sortItemsByDate;
  };

  const renderTimeLine = () => {
    const timeLine = getTimeLine();
    return timeLine.map(({date, items}) => <TimeLineItem key={date} date={date} items={items} />);
  };

  return (
    <div>
      <ul>
        {renderTimeLine()}
      </ul>
    </div>
  )
}

export default memo(TimeLineFeed);