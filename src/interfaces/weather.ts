export const Municipality = ["北京", "上海", "天津", "重庆", "香港", "澳门", "台湾"];

export const wiMapping: Record<string, string> = {
  '100': 'wi:day-sunny',          // 晴
  '150': 'wi:night-clear',        // 晴（夜间）
  '101': 'wi:day-cloudy',         // 多云
  '151': 'wi:night-alt-cloudy',   // 多云（夜间）
  '102': 'wi:cloud',              // 阴
  '305': 'wi:day-rain-mix',       // 小雨
  '306': 'wi:rain',               // 中雨
  '307': 'wi:showers',            // 大雨
  '400': 'wi:snow',               // 小雪
  '401': 'wi:sleet',              // 中雪
  '402': 'wi:snow-wind',          // 大雪
  '500': 'wi:fog',                // 雾
  '504': 'wi:smoke',              // 霾
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
  const weatherMap: Record<string, string> = {
    '晴': '100',
    '多云': '101', 
    '阴': '102',
    '小雨': '305',
    '中雨': '306',
    '大雨': '307',
    '暴雨': '308',
    '雷阵雨': '301',
    '小雪': '400',
    '中雪': '401',
    '大雪': '402',
    '雾': '500',
    '霾': '504'
  };
  
  for (const [key, value] of Object.entries(weatherMap)) {
    if (weatherType.includes(key)) {
      return value;
    }
  }

  return '100';
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
