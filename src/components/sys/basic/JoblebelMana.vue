<template>
<div>
  <div>
    <el-input
        size="small"
        class="JoblebelMana"
        placeholder="添加职称"
        prefix-icon="el-icon-plus"
        v-model="jl.name"
        style="width: 200px"
        @keydown.enter.native="addJobLevel"
    ></el-input>
    <el-select v-model="jl.titleLevel" placeholder="职称选择" size="small" style="margin-left: 6px;margin-right: 6px">
      <el-option
          v-for="item in titleLevels"
          :key="item"
          :label="item"
          :value="item">
      </el-option>
    </el-select>
    <el-button type="primary" size="small" icon="el-icon-plus" @click="addJobLevel">添加</el-button>
  </div>
  <div>
    <el-table
        stripe
        border
        size="small"
        :data="jls"
        style="width: 70%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="编号"
          width="70">
      </el-table-column>
      <el-table-column
          prop="name"
          label="职称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="titleLevel"
          label="等级"
          width="120">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间"
      width="120">
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="是否启用"
          width="120">
       <template slot-scope="scope">
         <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
         <el-tag v-else type="danger">未启用</el-tag>
       </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button  size="small" style="margin-top: 6px" type="danger"
                :disabled="this.multipleSelection==0"
                @click="deletedMany()">批量删除</el-button>
  </div>
  <el-dialog
      title="修改职位"
      :visible.sync="dialogVisible"
      width="30%">
    <table>
      <tr>
        <td>
          <el-tag >职位名称</el-tag>
        </td>
        <td>
          <el-input v-model="updateJl.name" size="small" class="updateJl"></el-input>
        </td>
      </tr>
      <tr class="zcdj">
        <td>
          <el-tag >职位等级</el-tag>
        </td>
        <td>
          <el-select v-model="updateJl.titleLevel" placeholder="职称选择" size="small" style="margin-left: 6px;width: 100px">
            <el-option
                v-for="item in titleLevels"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          <el-tag  >是否启用</el-tag>
        </td>
        <td>
          <el-switch
              style="display: block;margin-left: 6px"
              v-model="updateJl.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="未启用"
              inactive-text="已启用">
          </el-switch>
        </td>
      </tr>
    </table>

    <span slot="footer" class="dialog-footer">
    <el-button @click="qvxiao()">取 消</el-button>
    <el-button type="primary" @click="updateJobLevel()">确 定</el-button>
  </span>
  </el-dialog>
</div>

</template>

<script>
export default {
  name: "JoblebelMana",
  mounted() {
    this.getAllJobLevel();
  },
  watch: {
    dialogVisible: function (){
      this.getAllJobLevel()
    }
  },
  data(){
    return{
      jl:{
        name:'',
        titleLevel:''

      },
      updateJl:{
        name:'',
        titleLevel: '',
        enabled:false
      },
      titleLevels:[
        '正高级',
        '副高级',
        '中级',
        '初级',
        '员级'
      ],
      jls:[],
      dialogVisible:false,
      multipleSelection:[]
    }
  },
  methods:{
    deletedMany(){
      this.$confirm('此操作将永久删除['+this.multipleSelection.length+']个职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids='?'
        this.multipleSelection.forEach(item=>{
          ids+='ids='+item.id+'&'
        })
        this.deletedRequest('/system/basic/joblevel/'+ids).then(resp=>{
          if(resp){
            this.getAllJobLevel();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val){
      this.multipleSelection=val;
    },
    qvxiao(){
      this.dialogVisible=false;
      this.getAllJobLevel();
    },
    handleEdit(index, row) {
      Object.assign(this.updateJl,row)
      this.dialogVisible=true;
      row.createDate='';
      this.updateJl=row;
    },handleDelete(index, row) {
      this.$confirm('此操作将永久删除['+row.name+']职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletedRequest('/system/basic/joblevel/'+row.id).then(resp=>{
          if(resp){
            this.getAllJobLevel();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getAllJobLevel(){
      this.getRequest('/system/basic/joblevel/').then(resp=>{
        if(resp){
          this.jls=resp;
        }
      })
    },
    addJobLevel(){
      if(this.jl.name!=''){
        this.postRequest('/system/basic/joblevel/',this.jl).then(resp=>{
          if(resp){
            this.getAllJobLevel();
          }
        })
      }
      this.$message.error("职位名称或职位等级不能为空");
      },
    updateJobLevel(){
      this.putRequest('/system/basic/joblevel/',this.updateJl).then(resp=>{
        if(resp){
          this.getAllJobLevel();
          this.dialogVisible=false;
        }
      })

    }
  }

}
</script>

<style scoped>
.updateJl{
  margin-left: 8px;
  width: 200px;
}
.zcdj{
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>