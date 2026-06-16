import * as Contentstack from 'contentstack';

const getRegion = (region: string = 'us'): Contentstack.Region => {
  const regionMap: { [key: string]: Contentstack.Region } = {
    'us': Contentstack.Region.US,
    'na': Contentstack.Region.US,
    'eu': Contentstack.Region.EU,
    'azure-na': Contentstack.Region.AZURE_NA,
    'azure-eu': Contentstack.Region.AZURE_EU,
  };
  return regionMap[region.toLowerCase()] || Contentstack.Region.US;
};

const stackConfig: Contentstack.Config = {
  api_key: process.env.CONTENTSTACK_API_KEY || '',
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.CONTENTSTACK_ENVIRONMENT || '',
  region: getRegion(process.env.CONTENTSTACK_REGION),
  branch: process.env.CONTENTSTACK_BRANCH || 'main',
};

const Stack = Contentstack.Stack(stackConfig);
export { Stack };