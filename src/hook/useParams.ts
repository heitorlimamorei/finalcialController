export default function useParams() {
  const saveParams = (
    account: string | undefined,
    creditcard: string | undefined,
  ) => {
    if (account) {
      localStorage.setItem('currentSelectionType', 'account');
      localStorage.setItem('currentSelectionValue', account as string);
    } else if (creditcard) {
      localStorage.setItem('currentSelectionType', 'creditcard');
      localStorage.setItem('currentSelectionValue', creditcard as string);
    }
  };

  const getParams = () => {
    const currentSelectionType = localStorage.getItem('currentSelectionType');
    const currentSelectionValue = localStorage.getItem('currentSelectionValue');

    return { currentSelectionType, currentSelectionValue };
  };

  return { saveParams, getParams };
}
