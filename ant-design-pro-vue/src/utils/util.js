import { bxAnaalyse } from '@/core/icons'
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

// 生成首页路由
export function generateIndexRouter(data) {
  let indexRouter = [{
            path: '/',
            name: 'index',
            component: () => import('@/layouts/BasicLayout'),
            // component: resolve => require(['@/layouts/BasicLayout'], resolve),
            meta: { title: '首页' },
            redirect: '/dashboard/analysis',
            children: [           
              {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/analysis',
                component: () => import('@/layouts/RouteView'),
                meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
                children: [
                  {
                    path: '/dashboard/analysis',
                    name: 'Analysis',
                    component: () => import('@/views/dashboard/Analysis'),
                    meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
                  },
                  // 外部链接
                  {
                    path: 'https://www.baidu.com/',
                    name: 'Monitor',
                    meta: { title: '监控页（外部）', target: '_blank' }
                  },                 
                  {
                    path: '/dashboard/userManager',
                    name: 'UserManager',
                    component: () => import('@/views/system/userManager/UserManager'),
                    meta: { title: '用户管理', keepAlive: true, permission: [ 'dashboard' ] }
                  },
                  {
                    path: '/dashboard/Department',
                    name: 'Department',
                    component: () => import('@/views/system/department/Department'),
                    meta: { title: '部门管理', keepAlive: true, permission: [ 'dashboard' ] }
                  },
                  {
                    path: '/dashboard/Permission',
                    name: 'Permission',
                    component: () => import('@/views/system/permission/Permission'),
                    meta: { title: '菜单管理', keepAlive: true, permission: [ 'dashboard' ] }
                  }
                ]
              },
               ...generateChildRouters(data),
               {
                path: '/other',
                name: 'otherPage',
                component: PageView,
                meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
                redirect: '/other/icon-selector',
                children: [
                  {
                    path: '/other/icon-selector',
                    name: 'TestIconSelect',
                    component: () => import('@/views/other/IconSelectorView'),
                    meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
                  },
                  {
                    path: '/other/list',
                    component: RouteView,
                    meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
                    redirect: '/other/list/tree-list',
                    children: [
                      {
                        path: '/other/list/tree-list',
                        name: 'TreeList',
                        component: () => import('@/views/other/TreeList'),
                        meta: { title: '树目录表格', keepAlive: true }
                      },
                      {
                        path: '/other/list/edit-table',
                        name: 'EditList',
                        component: () => import('@/views/other/TableInnerEditList'),
                        meta: { title: '内联编辑表格', keepAlive: true }
                      },
                      {
                        path: '/other/list/user-list',
                        name: 'UserList',
                        component: () => import('@/views/other/UserList'),
                        meta: { title: '用户列表', keepAlive: true }
                      },
                      {
                        path: '/other/list/role-list',
                        name: 'RoleList',
                        component: () => import('@/views/other/RoleList'),
                        meta: { title: '角色列表', keepAlive: true }
                      },
                      {
                        path: '/other/list/system-role',
                        name: 'SystemRole',
                        component: () => import('@/views/role/RoleList'),
                        meta: { title: '角色列表2', keepAlive: true }
                      },
                      {
                        path: '/other/list/permission-list',
                        name: 'PermissionList',
                        component: () => import('@/views/other/PermissionList'),
                        meta: { title: '权限列表', keepAlive: true }
                      }
                    ]
                  }
                  ]}
            ]
          },{
            "path": "*", "redirect": "/404", "hidden": true
          }]
          
    return indexRouter
  }
  
  // 生成嵌套路由（子路由）
  
  function  generateChildRouters (data) {
    const routers = [];
  for (var item of data) {
    let component = ''
    if(item.component.indexOf("layouts")>=0){
       component = item.component
    }else{
       component = 'views/'+item.component
    }

    // // eslint-disable-next-line
    // let URL = (item.meta.url|| '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
    // if (isURL(URL)) {
    //   item.meta.url = URL;
    // }

    let menu =  {
      path: item.path,
      name: item.name,
      redirect:item.redirect,
      component: resolve => require(['@/' + component+'.vue'], resolve),
      hidden:item.hidden,
      // component:() => import(component),
      meta: {
        title:item.meta.title ,
        icon: item.meta.icon,
        url:item.meta.url ,
        permissionList:item.meta.permissionList,
        keepAlive:item.meta.keepAlive
      }
    }
    if(item.alwaysShow){
      menu.alwaysShow = true;
      menu.redirect = menu.path;
    }
    if (item.children && item.children.length > 0) {
      menu.children = [...generateChildRouters( item.children)];
    }
    //--update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    //判断是否生成路由
    if(item.route && item.route === '0'){
      //console.log(' 不生成路由 item.route：  '+item.route);
      //console.log(' 不生成路由 item.path：  '+item.path);
    }else{
      routers.push(menu);
    }
    //--update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
  }
  return routers
  }

  const other = {
    path: '/other',
    name: 'otherPage',
    component: PageView,
    meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
    redirect: '/other/icon-selector',
    children: [
      {
        path: '/other/icon-selector',
        name: 'TestIconSelect',
        component: () => import('@/views/other/IconSelectorView'),
        meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/other/list',
        component: RouteView,
        meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
        redirect: '/other/list/tree-list',
        children: [
          {
            path: '/other/list/tree-list',
            name: 'TreeList',
            component: () => import('@/views/other/TreeList'),
            meta: { title: '树目录表格', keepAlive: true }
          },
          {
            path: '/other/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/other/TableInnerEditList'),
            meta: { title: '内联编辑表格', keepAlive: true }
          },
          {
            path: '/other/list/user-list',
            name: 'UserList',
            component: () => import('@/views/other/UserList'),
            meta: { title: '用户列表', keepAlive: true }
          },
          {
            path: '/other/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/other/RoleList'),
            meta: { title: '角色列表', keepAlive: true }
          },
          {
            path: '/other/list/system-role',
            name: 'SystemRole',
            component: () => import('@/views/role/RoleList'),
            meta: { title: '角色列表2', keepAlive: true }
          },
          {
            path: '/other/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      }
      ]}
