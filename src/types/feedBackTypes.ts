export interface IFeedBackItemProps {
  id: string;
  email: string;
  user_name: string;
  user_url: string;
  stars: number;
  text: string;
  featuresImprovement: string;
  appHasBeenShared: boolean;
  continued_using: boolean;
  financial_management_improved: number;
  did_pan_before: boolean;
}

export interface INewFeedBackProps {
  user_name: string;
  email: string;
  user_url: string;
  stars: number;
  text: string;
  featuresImprovement: string;
  appHasBeenShared: boolean;
  continued_using: boolean;
  financial_management_improved: number;
  did_pan_before: boolean;
}

export interface surveyFeedBackSubmitProps {
  stars: number;
  text: string;
  featuresImprovement: string;
  appHasBeenShared: boolean;
  continued_using: boolean;
  financial_management_improved: number;
  did_pan_before: boolean;
}

export interface ISurveyStatsResp {
  Means: {
      starsMean: number;
      financialManagementImprovedDataMean: number;
  };
  Percents: {
      did_pan_beforePercent: number;
      appHasBeenSharedPercent: number;
      continued_usingPercent: number;
  };
  sample_length: number;
}