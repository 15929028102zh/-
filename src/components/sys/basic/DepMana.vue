<template>
<div>
  <el-input
      placeholder="请输入部门名称搜索相关部门"
      v-model="filterText" style="width:420px">
  </el-input>

  <el-tree
      class="filter-tree"
      :data="dept"
      :props="defaultProps"
      :filter-node-method="filterNode"
      style="width: 420px"
      ref="tree">
  </el-tree>
</div>
</template>

<script>
export default {
  name: "DepMana",
  mounted() {
    this.initDept()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    initDept(){
      this.getRequest('/system/basic/department/').then(resp=>{
        if(resp){
          this.dept=resp
        }
      })
    }
  },
  data(){
    return{
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      filterText:'',
      dept:[]
    }
  }
}
</script>

<style scoped>

</style>