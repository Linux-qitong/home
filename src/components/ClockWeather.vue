<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { config } from "../config";
import { Icon } from "@iconify/vue";
import type { City, Weather, WeatherAPIResponse } from "../interfaces/weather";
import { Municipality, Unloaded, wiMapping, getWeatherIconCode } from "../interfaces/weather"; 

const city = ref<City | Unloaded>(Unloaded.Loading);
const weatherNow = ref<Weather | Unloaded>(Unloaded.Loading);
const time = ref<string>("07:21");
const date = ref<string>("1919-08-10");
const loading = ref(false);

function dayProgress() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const passedMs = now.getTime() - start.getTime();
  const totalMs = end.getTime() - start.getTime();
  return { passed: passedMs, total: totalMs };
}

function monthProgress() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const passedMs = now.getTime() - start.getTime();
  const totalMs = end.getTime() - start.getTime();
  const totalDays = end.getDate();
  const passedDays = now.getDate();
  return { passed: passedDays, total: totalDays, passedMs, totalMs };
}

function yearProgress() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  const passedMs = now.getTime() - start.getTime();
  const totalMs = end.getTime() - start.getTime();
  const totalDays = 
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const passedDays = 
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { passed: passedDays, total: totalDays, passedMs, totalMs };
}

function weekProgress() {
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7;
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const passedMs = now.getTime() - start.getTime();
  const totalMs = end.getTime() - start.getTime();

  const passedDays = Math.floor(passedMs / (1000 * 60 * 60 * 24)) + 1;
  const totalDays = 7;

  return { passed: passedDays, total: totalDays, passedMs, totalMs };
}

function updateTimeDate() {
  const now = new Date();
  time.value = now.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const y = now.getFullYear();
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const d = now.getDate().toString().padStart(2, "0");
  const w = now.toLocaleDateString("zh-CN", { weekday: "short" });
  date.value = `${y}-${m}-${d} ${w}`;
}

function refreshWeather() {
  if (loading.value) return;
  loading.value = true;

  city.value = Unloaded.Loading;
  weatherNow.value = Unloaded.Loading;

  try {
    const url = new URL(config.weatherAPI);
    url.searchParams.append('key', config.weatherAPIKey);
    
    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'omit'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: WeatherAPIResponse) => {
      console.log('天气API响应数据:', data);
      
      if (data.code === 200 && data.data) {
        city.value = {
          country: "中国",
          province: data.data.province || '',
          city: data.data.city || '',
          district: data.data.district || '',
          ip: data.ip || ''
        };
        
        weatherNow.value = {
          humidity: data.data.humidity.toString(),
          icon: getWeatherIconCode(data.data.weather),
          temp: data.data.temperature.toString(),
          text: data.data.weather || '未知',
          windDir: data.data.wind_direction || '',
          windScale: data.data.wind_power || ''
        };
      } else {
        console.error('天气数据错误:', data.msg || '未知错误');
        city.value = Unloaded.Error;
        weatherNow.value = Unloaded.Error;
      }
    })
    .catch(error => {
      console.error('天气API请求失败:', error);
      city.value = Unloaded.Error;
      weatherNow.value = Unloaded.Error;
    })
    .finally(() => {
      loading.value = false;
    });
  } catch (error) {
    console.error('天气API错误:', error);
    city.value = Unloaded.Error;
    weatherNow.value = Unloaded.Error;
    loading.value = false;
  }
}

const dayProg = computed(() => {
  const { passed, total } = dayProgress();
  const percent = (passed / total) * 100;
  return {
    passedHours: (passed / (1000 * 60 * 60)).toFixed(0),
    totalHours: 24,
    percent: percent.toFixed(2),
  };
});

const monthProg = computed(() => {
  const { passed, total } = monthProgress();
  const percent = (passed / total) * 100;
  return {
    passedDays: passed,
    totalDays: total,
    percent: percent.toFixed(2),
  };
});

const yearProg = computed(() => {
  const { passed, total } = yearProgress();
  const percent = (passed / total) * 100;
  return {
    passedDays: passed,
    totalDays: total,
    percent: percent.toFixed(2),
  };
});

const weekProg = computed(() => {
  const { passed, total } = weekProgress();
  const percent = (passed / total) * 100;
  return {
    passedDays: passed,
    totalDays: total,
    percent: percent.toFixed(2),
  };
});

onMounted(() => {
  updateTimeDate();
  const timer = setInterval(updateTimeDate, 1000);
  refreshWeather();
  onUnmounted(() => clearInterval(timer));
});

function formatLocationName(name?: string): string {
  if (!name) return '';
  return name.replace(/省|市/g, '');
}

function formatWeatherText(text?: string): string {
  if (!text) return '';
  const simplifiedMap: Record<string, string> = {
    '晴天': '晴',
    '阴天': '阴'
  };
  return simplifiedMap[text] || text;
}

const formattedCityName = computed(() => {
  if (city.value === Unloaded.Loading || city.value === Unloaded.Error) {
    return '';
  }
  
  const cityData = city.value as City;
  
  if (Municipality.includes(cityData.province || '')) {
    const provincePart = formatLocationName(cityData.province || '');
    const districtPart = cityData.district ? cityData.district.replace(/区$/, '') : '';
    return districtPart ? `${provincePart} ${districtPart}` : provincePart;
  }
  
  const parts: string[] = [];
  if (cityData.province) {
    parts.push(formatLocationName(cityData.province));
  }
  if (cityData.city && cityData.city !== cityData.province) {
    parts.push(formatLocationName(cityData.city));
  }
  if (cityData.district) {
    parts.push(formatLocationName(cityData.district).replace(/区$/, ''));
  }
  return parts.join(' ');
});

