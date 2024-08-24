import { ISurveyStatsResp } from '../../types/feedBackTypes';
import {
  transformArrayByField,
  calculateMeanList,
  sliceByBooleanFeature,
} from '../../utils/StatisticsMethods';
import feedbackService from './feedBack.service';

interface ISurveyDataProps {
  appHasBeenSharedData: boolean[];
  didPanBeforeData: boolean[];
  continued_using: boolean[];
  starsData: number[];
  financialManagementImprovedData: number[];
}

async function getSurveyData(year: string): Promise<ISurveyDataProps> {
  const feedback = await feedbackService.getFeedBacks(year);

  const appHasBeenShared: boolean[] = transformArrayByField(feedback, 'appHasBeenShared');
  const did_pan_before: boolean[] = transformArrayByField(feedback, 'did_pan_before');
  const continued_using: boolean[] = transformArrayByField(feedback, 'continued_using');
  const stars: number[] = transformArrayByField(feedback, 'stars');
  const financial_management_improved: number[] = transformArrayByField(
    feedback,
    'financial_management_improved',
  );

  return {
    appHasBeenSharedData: appHasBeenShared,
    didPanBeforeData: did_pan_before,
    continued_using: continued_using,
    starsData: stars,
    financialManagementImprovedData: financial_management_improved,
  };
}

function getSuverysMeans(surveyData: ISurveyDataProps) {
  const starsMean = calculateMeanList(surveyData.starsData);
  const financialManagementImprovedDataMean = calculateMeanList(
    surveyData.financialManagementImprovedData,
  );

  return {
    starsMean,
    financialManagementImprovedDataMean,
  };
}

function getPercentData(surveyData: ISurveyDataProps) {
  const did_pan_beforeSliced = sliceByBooleanFeature(surveyData.didPanBeforeData);
  const continued_usingSliced = sliceByBooleanFeature(surveyData.continued_using);
  const appHasBeenSharedSliced = sliceByBooleanFeature(surveyData.appHasBeenSharedData);

  const did_pan_beforePercent =
    did_pan_beforeSliced.postive.length / surveyData.didPanBeforeData.length;
  const appHasBeenSharedPercent =
    appHasBeenSharedSliced.postive.length / surveyData.appHasBeenSharedData.length;
  const continued_usingPercent = continued_usingSliced.postive.length / surveyData.continued_using.length;

  return {
    did_pan_beforePercent: did_pan_beforePercent * 100,
    appHasBeenSharedPercent: appHasBeenSharedPercent * 100,
    continued_usingPercent: continued_usingPercent * 100,
  };
}

export default async function getSurveyStatistics(year: string): Promise<ISurveyStatsResp> {
  const surveyData = await getSurveyData(year);

  const surveyMeans = getSuverysMeans(surveyData);
  const surveyPercents = getPercentData(surveyData);

  return {
    Means: {
      ...surveyMeans,
    },
    Percents: {
      ...surveyPercents,
    },
    sample_length: surveyData.starsData.length,
  };
}
