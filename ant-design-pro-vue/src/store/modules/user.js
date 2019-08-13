import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME,USER_INFO,USER_AUTH,SYS_BUTTON_AUTH } from "@/store/mutation-types"
import { welcome } from '@/utils/util'
import { queryPermissionsByUser } from '@/api/api'
const roleObj = {
  'id': 'admin',
  'name': '管理员',
  'describe': '拥有所有权限',
  'status': 1,
  'creatorId': 'system',
  'createTime': 1497160610259,
  'deleted': 0,
  'permissions': [{
    'roleId': 'admin',
    'permissionId': 'dashboard',
    'permissionName': '仪表盘',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'exception',
    'permissionName': '异常页面权限',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'result',
    'permissionName': '结果权限',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'profile',
    'permissionName': '详细页权限',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'table',
    'permissionName': '表格权限',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'import',
      'describe': '导入',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'form',
    'permissionName': '表单权限',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'order',
    'permissionName': '订单管理',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'permission',
    'permissionName': '权限管理',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'role',
    'permissionName': '角色管理',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'table',
    'permissionName': '桌子管理',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'query',
      'describe': '查询',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }, {
    'roleId': 'admin',
    'permissionId': 'user',
    'permissionName': '用户管理',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'import',
      'describe': '导入',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }, {
      'action': 'export',
      'describe': '导出',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  }]
}

roleObj.permissions.push({
  'roleId': 'admin',
  'permissionId': 'support',
  'permissionName': '超级模块',
  'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
  'actionEntitySet': [{
    'action': 'add',
    'describe': '新增',
    'defaultCheck': false
  }, {
    'action': 'import',
    'describe': '导入',
    'defaultCheck': false
  }, {
    'action': 'get',
    'describe': '详情',
    'defaultCheck': false
  }, {
    'action': 'update',
    'describe': '修改',
    'defaultCheck': false
  }, {
    'action': 'delete',
    'describe': '删除',
    'defaultCheck': false
  }, {
    'action': 'export',
    'describe': '导出',
    'defaultCheck': false
  }],
  'actionList': null,
  'dataAccess': null
})

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    permissionList: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          // 设置用户信息
          // commit('SET_ROLES', result.role)
          commit('SET_INFO', result.userInfo)
          commit('SET_NAME', { name: result.userInfo.username, welcome: welcome() })
          commit('SET_AVATAR', '/avatar2.jpg')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
/*
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }, */
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
          const result = roleObj;
          
          if (result && result.permissions.length > 0) {
            const role = roleObj
            role.permissions = result.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result)
            resolve(roleObj)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
      })
    },
    // 获取用户权限菜单
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        let v_token = Vue.ls.get(ACCESS_TOKEN);
        let params = {token:v_token};
        queryPermissionsByUser(params).then(response => {
          const menuData = response.result.menu;
          const authData = response.result.auth;
          const allAuthData = response.result.allAuth;
          // console.log(menuData);
          //Vue.ls.set(USER_AUTH,authData);
          sessionStorage.setItem(USER_AUTH,JSON.stringify(authData));
          sessionStorage.setItem(SYS_BUTTON_AUTH,JSON.stringify(allAuthData));
          if (menuData && menuData.length > 0) {
            commit('SET_PERMISSIONLIST', menuData)
          } else {
            reject('getPermissionList: permissions must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
