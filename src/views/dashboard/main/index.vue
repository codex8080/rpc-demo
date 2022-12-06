<template>
    <section id="step">
        <div class="tableParent">
            <!-- <div class="search_style">
                <h4></h4>
                <el-input v-model="searchValue" class="w-50 m-2" placeholder="" />
            </div> -->
            <el-table :data="tableData" v-loading="loadTotaling" :empty-text="$t('no_data')">
                <el-table-column prop="version" :label="$t('version')"></el-table-column>
                <el-table-column prop="height" :label="$t('height')"></el-table-column>
                <el-table-column prop="address" :label="$t('address')"></el-table-column>
                <el-table-column prop="balance" :label="$t('balance')"></el-table-column>
                <el-table-column prop="award" :label="$t('award')"></el-table-column>
                <el-table-column prop="jailed" :label="$t('jailed')"></el-table-column>
                <el-table-column prop="jailedBlock" :label="$t('jailedBlock')"></el-table-column>
                <el-table-column prop="jailedUntil" :label="$t('jailedUntil')" width="120">
                    <template #default="scope">
                        {{momentFun(scope.row.jailedUntil)}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="action">
                <el-button @click="init()">start</el-button>
                <el-button @click="stopFun()">stop</el-button>
            </div>
        </div>
    </section>
</template>

<script>
let that
import { defineComponent, h, getCurrentInstance } from 'vue'
import { Search, DocumentCopy, Warning } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'
export default defineComponent({
    name: 'Node Status',
    data () {
        return {
            i: 0,
            loadTotaling: true,
            taskData: [],
            searchName: '',
            tableData: [],
            parma: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
            },
            searchValue: '',
            system: getCurrentInstance().appContext.config.globalProperties,
            timer: null
        };
    },
    computed: {},
    components: {
        Search, DocumentCopy, Warning
    },
    methods: {
        sort (data) {
            return data.sort(function (a, b) { return a.ranking - b.ranking })
        },
        timeout (delay) {
            return new Promise((res) => setTimeout(res, delay))
        },
        tipMessage (text, typeIndex) {
            ElMessage({
                message: text,
                showClose: true,
                dangerouslyUseHTMLString: true,
                customClass: 'hash_tips',
                type: typeIndex ? 'success' : 'error'
            });
        },
        async getData () {
            that.loadTotaling = true
            that.tableData = []
            const dataResponse = await that.system.$commonFun.sendRequest(`${process.env.VUE_APP_API_HOST}/api/pocket/v1/status`, 'get')
            if (!dataResponse || dataResponse.status !== 'success') {
                that.tableData = []
                that.loadTotaling = false
                return false
            }
            that.tableData.push(dataResponse.data)
            that.loadTotaling = false
        },
        momentFun (dateItem) {
            let dateNew = new Date(dateItem).getTime()
            let dataUnit = ''
            let dataTime = new Date(dateNew) + ''
            let dataUnitIndex = dataTime.indexOf('GMT')
            let dataUnitArray = dataTime.substring(dataUnitIndex, dataUnitIndex + 8)
            switch (dataUnitArray) {
                case 'GMT+1000':
                    dataUnit = 'GMT+10'
                    break
                case 'GMT-1000':
                    dataUnit = 'GMT-10'
                    break
                case 'GMT+0000':
                    dataUnit = 'GMT+0'
                    break
                default:
                    dataUnit = dataUnitArray ? dataUnitArray.replace(/0/g, '') : '-'
                    break
            }
            dateNew = dateNew
                ? moment(new Date(parseInt(dateNew))).format('YYYY-MM-DD HH:mm:ss') + ` (${dataUnit})`
                : '-'
            return dateNew
        },
        async init () {
            that.getData()
            await that.stopFun()
            that.timer = setInterval(() => { that.getData() }, 30000)
        },
        stopFun () {
            clearTimeout(that.timer)
        }
    },
    watch: {
        $route: function (to, from) {
            if (to.path !== '/node_status') that.stopFun()
        }
    },
    mounted () { },
    activated () {
        that = this
        that.init()
    }
})
</script>

