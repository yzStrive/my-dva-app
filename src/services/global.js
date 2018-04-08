import { stringify } from "qs"
import request from "../utils/request"

export async function getFirstLevelMenu() {
  return request('/api/bp/systems/scopes',{
    method:'post',
    body:{
    }
  })
}

export async function getSecondaryMenu() {
  return request(`/api/bp/systems/scopes/menus`,{
    method:'post',
    body:{}
  })
}
