<template>
<div>
  <div>
    <el-input
        size="small"
        class="addPosInput"
        placeholder="添加职位"
        prefix-icon="el-icon-plus"
        v-model="pos.name"
        @keydown.enter.native="addPosition()"
        >
    </el-input>
    <el-button type="primary" icon="el-icon-plus" size="small"
               @click="addPosition()">添加</el-button>
  </div>
  <div class="EcManaMain">
    <el-table
        stripe
        border
        size="small"
        :data="positions"
        style="width: 70%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="编号"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="职位"
          width="120">
      </el-table-column>
      <el-table-column
          prop="createDate"
          label="创建时间"
      width="200">
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="是否启用"
          width="120"
      >
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
  </div>
  <el-button  size="small" style="margin-top: 8px" type="danger"
              :disabled="this.multipleSelection==0"
                @click="deletedMany()">批量删除</el-button>
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
          <el-input v-model="updatePos.name"  class="updatePosi"></el-input>
        </td>
      </tr>
      <tr>
        <td>
          <el-tag >是否启用</el-tag>
        </td>
        <td>
          <el-switch
              style="display: block;margin-left: 6px"
              v-model="updatePos.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="未启用"
              inactive-text="已启用">
          </el-switch>
        </td>
      </tr>
    </table>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatePosition()">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "EcMana",
  mounted() {
    this.initPositions();
  },
  watch:{
    dialogVisible:function (){
      this.initPositions();
    }
  },
  data(){
    return{
      pos:{
         name:''
      },
      positions:[],
      dialogVisible:false,
      updatePos:{
        name:'',
        enabled:false
      },
      multipleSelection:[]
    }
  },
  methods:{
    switchChange(val){
      val=!val;
    },
    deletedMany(){
      this.$confirm('此操作将永久删除['+this.multipleSelection.length+']个职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids='?'
        this.multipleSelection.forEach(item=>{
          ids+='ids='+item.id+'&'
        })
        this.deletedRequest('/sys/config/pos/'+ids).then(resp=>{
          if(resp){
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updatePosition(){
      this.updatePos.createDate='';
      this.putRequest('/sys/config/pos/',this.updatePos).then(resp=>{
        if(resp){
          this.initPositions();
          this.dialogVisible=false;
        }
      })
    },
    handleEdit(index, row) {
        this.dialogVisible=true;
        this.updatePos=row;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除['+row.name+']职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletedRequest('/sys/config/pos/'+row.id).then(resp=>{
          if(resp){
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initPositions(){
      this.getRequest('/sys/config/pos/').then(resp=>{
        if(resp){
          this.positions=resp;
        }
      })
    },
    addPosition(){
        if(this.pos.name){
          this.postRequest('/sys/config/pos/',this.pos).then(resp=>{
            this.initPositions();
            this.pos.name='';
          })
        }else {
          this.$message.error('添加职位失败,职位名称不能为空');
        }
    }
  }
}
</script>

<style scoped>
.addPosInput{
  width: 300px;
  margin-right: 8px;
}
.EcManaMain{
  margin-top: 10px;
}
.updatePosi{
  margin-left: 8px;
  width: 200px;
}
</style>