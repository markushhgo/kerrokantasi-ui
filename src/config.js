import { pluginMap } from './shared_config.json';

const config = {
  pluginMap,
  languages: ['fi', 'sv', 'en'],
  activeLanguage: 'fi',
  publicUrl: (typeof window !== 'undefined' ? window.PUBLIC_URL : null) || 'http://localhost:8086/',
  apiBaseUrl: (typeof window !== 'undefined' ? window.API_BASE_URL : null) || 'http://localhost:8000/',
  uiConfig: typeof window !== 'undefined' ? window.UI_CONFIG : null,
  openIdClientId: typeof window !== 'undefined' ? window.OPENID_CLIENT_ID : null,
  openIdAudience: typeof window !== 'undefined' ? window.OPENID_AUDIENCE : null,
  openIdAuthority: typeof window !== 'undefined' ? window.OPENID_AUTHORITY : null,
  openIdApiTokenUrl: typeof window !== 'undefined' ? window.OPENID_APITOKEN_URL : null,
  heroImageURL: (typeof window !== 'undefined' ? window.HERO_IMAGE_URL : null)
    || 'http://materialbank.myhelsinki.fi/detail/1192/download/7',
  showAccessibilityInfo: typeof window !== 'undefined' ? window.SHOW_ACCESSIBILITY_INFO : false,
  showSocialMediaSharing: typeof window !== 'undefined' ? window.SHOW_SOCIAL_MEDIA_SHARING : true,
  enableHighContrast: typeof window !== 'undefined' ? window.ENABLE_HIGHCONTRAST : false,
  enableCookies: typeof window !== 'undefined' ? window.ENABLE_COOKIES : false,
  enableCookiebot: typeof window !== 'undefined' ? window.ENABLE_COOKIEBOT : false,
  cookiebotDataCbid: typeof window !== 'undefined' ? window.COOKIEBOT_DATA_CBID : null,
  enableStrongAuth: typeof window !== 'undefined' ? window.ENABLE_STRONG_AUTH : false,
  adminHelpUrl: typeof window !== 'undefined' ? window.ADMIN_HELP_URL : "",
  enableResponseCompression: typeof window !== 'undefined' ? window.ENABLE_RESPONSE_COMPRESSION : false,
  emptyCommentString: typeof window !== 'undefined' ? window.EMPTY_COMMENT_STRING : "",
  wmsBaseUrl: typeof window !== 'undefined' ? window.WMS_BASE_URL : "",
  wmsAttribution: typeof window !== 'undefined' ? window.WMS_ATTRIBUTION : "",
  wmsLayers: typeof window !== 'undefined' ? window.WMS_LAYERS : [],
};

export default config;
