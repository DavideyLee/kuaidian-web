<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目:">{{task.Title}}</el-form-item>
            <span v-if="project.RepoType=='git'">
              <el-form-item label="分支:">{{task.Branch}}</el-form-item>
              <el-form-item label="哈希:">{{task.CommitId}}</el-form-item>
            </span>
            <span v-if="project.RepoType=='file'">
              <el-form-item label="包地址:">{{task.CommitId}}</el-form-item>
            </span>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目:">{{project.Name}}</el-form-item>
            <el-form-item label="环境:">{{levelEnv}}</el-form-item>
            <el-form-item label="发布版本库:">{{project.ReleaseTo}}</el-form-item>
            <el-form-item label="发布版本库:">{{project.ReleaseTo}}</el-form-item>
            <el-form-item label="发布ip:">
              <span v-for="n in getHost">
                {{ n }}
                <br />
              </span>
            </el-form-item>
          </el-col>
          <el-form-item>
            <el-button @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <terminal :taskId="task.Id"></terminal>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, terminal } from 'components'
import { port_task, port_conf, port_code } from 'common/port_uri'
import { tools_verify } from 'common/tools'
import store from 'store'
export default {
  data() {
    return {
      task: {},
      project: {},
      form: {
        Branch: null,
        Title: null,
        CommitId: null,
        ProjectId: this.$route.params.id * 1
      },
      route_id: this.$route.params.id,
      is_log: this.$route.params.is_log,
      load_data: false,
      on_submit_loading: false,
      rules: {
        Branch: [{ required: true, message: '分支不能为空', trigger: 'blur' }],
        CommitId: [
          { required: true, message: 'Commit不能为空', trigger: 'blur' }
        ],
        Title: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    getHost: function() {
      var hosts = this.project.Hosts
      if (hosts && hosts != '') {
        return this.project.Hosts.split('\r\n')
      } else {
        return []
      }
    },
    levelEnv: function() {
      var env = ''
      switch (this.project.Level) {
        case '2':
          env = '验收环境'
          break
        case '3':
          env = '生产环境'
          break
      }
      return env
    }
  },
  created() {
    if (this.route_id) {
      this.get_task()
    } else {
      this.$message({
        message: '任务id不存在',
        type: 'warning'
      })
      setTimeout(() => {
        this.$router.back()
      }, 500)
    }
  },
  methods: {
    get_task() {
      this.load_data = true
      this.$http
        .get(port_task.get, {
          params: {
            taskId: this.route_id
          }
        })
        .then(({ data: { data } }) => {
          this.task = data
          this.get_project()
        })
        .catch(() => {
          this.load_data = false
        })
    },
    get_project() {
      this.load_data = true
      this.$http
        .get(port_conf.get, {
          params: {
            projectId: this.task.ProjectId
          }
        })
        .then(({ data: { data } }) => {
          this.project = data
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        })
    },
    //提交
    on_submit_form() {
      this.on_submit_loading = true
      this.$http
        .get(port_task.release, {
          params: {
            taskId: this.route_id
          }
        })
        .then(({ data: { data } }) => {
          this.$message({
            message: '部署开始',
            type: 'success'
          })
          this.on_submit_loading = false
        })
        .catch(() => {
          this.on_submit_loading = false
        })
    }
  },
  components: {
    panelTitle,
    terminal
  }
}
</script>
