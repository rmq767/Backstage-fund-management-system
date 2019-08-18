<template>
<div class="fillContainer">
  <div>
    <el-form :inline="true" ref="add_data" :model="search_data">
      <el-form-item label="选择时间筛选：">
        <el-date-picker
          v-model="search_data.startTime"
          type="datetime"
          placeholder="选择开始时间">
        </el-date-picker>
        --
          <el-date-picker
          v-model="search_data.endTime"
          type="datetime"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="search" @click="handleSearch()">筛选</el-button>
      </el-form-item>
      <el-form-item class="btnRight">
        <el-button type="primary" size="mini" icon="view" @click="handleAdd()"    v-if="user.identity == 'manager'">添加
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="tableContainer">
<el-table
    v-if="tableData.length > 0"
    :data="tableData"
    max-height='460'
    border
    style="width: 100%">
    <el-table-column
      type="index"
      align="center"
      label="序号"
      width="60">
    </el-table-column>
    <el-table-column
      prop='date'
      align="center"
      label="创建时间"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop='type'
      align="center"
      label="收支类型"
      width="130">
    </el-table-column>
    <el-table-column
      prop='describe'
      align="center"
      label="收支描述"
      width="160">
    </el-table-column>
    <el-table-column
      prop='income'
      align="center"
      label="收入"
      width="140">
      <template slot-scope="scope">
        <span style="color:#00d053">{{ scope.row.income }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop='expend'
      align="center"
      label="支出"
      width="140">
      <template slot-scope="scope">
        <span style="color:#f56767">{{ scope.row.expend }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop='cash'
      align="center"
      label="账户现金"
      width="150">
      <template slot-scope="scope">
        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop='remark'
      label="备注"
      width="200">
    </el-table-column>
    <el-table-column 
    prop="opreation"
    width="150"
    align="center"
    label="操作"
    
    v-if="user.identity == 'manager'"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>

  <Dialog :dialog="dialog" @updata="getProfile" :formData="formData"></Dialog>
</div>
</template>

<script>
import Dialog from './Dialog'
  export default {
    props:[''],
    data () {
      return {
          search_data:{
            startTime:'',
            endTime:''
          },
          filterTimeData:[],
          paginations:{
            page_index:1, //当前位于那页
            total:0, //总数
            page_size:5, //1页显示多少条
            page_sizes:[5,10,15], //每页显示多少条
            layout:"total, sizes, prev, pager, next, jumper" //翻页属性
          },
          tableData:[],
          allTableData:[],
          dialog:{
            show:false,
            title:'',
            option:'edit'
          },
          formData:{
            type:'',
            describe:'',
            income:'',
            expend:'',
            cash:'',
            remark:'',
            id:''
        },
      };
    },

    created() {
        this.getProfile()
    },

    methods: {
        getProfile(){
            // 获取表格数据
            this.$http.get('/profiles')
            .then(res => {
                this.allTableData = res.data
                this.filterTimeData = res.data
                // 设置分页数据
                this.getPagination()
            })
            .catch(err => console.log(err))
        },
        getPagination(){
          // 设置分页属性
          this.paginations.total = this.allTableData.length
          this.paginations.page_size = 5
          this.paginations.page_index = 1
          // 设置默认的分页数据
          this.tableData = this.allTableData.filter((item,index) => {
            return index < this.paginations.page_size 
          })
        },
        handleEdit(index, row){
          // 编辑
          this.dialog = {
            show:true,
            title:'修改资金信息',
            option:'edit'
          },
          // 将内容显示到表单中
          this.formData = {
            type:row.type,
            describe:row.describe,
            income:row.income,
            expend:row.expend,
            cash:row.cash,
            remark:row.remark,
            id:row._id
          }
        },
        handleDelete(index, row){
          this.$http.delete(`/profiles/delete/${row._id}`)
          .then(res => {
            this.$message({
              message:'删除成功',
              type:'success'
            })
            // 删除成功后，刷新页面数据
            this.getProfile()
          })
        },
        handleAdd(){
          // 添加
          this.dialog = {
            show:true,
            title:'添加资金信息',
            option:'add'
          },
          // 将内容显示到表单中
          this.formData = {
            type:'',
            describe:'',
            income:'',
            expend:'',
            cash:'',
            remark:'',
            id:''
        }
          this.dialog.show = true
        },
        handleSizeChange(page_size){
          // 切换size
          this.paginations.page_index = 1
          this.paginations.page_size = page_size
          // 设置默认的分页数据
          this.tableData = this.allTableData.filter((item,index) => {
            return index < page_size
          })
        },
        handleCurrentChange(page){
          // 获取当前页，循环出从index开始一个页面显示几条数据
          let index = this.paginations.page_size * (page - 1)
          // 数据的总数
          let sum = this.paginations.page_size * page
          // 容器
          let tables = []
          // 循环页码对应出要显示的数据
          for(let i = index; i < sum; i++){
            if(this.allTableData[i]){
              tables.push(this.allTableData[i])
            }
            this.tableData = tables
          }
        },
        handleSearch(){
          // 筛选
          if(!this.search_data.startTime || !this.search_data.endTime){
            this.$message({
              type:'warning',
              message:'请输入时间区间'
            })
            this.getProfile()
            return
          }
          const sTime = this.search_data.startTime.getTime()//获取开始时间
          const eTime = this.search_data.endTime.getTime()//获取结束时间

          this.allTableData  = this.filterTimeData.filter(item => {
            let data = new Date(item.date)
            let time = data.getTime()
            return time > sTime && time < eTime
          })
          this.getPagination()
        }
    },

    components: {
      Dialog
    },

    computed: {
      user(){//权限管理
      // 如果不是manager，那么用v-if不显示操作按钮
        return this.$store.getters.user
      }
    },

  }

</script>
<style scoped>
.fillContainer{
  padding: 13px;
}
.btnRight{
  float: right;
}
.pagination{
  text-align: right;
  margin-top: 10px;
}
</style>