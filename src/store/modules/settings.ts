import setting from '@/settings'
import themeList from '@/configs/theme'
import { setActiveTheme } from '@/utils/cookie'

// 接口
interface SettingsState {
    showTagsView: boolean
    activeTheme: string
    themeList: {label: string, value: string}[]
}


const state: SettingsState = {
    activeTheme: '',
    showTagsView: setting.showTagsView,
    themeList: themeList
}

const mutations = {
    CHANGE_SETTING: (state: SettingsState, payload: {key: string, value: any}) => {
        const {key, value} = payload;
        switch(key) {
            case "activeTheme":
                // 检查这个主题在主题列表里是否存在
                state.activeTheme = state.themeList.find(v => v.value === value) ? value : state.themeList[0].value
                // 应用到 dom
                let wrapper = document.querySelector('.app-wrapper')
                console.log(wrapper.classList);
                wrapper.classList.forEach(v => {
                    v.indexOf('theme-') === 0 && wrapper.classList.remove(v);
                })
                wrapper.classList.add(`theme-${state.activeTheme}`)
                // 持久化
                setActiveTheme(state.activeTheme)
                break
            case "showTagsView":
                state.showTagsView = value;
                break;
            default:
                break;
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}