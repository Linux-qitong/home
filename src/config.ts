export const config:Config = {
    title: "青稚の主页",
    author: "青稚",
    avatar: "/images/avatar.webp",
    description: "The harder you work, the luckier you get.",
    links: [
        {
            name: "博客",
            url: "https://blog.linux-qitong.top",
            icon: "fa7-solid:blog"
        },
         {
            name: "相册",
            url: "https://plog.linux-qitong.top",
            icon: "fa7-solid:image"
        },
        {
            name: "音乐",
            url: "https://music.linux-qitong.top",
            icon: "fa7-solid:music"
        },
        {
            name: "灵墨",
            url: "https://lingmo.org",
            icon: "fa7-solid:fish"
        },
        {
            name: "觅园",
            url: "https://doc.zen-harmony.top/",
            icon: "fa7-solid:star"
        },
    ],
    backDescription: "联系方式",
    socials: [
        {
            name: "Github",
            url: "https://github.com/Linux-qitong",
            icon: "simple-icons:github"
        },
        {
            name: "Gitee",
            url: "https://gitee.com/Linux-qitong",
            icon: "simple-icons:gitee"
        },
        {
            name: "BiliBili",
            url: "https://space.bilibili.com/486352915",
            icon: "simple-icons:bilibili"
        },
        
        {
            name: "Mail",
            url: "mailto:sweetcandymini@foxmail.com",
            icon: "mdi:email-outline"
        }
    ],
    lightBackgrounds: [
        "https://bu.dusays.com/2025/09/27/68d7d8b0b2d86.webp",
        "https://bu.dusays.com/2025/09/27/68d7d8b0adb6e.webp",
        "https://bu.dusays.com/2025/09/27/68d7d8b0959ff.webp",
    ],
    darkBackgrounds: [
        "https://bu.dusays.com/2025/09/27/68d7d8b0a1506.webp",
        "https://bu.dusays.com/2025/09/27/68d7d8b0a1579.webp",
        "https://bu.dusays.com/2025/09/27/68d7d8b0a4bdc.webp",
    ],
    weatherAPI: "https://api.nsmao.net/api/weather/query",
    weatherAPIKey: "ndHd1NJdhU6NaYzmlWsM441pKF",
    playlistIdWyy: "7039487815"
}
export interface Link {
    name: string;
    url: string;
    icon?: string;
    iconHtml?: string;
}

export interface Config {
    title: string;
    author: string;
    avatar: string;
    description: string;
    links: Link[];
    backDescription: string;
    socials: Link[];
    lightBackgrounds: string[];
    darkBackgrounds: string[];
    weatherAPI: string;
    weatherAPIKey: string;
    playlistIdWyy: string;
}
