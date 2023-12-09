import _ from 'lodash';
import { IOkrFrontProps, sheetItemProps } from '../../types/sheetTypes';
import { firestoreTimestampToDate, formatDate } from '../../utils/dateMethods';
import useSheets from './useSheets';

interface IGoalVisualizationProps {
  goal: IOkrFrontProps;
}

interface INormalizedItem {
  id: string;
  value: number;
  type: string;
  lastUpdate: Date;
  createdAt: Date;
}

interface IRawReportProps {
  date: string; // just an label
  items: INormalizedItem[];
}

export default function useGoalsVisualization({ goal }: IGoalVisualizationProps) {
  const { sheet } = useSheets();

  const normalizeItems = (items: sheetItemProps[]): INormalizedItem[] => {
    return items.map((item) => {
      const createdAt = firestoreTimestampToDate(item.date);
      return {
        id: item.id,
        value: item.value,
        type: item.type,
        createdAt: createdAt,
        lastUpdate: item.updatedAt ? firestoreTimestampToDate(item.updatedAt) : createdAt,
      };
    });
  };

  const normalizedItems = normalizeItems(sheet.items);

  const inDateItems = normalizedItems.filter((item) => {
    return item.lastUpdate >= goal.start_cycle && item.lastUpdate <= goal.end_cycle;
  });
  
  const filtredItems = inDateItems.filter((item) => item.type == goal.spentType);

  const getItemsByLastUpdate = (items: INormalizedItem[]) => {
    return _.groupBy(items, (item) => formatDate(item.lastUpdate));
  };

  const getAgrupedItems = (items: INormalizedItem[]) => {
    const entries = Object.entries(getItemsByLastUpdate(items));
    return entries.map((item) => ({
      date: item[0],
      items: item[1],
    }));
  };

  const agroupedItems = getAgrupedItems(filtredItems);

  const sortItemsByDate = _.sortBy(agroupedItems, (day) => day.items[0].lastUpdate);

  const getReports = (items: IRawReportProps[]) => {
    function calculateReportSucess(c: INormalizedItem[]){
      const sumItems = (citems: INormalizedItem[]) => _.sumBy(citems, (item) => item.value);
      const percentual = sumItems(c) / sumItems(inDateItems);
      return {
        sucess: (goal.value / 100) <= percentual, // refirnar e corrigir a questão de não vir do client se quer que seja >= percentual ou =< percentual.
        value: percentual
      }
    }

    return items.map(({ date, items }) => {
      const result = calculateReportSucess(items);
      return {
        label: date,
        dateId: items[0].lastUpdate,
        value: result.value,
        sucess: result.sucess
      };
    });
  };

  return getReports(sortItemsByDate);
}
