<template>
  <div>
    <div class="panel-body" style="clear: both;">
      <el-row>
        <el-col :span="24">
          <div class="panel" style="margin-left: 10px">
            <panel-title :title="msg1">
              <div style="float: left;margin-right: 10px;">
                <search @search="submit_search"></search>
              </div>
            </panel-title>
            <div class="panel-body">
              <div>
                <el-table
                  :data="table_data1"
                  v-loading="load_data1"
                  element-loading-text="拼命加载中"
                  border
                  style="width: 100%;"
                  max-height="750"
                >
                  <el-table-column prop="Pid" label="项目Id" width="100" align="center"></el-table-column>
                  <el-table-column prop="Pname" label="项目名称" align="center"></el-table-column>
                  <el-table-column prop="Eid" label="环境" align="center">
                    <template scope="props">
                      <span v-text="props.row.Eid == 3 ? '生产环境' : '验收环境'" align="center"></span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Host" label="Agent's IP" align="center"></el-table-column>
                  <el-table-column label="状态" width="200" align="center">
                    <template scope="props">
                      <el-tag v-if="props.row.Status==='alive'" type="success">{{props.row.Status}}</el-tag>
                      <el-tag v-else type="danger">{{props.row.Status}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template scope="props">
                      <el-button
                        type="warning"
                        size="small"
                        icon="document"
                        @click="send_data(props.row.Pid)"
                      >发送</el-button>
                      <el-button
                        style="margin-left:0px"
                        type="danger"
                        size="small"
                        icon="delete"
                        @click="restart_agent(props.row.Pid)"
                      >重启</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="panel">
            <panel-title :title="msg2"></panel-title>
            <div class="panel-body">
              <div>
                <el-table
                  :data="table_data"
                  v-loading="load_data"
                  element-loading-text="拼命加载中"
                  border
                  style="width: 100%;"
                  max-height="750"
                  align="center"
                >
                  <el-table-column prop="Pid" label="项目Id" width="100" align="center"></el-table-column>
                  <el-table-column prop="Pname" label="项目名称" align="center"></el-table-column>
                  <el-table-column prop="Eid" label="环境" align="center">
                    <template scope="props">
                      <span v-text="props.row.Eid == 3 ? '生产环境' : '验收环境'" align="center"></span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Host" label="Agent's IP" align="center"></el-table-column>
                  <el-table-column label="状态" width="200" align="center">
                    <template scope="props">
                      <el-tag v-if="props.row.Status==='alive'" type="success">{{props.row.Status}}</el-tag>
                      <el-tag v-else type="danger">{{props.row.Status}}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar, search } from 'components'
import { port_p2p } from 'common/port_uri'
export default {
  data() {
    return {
      table_data: null,
      //数据总条目
      total: 0,
      //请求时的loading效果
      load_data: false,
      load_data1: false,
      //批量选择数组
      batch_select: [],
      //批量选择数组
      select_info: '',
      //项目详情
      table_data1: null,
      msg1: '按项目名称查询',
      msg2: '离线的Agent'
    }
  },
  components: {
    panelTitle,
    bottomToolBar,
    search
  },
  created() {
    this.get_table_data()
  },
  methods: {
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val
      this.get_table_data()
    },
    submit_search(value) {
      this.select_info = value
      this.load_data1 = true
      this.$http
        .get(port_p2p.check, {
          params: {
            type: '1',
            projectName: this.select_info
          }
        })
        .then(({ data: { data } }) => {
          this.table_data1 = data
          console.log(this.table_data1)
          this.load_data1 = false
        })
        .catch(() => {
          this.load_data1 = false
        })
    },
    //send
    send_data(pid) {
      this.load_data1 = true
      this.$http
        .get(port_p2p.send, {
          params: {
            projectId: pid
          }
        })
        .then(({ data: { msg } }) => {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.submit_search(this.select_info)
          this.load_data1 = false
        })
        .catch(() => {
          this.load_data1 = false
        })
    },
    //agent
    restart_agent(pid) {
      this.load_data1 = true
      this.$http
        .get(port_p2p.agent, {
          params: {
            projectId: pid
          }
        })
        .then(({ data: { msg } }) => {
          console.log(msg)
          this.$message({
            message: msg,
            type: 'success'
          })
          this.submit_search(this.select_info)
          this.load_data1 = false
        })
        .catch(() => {
          this.load_data1 = false
        })
    },
    //获取数据
    get_table_data() {
      this.load_data = true
      this.$http
        .get(port_p2p.check, {
          params: {
            type: '0'
          }
        })
        .then(({ data: { data } }) => {
          this.table_data = data
          console.log(this.table_data)
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        })
    }
  }
}
</script>
