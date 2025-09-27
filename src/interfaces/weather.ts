export const Municipality = ["北京", "上海", "天津", "重庆", "香港", "澳门", "台湾"];

// 保留现有的天气图标映射
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

// 城市信息接口
export interface City {
  city?: string;
  country: string;
  district?: string;
  ip: string;
  isp?: string;  
  province?: string;
}

// 天气信息接口
export interface Weather {
  cloud?: string;      
  dew?: string;        
  feelsLike?: string;  
  humidity: string;
  icon: string;
  obsTime?: string;  
  precip?: string;     
  pressure?: string;   
  temp: string;
  text: string;
  vis?: string;        
  wind360?: string;    
  windDir: string;
  windScale: string;
  windSpeed?: string;  
}

export enum Unloaded {
  Loading,
  Error,
}

// 天气类型映射函数
export function getWeatherIconCode(weatherType: string): string {
  // 简化的天气类型映射
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
  
  // 遍历映射表，查找匹配的天气类型
  for (const [key, value] of Object.entries(weatherMap)) {
    if (weatherType.includes(key)) {
      return value;
    }
  }
  
  // 默认返回晴天图标
  return '100';
}

// 天气API响应接口
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