<style>
@media screen and (max-width: 410px) {
  .hash_tips {
    max-width: 400px;
    width: 95%;
    min-width: auto;
  }
}
</style>
<style lang="scss" scoped>
#step {
  padding: 0.25rem;
  color: #fff;
  font-size: 18px;
  color: #333;
  @media screen and (max-width: 1200px) {
    font-size: 16px;
  }
  :deep(.el-loading-mask) {
    background-color: #f6f5fa;
  }
  .landing_cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto 0.4rem;
    @media screen and (max-width: 1280px) {
      width: 90%;
    }
    @media screen and (max-width: 600px) {
      flex-wrap: wrap;
    }
    label {
      font-size: 0.28rem;
      font-weight: 600;
      color: #4b5eff;
      text-transform: capitalize;
      img {
        display: block;
        height: 40px;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }
    :deep(.el-input) {
      display: flex;
      align-items: stretch;
      padding: 5px;
      margin: 0 auto 0 20px;
      border: 1px solid rgb(229, 232, 235);
      border-radius: 25px;
      box-shadow: 0 0 6px rgba(69, 69, 69, 0.1);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      @media screen and (max-width: 600px) {
        width: 100%;
        margin: 15px 0 0 0;
      }
      &:hover {
        box-shadow: 0 0 8px rgba(39, 39, 39, 0.15);
      }
      .el-input__inner {
        height: 40px;
        line-height: 40px;
        padding: 0 0.2rem;
        background-color: transparent;
        border: 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        font-size: 18px;
        color: #222;
        @media screen and (max-width: 1600px) {
          font-size: 16px;
        }
        @media screen and (max-width: 1440px) {
          font-size: 15px;
        }
        @media screen and (max-width: 1366px) {
          font-size: 13px;
        }
      }
      .el-input__clear {
        font-size: 18px;
        color: #666;
        @media screen and (max-width: 1440px) {
          font-size: 16px;
        }
        @media screen and (max-width: 1366px) {
          font-size: 13px;
        }
        svg {
          cursor: pointer;
        }
      }
      .el-input-group__append {
        width: auto;
        padding: 0;
        background-color: transparent;
        border: 0;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        .el-button {
          height: 100%;
          padding: 0;
          margin: 0;
          transition: all 0.2s;
          span {
            cursor: inherit;
          }
          .el-icon {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 15px;
            cursor: inherit;
            svg {
              cursor: inherit;
            }
          }
          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }
  .tableParent {
    padding: 0;
    margin: 0 auto;
    .search_style {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: auto;
      cursor: pointer;
      h4 {
        margin: 0 10px 0 0;
        font-size: 18px;
        white-space: nowrap;
      }
      :deep(.el-input) {
        width: auto;
        .el-input__inner {
          padding-left: 0.35rem;
          background: url(../../../assets/images/icons/icon_01.png) no-repeat
            0.1rem center;
          background-size: 17px;
          border-radius: 0.1rem;
          border-color: #cfcfcf;
          @media screen and (min-width: 1800px) {
            font-size: 15px;
          }
        }
        .el-input__prefix {
          padding: 0;
          .el-icon {
            svg {
              width: 0.22rem;
              height: 0.22rem;
              color: #9ea5b3;
            }
          }
        }
      }
    }
    :deep(.el-table) {
      margin: 0.3rem auto;
      font-size: 0.18rem;
      .el-table__body-wrapper,
      .el-table__header-wrapper {
        border-radius: 0;
      }
      tr {
        cursor: pointer;
        th {
          padding: 10px 4px;
          background-color: #e5eeff !important;
          text-align: center;
          .cell {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 30px;
            padding: 0;
            word-break: break-word;
            font-size: 13px;
            font-weight: 800;
            color: #555;
            text-transform: capitalize;
            line-height: 1.3;
            @media screen and (min-width: 1800px) {
              font-size: 14px;
            }
            .icon_tips {
              width: 17px;
              height: 17px;
              margin: 0 0 0 3px;
              svg {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .el-table__column-filter-trigger {
              i {
                font-size: 13px;
                font-weight: 600;
                margin-left: 4px;
                transform: scale(1);
              }
            }
          }
        }
        th.is-leaf {
          border-bottom: 0;
        }
        td {
          padding: 10px 4px;
          border-bottom: 1px solid #dfdfdf;
          text-align: center;
          .cell {
            padding: 0;
            font-size: 15px;
            word-break: break-word;
            color: #000;
            text-align: left;
            line-height: 1.4;
            overflow: visible;
            justify-content: center;
            text-align: center;
            @media screen and (min-width: 1800px) {
              font-size: 16px;
            }
            .hot-cold-box {
              .el-button {
                width: 100%;
                height: auto;
                border: 0;
                padding: 0;
                margin: 0;
                background-color: transparent;
                font-size: 15px;
                font-weight: normal;
                font-family: inherit;
                // word-break: break-word;
                word-break: break-all;
                color: #000;
                text-align: center;
                line-height: 1.4;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                @media screen and (min-width: 1800px) {
                  font-size: 16px;
                }
                span {
                  line-height: 1.4;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: normal;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
                img,
                svg {
                  display: none;
                  float: left;
                  width: 16px;
                  margin: 2px 4px auto auto;
                }
              }
              .text_blank {
                color: #4d7cff;
                text-align: left;
                &:hover {
                  text-decoration: underline;
                }
              }
              .blue {
                padding: 0.07rem 0;
                background: linear-gradient(45deg, #4f8aff, #4b5eff);
                color: #fff;
                border-radius: 0.14rem;
                span {
                  cursor: pointer;
                  text-align: center;
                }
              }
              .is-disabled {
                background: transparent;
                color: #b8b8b8;
                opacity: 0.9;
                border: 1px solid #dcdfe6;
                cursor: no-drop;
                span {
                  cursor: no-drop;
                }
              }
              .el-button:hover {
                img,
                svg {
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
    .demo-pagination-block {
      display: flex;
      justify-content: center;
      margin: 0.5rem auto 0.8rem;
    }
    .action {
      :deep(.el-button) {
        text-transform: capitalize;
      }
    }
  }
}
</style>


<i18n>
{
  "en": {
    "no_data": "No Data",
    "version": "version",
    "height": "height",
    "address": "address",
    "balance": "balance",
    "award": "award",
    "jailed": "jailed",
    "jailedBlock": "jailedBlock",
    "jailedUntil": "jailedUntil",
  },
  "zh": {

  }
}
</i18n>
