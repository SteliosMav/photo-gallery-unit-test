export interface Environment {
  env: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  api: string;
  requestAdditionalTimeDelay: number;
}
