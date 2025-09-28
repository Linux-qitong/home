export const Municipality = ["北京", "上海", "天津", "重庆", "香港", "澳门", "台湾"];

export const wiMapping: Record<string, string> = {
  '100': 'wi:day-sunny',          // 晴
  '150': 'wi:night-clear',        // 晴（夜间）
  '101': 'wi:day-cloudy',         // 多云
  '151': 'wi:night-alt-cloudy',   // 多云（夜间）
  '102': 'wi:cloud',              // 阴
  '103': 'wi:cloudy',             // 云量大的阴天
  '104': 'wi:cloud',              // 极度阴（类似厚云）
  '300': 'wi:day-showers',        // 阵雨
  '301': 'wi:rains',              // 雷阵雨
  '302': 'wi:day-thunderstorm',   // 雷阵雨并伴有冰雹
  '303': 'wi:storm-showers',      // 强雷阵雨
  '304': 'wi:hail',               // 冰雹
  '305': 'wi:day-rain-mix',       // 小雨
  '306': 'wi:rain',               // 中雨
  '307': 'wi:showers',            // 大雨
  '308': 'wi:rain-wind',          // 暴雨
  '309': 'wi:heavy-rain',         // 大暴雨
  '310': 'wi:rain-mix',           // 特大暴雨
  '400': 'wi:snow',               // 小雪
  '401': 'wi:sleet',              // 中雪
  '402': 'wi:snow-wind',          // 大雪
  '403': 'wi:snowflake-cold',     // 暴雪
  '404': 'wi:rain-mix',           // 雨夹雪
  '405': 'wi:rain-mix',           // 雨加冰雹
  '406': 'wi:day-snow',           // 阵雪
  '407': 'wi:day-sleet',          // 阵雨夹雪
  '500': 'wi:fog',                // 雾
  '501': 'wi:smog',               // 霾
  '502': 'wi:windy',              // 沙尘暴
  '503': 'wi:sandstorm',          // 强沙尘暴
  '504': 'wi:snow-wind',          // 浮尘
  '505': 'wi:smoke',              // 扬尘
  '507': 'wi:cloudy-gusts',       // 强浓雾
  '508': 'wi:cloudy-gusts',       // 浓雾
  '900': 'wi:volcano',            // 热带风暴
  '901': 'wi:hurricane',          // 飓风
  '999': 'wi:na'                  // 未知
};

export interface City {
  city?: string;
  country: string;
  district?: string;
  ip: string;
  province?: string;
}

export interface Weather {
  humidity: string;
  icon: string;
  temp: string;
  text: string;
  windDir: string;
  windScale: string;
}

export enum Unloaded {
  Loading,
  Error,
}

export function getWeatherIconCode(weatherType: string): string {
  const now = new Date();
  const hour = now.getHours();
  const isNight = hour >= 18 || hour < 6;
  
  const weatherMap: Record<string, string> = {
    '晴': isNight ? '150' : '100',
    '多云': isNight ? '151' : '101',
    '阴': '102',
    '云量大的阴天': '103',
    '极度阴': '104',
    '阵雨': '300',
    '雷阵雨': '301',
    '雷阵雨并伴有冰雹': '302',
    '强雷阵雨': '303',
    '冰雹': '304',
    '小雨': '305',
    '中雨': '306',
    '大雨': '307',
    '暴雨': '308',
    '大暴雨': '309',
    '特大暴雨': '310',
    '小雪': '400',
    '中雪': '401',
    '大雪': '402',
    '暴雪': '403',
    '雨夹雪': '404',
    '雨加冰雹': '405',
    '阵雪': '406',
    '阵雨夹雪': '407',
    '雾': '500',
    '霾': '501',
    '沙尘暴': '502',
    '强沙尘暴': '503',
    '浮尘': '504',
    '扬尘': '505',
    '强浓雾': '507',
    '浓雾': '508',
    '热带风暴': '900',
    '飓风': '901',
    '未知': '999'   
  };
  
  if (weatherMap[weatherType]) {
    return weatherMap[weatherType];
  }
  
  for (const [key, value] of Object.entries(weatherMap)) {
    if (weatherType.includes(key)) {
      return value;
    }
  }
  
  return '999';
}

export interface WeatherAPIResponse {
  code: number;
  msg: string;
  data?: {
    province: string;
    city: string;
    district: string;
    update_time: string;
    weather: string;
    temperature: number;
    wind_direction: string;
    wind_power: string;
    humidity: number;
  };
  exec_time: number;
  ip: string;
}