</script>

<template>
  <div class="flip-container">
    <div class="clock-weather card">
      <div class="front">
        <div class="clock">
          <div class="time">{{ time }}</div>
          <div class="date">{{ date }}</div>
        </div>
        <div class="weather">
          <Icon
            v-if="
              weatherNow === Unloaded.Loading || weatherNow === Unloaded.Error
            "
            icon="wi:na"
            class="weather-icon"
            width="30px"
            height="30px"
          />
          <Icon
            v-else
            :icon="wiMapping[weatherNow?.icon]"
            class="weather-icon"
            width="30px"
            height="30px"
          />
          <div class="weather-text">
            <div
              v-if="city !== Unloaded.Loading && city !== Unloaded.Error"
              class="city"
            >
              <span v-if="city.country !== '中国'">
                {{ city.country + " " }}
              </span>
              <span>{{ formattedCityName }}</span>
            </div>
            
            <div
              v-if="weatherNow !== Unloaded.Loading && weatherNow !== Unloaded.Error"
              class="temperature"
              :title="`${formatWeatherText(weatherNow.text)} ${weatherNow?.temp}°C`"
            >
              {{ formatWeatherText(weatherNow.text) + " " + weatherNow?.temp }}°C
            </div>
            <div v-else class="temperature">--°C</div>
          </div>
          <button
            class="refresh-btn"
            @click="refreshWeather"
            :disabled="loading"
            :title="loading ? '刷新中...' : '刷新天气'"
          >
            <Icon icon="mdi:refresh" width="20" height="20" />
          </button>
        </div>
      </div>

      <div class="back">
        <div class="time-during-item">
          <Icon icon="solar:sun-bold" width="16" height="16" />
          <span class="time-during-text">
            今日已过去 {{ dayProg.passedHours }} / {{ dayProg.totalHours }} 小时
          </span>
          <div class="time-during-bar">
            <div
              class="time-during-bar-inner"
              :style="{ width: dayProg.percent + '%' }"
            ></div>
          </div>
        </div>
        <div class="time-during-item">
          <Icon icon="lets-icons:date-fill" width="16" height="16" />
          <span class="time-during-text">
            本周已过去 {{ weekProg.passedDays }} / {{ weekProg.totalDays }} 天
          </span>
          <div class="time-during-bar">
            <div
              class="time-during-bar-inner"
              :style="{ width: weekProg.percent + '%' }"
            ></div>
          </div>
        </div>
        <div class="time-during-item">
          <Icon icon="mynaui:moon-solid" width="16" height="16" />
          <span class="time-during-text">
            本月已过去 {{ monthProg.passedDays }} / {{ monthProg.totalDays }} 天
          </span>
          <div class="time-during-bar">
            <div
              class="time-during-bar-inner"
              :style="{ width: monthProg.percent + '%' }"
            ></div>
          </div>
        </div>
        <div class="time-during-item">
          <Icon icon="material-symbols:star-rounded" width="16" height="16" />
          <span class="time-during-text">
            本年已过去 {{ yearProg.passedDays }} / {{ yearProg.totalDays }} 天
          </span>
          <div class="time-during-bar">
            <div
              class="time-during-bar-inner"
              :style="{ width: yearProg.percent + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-container {
  width: 180px;
  height: 150px;
  position: relative;
}

.clock-weather.card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 1s, color 0.3s, background-color 0.3s;
  transform-style: preserve-3d;
  position: relative;
}

.flip-container:hover .clock-weather.card {
  transform: rotateY(-180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-wrap: wrap;
  left: 0;
  top: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.front {
  transform: rotateY(0deg);
  text-align: center;
}

.back {
  transform: rotateY(180deg);
}

.weather {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-text {
  line-height: 22px;
  margin-left: 5px;
  margin-right: 10px;
}

.time {
  font-size: 30px;
  font-weight: 600;
  line-height: 32px;
}

.date {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.temperature,
.city {
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.refresh-btn {
  background: transparent;
  border: none;
  color: var(--font-color);
  cursor: pointer;
  margin: 8px;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 0;
  transition: 0.3s;
  display: none;
}

.refresh-btn:hover:not(:disabled) {
  color: var(--font-color-hover);
  outline: none;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.time-during-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.time-during-text {
  margin-left: 5px;
}

.time-during-text {
  font-size: 11px;
}

.time-during-bar {
  width: 100%;
  height: 2px;
  background-color: var(--background-color);
  margin: 2px 0;
  position: relative;
}

.time-during-bar-inner {
  height: 100%;
  background-color: var(--font-color);
  position: absolute;
  left: 0;
  top: 0;
}

@media screen and (max-width: 500px) {
  .flip-container {
    width: calc(100vw - 40px);
    height: 110px;
  }
  
  .clock-weather.card {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .front {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .clock {
    margin-right: 10px;
    transform: translateY(5px);
    margin-left: auto;
  }
  
  .weather {
    margin: auto auto auto 0;
  }
}

@media screen and (min-width: 360px) and (max-width: 500px) {
  .back {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    padding: 25px 15px;
  }
}

@media screen and (max-width: 360px) {
  .flip-container {
    height: 150px;
  }
  
  .weather {
    margin: auto !important;
  }
  
  .clock {
    margin: auto !important;
  }
  
  .time-during-item {
    padding: 0 5px;
  }
}

@media screen and (max-width: 250px) {
  .time {
    font-size: 24px !important;
  }
}
</style>
