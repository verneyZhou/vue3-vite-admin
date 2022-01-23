import Cookies from 'js-cookie'
import Keys from '@/configs/key'


/**
 * 登录相关
 */
export function getToken(): string {
  return Cookies.get(Keys.token)
}

export function setToken(token: string): string {
  return Cookies.set(Keys.token, token)
}

export function removeToken(): void {
  return Cookies.remove(Keys.token)
}

/**
 * 主题配置
 */
export const getActiveTheme = () => Cookies.get(Keys.activeTheme)
export const setActiveTheme = (theme: string) => { Cookies.set(Keys.activeTheme, theme) }
