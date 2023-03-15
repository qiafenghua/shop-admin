import { useCookies } from "@vueuse/integrations/useCookies";
const TokenKey = 'token'
const cookie = useCookies()

export function getToken() {
    return cookie.get('token')
}

export function setToken(token) {
    return cookie.set(TokenKey, token)
}

export function removeToken() {
    return cookie.remove(TokenKey)
}