import { parse } from "url"

const titles = [
  "Alipay",
  "Angular",
  "Ant Design",
  "Ant Design",
  "Bootstrap",
  "React",
  "Vue",
  "Webpack"
]
const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
]

const avatars2 = [
  "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
  "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
  "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
  "https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png",
  "https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png",
  "https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png",
  "https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png"
]

const covers = [
  "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
  "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
  "https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png",
  "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png"
]
const desc = [
  "那是一种内在的东西， 他们到达不了，也无法触及的",
  "希望是一个好东西，也许是最好的，好东西是不会消亡的",
  "生命就像一盒巧克力，结果往往出人意料",
  "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
  "那时候我只会想自己想要什么，从不想自己拥有什么"
]

const user = [
  "付小小",
  "曲丽丽",
  "林东东",
  "周星星",
  "吴加好",
  "朱偏右",
  "鱼酱",
  "乐哥",
  "谭小仪",
  "仲尼"
]

export function fakeList(count) {
  const list = []
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
      status: ["active", "exception", "normal"][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: "https://ant.design",
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
      members: [
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
          name: "曲丽丽"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
          name: "王昭君"
        },
        {
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
          name: "董娜娜"
        }
      ]
    })
  }

  return list
}

export function getFakeList(req, res, u) {
  let url = u
  if (!url || Object.prototype.toString.call(url) !== "[object String]") {
    url = req.url // eslint-disable-line
  }

  const params = parse(url, true).query

  const count = params.count * 1 || 20

  const result = fakeList(count)

  if (res && res.json) {
    res.json(result)
  } else {
    return result
  }
}

export const getNotice = [
  {
    id: "xxx1",
    title: titles[0],
    logo: avatars[0],
    description: "那是一种内在的东西，他们到达不了，也无法触及的",
    updatedAt: new Date(),
    member: "科学搬砖组",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx2",
    title: titles[1],
    logo: avatars[1],
    description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
    updatedAt: new Date("2017-07-24"),
    member: "全组都是吴彦祖",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx3",
    title: titles[2],
    logo: avatars[2],
    description: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
    updatedAt: new Date(),
    member: "中二少女团",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx4",
    title: titles[3],
    logo: avatars[3],
    description: "那时候我只会想自己想要什么，从不想自己拥有什么",
    updatedAt: new Date("2017-07-23"),
    member: "程序员日常",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx5",
    title: titles[4],
    logo: avatars[4],
    description: "凛冬将至",
    updatedAt: new Date("2017-07-23"),
    member: "高逼格设计天团",
    href: "",
    memberLink: ""
  },
  {
    id: "xxx6",
    title: titles[5],
    logo: avatars[5],
    description: "生命就像一盒巧克力，结果往往出人意料",
    updatedAt: new Date("2017-07-23"),
    member: "骗你来学计算机",
    href: "",
    memberLink: ""
  }
]

