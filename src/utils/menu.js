
const firstLevel = 'first-leave-menu'
const sencondary = 'secondary-menu'
export default const getSecondaryMenu = ()=>{
  return localStorage.getItem(sencondary) || []
}
export default const setSecondaryMenu = (menu)=>{
  return localStorage.setItem(sencondary,menu)
}
export default const getFirstLevelMenu = ()=>{
  return localStorage.getItem(firstLevel) || []
}
export default const setFirstLevelMenu = (menu)=>{
  return localStorage.setItem(firstLevel,menu)
}
