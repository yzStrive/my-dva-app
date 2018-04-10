import { getMeunMatcheys } from './SiderMenu';

const meun = ['/dashboard', '/userinfo', '/dashboard/name', '/userinfo/:id', '/userinfo/:id/info'];

describe('test meun match', () => {
  it('simple path', () => {
    expect(getMeunMatcheys(meun, '/dashboard')).toEqual(['/dashboard']);
  });
  it('error path', () => {
    expect(getMeunMatcheys(meun, '/dashboardname')).toEqual([]);
  });

  it('Secondary path', () => {
    expect(getMeunMatcheys(meun, '/dashboard/name')).toEqual(['/dashboard/name']);
  });

  it('Parameter path', () => {
    expect(getMeunMatcheys(meun, '/userinfo/2144')).toEqual(['/userinfo/:id']);
  });

  it('three parameter path', () => {
    expect(getMeunMatcheys(meun, '/userinfo/2144/info')).toEqual(['/userinfo/:id/info']);
  });
});


// const menus = [{"parent":"express","name":"订单管理","icon":"file","code":"20100000","children":[{"parent":"20100000","name":"订单查询","icon":"search","code":"20100100","children":[{"parent":"20100100","name":"查询child-1","icon":"swap","code":"20100101","path":"/express/order_list/child1"},{"parent":"20100100","name":"查询-child2","icon":"swap","code":"20100102","path":"/express/order_list/child/2"}]},{"parent":"20100000","name":"订单调度","icon":"swap","code":"20100200","path":"/express/order_dispatch"}],"hideInMenu":false},{"parent":"express","name":"配送员管理","icon":"team","code":"20200000","children":[{"parent":"20200000","name":"配送员审核","icon":"idcard","code":"20200100","path":"/express/check_courier"},{"parent":"20200000","name":"配送员管理","icon":"solution","code":"20200200","path":"/express/manage_courier"}],"hideInMenu":false},{"parent":"express","name":"配送设置","icon":"setting","code":"20300000","children":[{"parent":"20300000","name":"配送设置","icon":"menu-unfold","code":"20300100","path":"/express/delivery-settings"}],"hideInMenu":false}]
