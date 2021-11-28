<template>
<div>
  <div class="czmb">
    <el-input placeholder="请输入角色英文名称" v-model="role.name">
      <template slot="prepend">ROLE_</template>
    </el-input>
    <el-input placeholder="请输入角色中文名称" v-model="role.nameZh" @keydown.enter.native="addRole">

    </el-input>
    <el-button type="primary" size="small" icon="el-icon-plus" @click="addRole">添加</el-button>
  </div>
  <div class="permissMain">
    <el-collapse  v-model="activename" accordion @change="change">
      <el-collapse-item :title=r.nameZh :name=r.id v-for="(r,index) in roles" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>可访问资源</span>
            <el-button style="float: right; padding: 3px 0;color: red" type="" icon="el-icon-delete" @click="deleteRole(r)" ></el-button>
          </div>
         <div>
           <el-tree show-checkbox  accordion
                    :data="allMenus"
                    :props="defaultProps"
                    ref="tree"
                    :key="index"
                    node-key="id"
                    :default-checked-keys="selectedMenus"></el-tree>
           <div style="display: flex;justify-content: flex-end">
             <el-button type="primary" @click="updateRoles(r.id,index)">确认修改</el-button>
           </div>
         </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>

<script>
export default {
  name: "PermissMana",
  mounted() {
    this.initRoles();
  },
  data(){
  return{
    role:{
      name:'',
      nameZh:'',
      id:''
    },
    roles:[],
    allMenus: [],
    defaultProps:{
      children:'children',
      label:'name'
    },
    selectedMenus:[],
    activename:''
    }
  },
  methods:{
    deleteRole(role){
      this.$confirm('此操作将永久删除['+role.nameZh+']角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletedRequest('/system/basic/permiss/'+role.id).then(resp=>{
          if(resp){
            this.initRoles();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateRoles(rid,index){
      //获得整个tree中当前循环的tree
      let tree=this.$refs.tree[index]
      //获得当前循环的tree被选中的子节点的数组
      let selectedKeys=tree.getCheckedKeys(true)
      let url='/system/basic/permiss/'+'?rid='+rid;
      selectedKeys.forEach(item=>{
        url+= '&mids=' + item;
      })
      this.putRequest(url).then(resp=>{
        if(resp){
          this.initRoles();
          this.activename=-1;
        }
      })
    },
    getSelectedMenusByid(rid){
      this.getRequest('/system/basic/permiss/mid/'+rid).then(resp=>{
        if(resp){
          this.selectedMenus=resp;
        }
      })
    },
    addRole(){
      if(''==this.role.name && ''==this.role.nameZh){
        this.$message.error("请输入角色英文名和角色中文名");
        return;
      }
      this.postRequest('/system/basic/permiss/role',this.role).then(resp=>{
        if(resp){
          this.initRoles();
          this.role='';
        }
      })

    },
    change(rid){
       if(rid){
         this.initAllmenus();
         this.getSelectedMenusByid(rid);
       }
    },
    initRoles(){
      this.getRequest('/system/basic/permiss/').then(resp=>{
        if(resp){
          this.roles=resp;

        }
      })
    },
    initAllmenus(){
      this.getRequest("/system/basic/permiss/menus").then(resp=>{
        if(resp){
          this.allMenus=resp;
        }

      })
    }
  }
}
</script>

<style scoped>
.czmb{
  display: flex;
  justify-content: flex-start;
}
.czmb .el-input{
  width: 300px;
  margin-right: 6px;
}
.permissMain{
  margin-top: 10px;
  width: 700px;
}
</style>