export const getActivities = [
  {
    id: "trend-1",
    updatedAt: new Date(),
    user: {
      name: "曲丽丽",
      avatar: avatars2[0]
    },
    group: {
      name: "高逼格设计天团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-2",
    updatedAt: new Date(),
    user: {
      name: "付小小",
      avatar: avatars2[1]
    },
    group: {
      name: "高逼格设计天团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-3",
    updatedAt: new Date(),
    user: {
      name: "林东东",
      avatar: avatars2[2]
    },
    group: {
      name: "中二少女团",
      link: "http://github.com/"
    },
    project: {
      name: "六月迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  },
  {
    id: "trend-4",
    updatedAt: new Date(),
    user: {
      name: "周星星",
      avatar: avatars2[4]
    },
    project: {
      name: "5 月日常迭代",
      link: "http://github.com/"
    },
    template: "将 @{project} 更新至已发布状态"
  },
  {
    id: "trend-5",
    updatedAt: new Date(),
    user: {
      name: "朱偏右",
      avatar: avatars2[3]
    },
    project: {
      name: "工程效能",
      link: "http://github.com/"
    },
    comment: {
      name: "留言",
      link: "http://github.com/"
    },
    template: "在 @{project} 发布了 @{comment}"
  },
  {
    id: "trend-6",
    updatedAt: new Date(),
    user: {
      name: "乐哥",
      avatar: avatars2[5]
    },
    group: {
      name: "程序员日常",
      link: "http://github.com/"
    },
    project: {
      name: "品牌迭代",
      link: "http://github.com/"
    },
    template: "在 @{group} 新建项目 @{project}"
  }
]

export default {
  getNotice,
  getActivities,
  getFakeList
}
export const getFirstLevelMenu = [
  {
    icon: " &#xe615;",
    id: 1,
    name: "配送",
    remark: "配送业务",
    scope: "express"
  },
  {
    icon: " &#xe615;",
    id: 1,
    name: "配送",
    remark: "配送业务1",
    scope: "express1"
  }
]
export const getSecondaryMenu = [
  {
    children: [
      {
        upMenuCode: "20100000",
        children: [],
        menuIcon: "search",
        menuUrl: "/express/order_list",
        menuCode: "20100100",
        menuLevel: 2,
        menuName: "订单查询",
        menuScope: "express"
      },
      {
        upMenuCode: "20100000",
        children: [],
        menuIcon: "swap",
        menuUrl: "/express/order_dispatch",
        menuCode: "20100200",
        menuLevel: 2,
        menuName: "订单调度",
        menuScope: "express"
      }
    ],
    menuCode: "20100000",
    menuIcon: "file",
    menuLevel: 1,
    menuName: "订单管理",
    menuScope: "express"
  },
  {
    children: [
      {
        upMenuCode: "20200000",
        children: [],
        menuIcon: "idcard",
        menuUrl: "/express/check_courier",
        menuCode: "20200100",
        menuLevel: 2,
        menuName: "配送员审核",
        menuScope: "express"
      },
      {
        upMenuCode: "20200000",
        children: [],
        menuIcon: "solution",
        menuUrl: "/express/manage_courier",
        menuCode: "20200200",
        menuLevel: 2,
        menuName: "配送员管理",
        menuScope: "express"
      }
    ],
    menuCode: "20200000",
    menuIcon: "team",
    menuLevel: 1,
    menuName: "配送员管理",
    menuScope: "express"
  },
  {
    children: [
      {
        upMenuCode: "20300000",
        children: [],
        menuIcon: "menu-unfold",
        menuUrl: "/express/delivery-settings",
        menuCode: "20300100",
        menuLevel: 2,
        menuName: "配送设置",
        menuScope: "express"
      }
    ],
    menuCode: "20300000",
    menuIcon: "setting",
    menuLevel: 1,
    menuName: "配送设置",
    menuScope: "express"
  },
  {
    children: [
      {
        upMenuCode: "20100000",
        children: [],
        menuIcon: "search",
        menuUrl: "/express1/order_list",
        menuCode: "20100100",
        menuLevel: 2,
        menuName: "订单查询",
        menuScope: "express1"
      },
      {
        upMenuCode: "20100000",
        children: [],
        menuIcon: "swap",
        menuUrl: "/express1/order_dispatch",
        menuCode: "20100200",
        menuLevel: 2,
        menuName: "订单调度",
        menuScope: "express1"
      }
    ],
    menuCode: "20100000",
    menuIcon: "file",
    menuLevel: 1,
    menuName: "订单管理",
    menuScope: "express1"
  },
  {
    children: [
      {
        upMenuCode: "20200000",
        children: [],
        menuIcon: "idcard",
        menuUrl: "/express1/check_courier",
        menuCode: "20200100",
        menuLevel: 2,
        menuName: "配送员审核",
        menuScope: "express1"
      },
      {
        upMenuCode: "20200000",
        children: [],
        menuIcon: "solution",
        menuUrl: "/express1/manage_courier",
        menuCode: "20200200",
        menuLevel: 2,
        menuName: "配送员管理",
        menuScope: "express1"
      }
    ],
    menuCode: "20200000",
    menuIcon: "team",
    menuLevel: 1,
    menuName: "配送员管理",
    menuScope: "express1"
  },
  {
    children: [
      {
        upMenuCode: "20300000",
        children: [],
        menuIcon: "menu-unfold",
        menuUrl: "/express1/delivery-settings",
        menuCode: "20300100",
        menuLevel: 2,
        menuName: "配送设置",
        menuScope: "express1"
      }
    ],
    menuCode: "20300000",
    menuIcon: "setting",
    menuLevel: 1,
    menuName: "配送设置",
    menuScope: "express1"
  }
]
