<template>
  <div class="weather" v-if="weatherData.city && weatherData.weather">
    <span>{{ weatherData.city }}&nbsp;</span>
    <span>{{ weatherData.weather }}&nbsp;</span>
    <span>{{ weatherData.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{ weatherData.windDirection }}&nbsp;
    </span>
    <span class="sm-hidden">{{ weatherData.windPower }}</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { getNsmaoWeather } from "@/api";
import { Error } from "@icon-park/vue-next";

const mainKey = import.meta.env.VITE_WEATHER_KEY;

// 天气数据
const weatherData = reactive({
  city: null,
  weather: null,
  temperature: null,
  windDirection: null,
  windPower: null,
});

// 获取天气数据
const getWeatherData = async () => {
  try {
    const result = await getNsmaoWeather(mainKey);
    if (result.code !== 200) {
      throw result.msg || "天气查询失败";
    }
    const data = result.data;
    weatherData.city = data.city;
    weatherData.weather = data.weather;
    weatherData.temperature = data.temperature;
    weatherData.windDirection = data.wind_direction;
    weatherData.windPower = data.wind_power;
  } catch (error) {
    console.error("天气信息获取失败:" + error);
    onError("天气信息获取失败");
  }
};

// 报错信息
const onError = (message) => {
  ElMessage({
    message,
    icon: h(Error, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
  console.error(message);
};

onMounted(() => {
  getWeatherData();
});
</script>
