<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <div style="float: left;margin-right: 10px">
        <search @search="submit_search"></search>
      </div>
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>

    <div class="panel-body" style="clear: both;">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        style="width: 100%;"
      >
        <el-table-column prop="id" label="id" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="上线标题" width="280" align="center"></el-table-column>
        <el-table-column prop="name" label="项目" width="140" align="center"></el-table-column>
        <el-table-column prop="level" label="环境" width="120" align="center">
          <template scope="props">
            <span v-text="props.row.level == 3 ? '生产环境' : '验收环境'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="realname" label="创建人" width="100" align="center"></el-table-column>
        <el-table-column prop="updated_at" label="上线时间" width="180" align="center"></el-table-column>
        <el-table-column label="分支" align="center">
          <template scope="props">
            <el-tag v-if="props.row.branch===''" type="success">Tag发布</el-tag>
            <el-tag v-else type="info">{{props.row.branch}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="commit_id" label="commitID" align="center"></el-table-column>
        <el-table-column prop="pms_batch_id" label="发布批次" width="60" align="center"></el-table-column>
        <el-table-column prop="pms_uwork_id" label="流程号" width="80" align="center"></el-table-column>
        <el-table-column prop="status" label="当前状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template scope="props">
            <router-link
              :to="{name: 'searchtaskRelease', params: {id: props.row.id,is_log:1}}"
              v-if="props.row.status!='新建提交'"
              tag="span"
            >
              <el-button size="small" icon="edit">查看日志</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar, search } from 'components'
import { port_task } from 'common/port_uri'
export default {
  data() {
    return {
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 15,
      //请求时的loading效果
      load_data: true,
      //批量选择数组
      batch_select: [],
      //批量选择数组
      select_info: ''
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
    submit_search(value) {
      this.select_info = value
      this.$message({
        message: value,
        type: 'success'
      })
      this.get_table_data()
    },
    //刷新
    on_refresh() {
      this.select_info = ''
      this.get_table_data()
    },
    //获取数据
    get_table_data() {
      console.log(this.currentPage)
      this.load_data = true
      this.$http
        .get(port_task.list, {
          params: {
            page: this.currentPage,
            length: this.length,
            select_info: this.select_info
          }
        })
        .then(({ data: { data } }) => {
          this.table_data = data.table_data
          this.currentPage = data.currentPage
          this.total = data.total
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        })
    },

    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val
      this.get_table_data()
    }
  }
}
</script>
