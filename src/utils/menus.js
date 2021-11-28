import {getRequest} from "@/utils/api";
export const initMenu=(router,store)=>{
    if(store.state.routes.length>0){
        return;
    }
    getRequest('/system/config/menu').then(data=>{
        if(data){
            let fmtRoutes=formatRoutes(data);
            //将格式化好的路由添加到路由中
            router.addRoutes(fmtRoutes);
            //将格式化好的路由存入vuex中
            store.commit('initRoutes',fmtRoutes);
        }
    })

}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children,
        } = router;
        if (children && children instanceof Array) {
            //递归
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            meta: meta,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.Vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.Vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.Vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.Vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.Vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.Vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
