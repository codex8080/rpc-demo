<template>
  <section id="step">
    <div class="tableParent">
      <el-radio-group v-model="activeName" class="title_label" @change="labelChange">
        <el-radio label="Custodial">Custodial</el-radio>
        <el-radio label="Non-Custodial">Non-Custodial</el-radio>
      </el-radio-group>
      <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="160px" v-loading="loadTotaling">
        <el-form-item label="OperatorAddress" prop="operatorAddress" v-if="activeName === 'Custodial'">
          <el-input v-model="form.operatorAddress" />
        </el-form-item>
        <el-form-item label="OperatorPublicKey" prop="operatorPublicKey" v-if="activeName === 'Non-Custodial'">
          <el-input v-model="form.operatorPublicKey" />
        </el-form-item>
        <el-form-item label="OutputAddress" prop="outputAddress" v-if="activeName === 'Non-Custodial'">
          <el-input v-model="form.outputAddress" />
        </el-form-item>
        <el-form-item label="Amount" prop="amount">
          <el-input v-model="form.amount" />
        </el-form-item>
        <el-form-item label="RelayChainIDs" prop="relayChainIDs">
          <el-select v-model="form.relayChainIDs" placeholder="">
            <el-option label="Pocket Network mainnet (0001)" value="0001" />
            <el-option label="Pocket Network Testnet (0002)" value="0002" />
            <el-option label="Avalanche mainnet (0003)" value="0003" />
            <el-option label="Binance Smart Chain mainnet (0004)" value="0004" />
            <el-option label="Solana mainnet (0006)" value="0006" />
            <el-option label="Polygon mainnet (0009)" value="0009" />
            <el-option label="Ethereum mainnet (0021)" value="0021" />
            <el-option label="NEAR mainnet (0052)" value="0052" />
          </el-select>
        </el-form-item>
        <el-form-item label="ServiceURI" prop="serviceURI">
          <el-input v-model="form.serviceURI" />
        </el-form-item>
        <el-form-item label="NetworkID" prop="networkID">
          <el-radio-group v-model="form.networkID">
            <el-radio label="mainnet" />
            <el-radio label="testnet" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Fee" prop="fee">
          <el-input v-model="form.fee" />
        </el-form-item>
        <el-form-item label="IsBefore" prop="isBefore">
          <el-radio-group v-model="form.isBefore">
            <el-radio label="true" />
            <el-radio label="false" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Passwd" prop="passwd">
          <el-input v-model="form.passwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="activeName === 'Custodial'" @click="onSubmit()">Submit</el-button>
          <el-button type="primary" v-else @click="onSubmit('non')">Submit</el-button>
        </el-form-item>
      </el-form>
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
  name: 'Staking',
  data () {
    return {
      loadTotaling: false,
      form: {
        operatorPublicKey: '',
        outputAddress: '',
        operatorAddress: '',
        amount: '',
        relayChainIDs: '0001',
        serviceURI: '',
        networkID: 'mainnet',
        fee: '',
        isBefore: 'false',
        passwd: ''
      },
      rules: [],
      system: getCurrentInstance().appContext.config.globalProperties,
      activeName: 'Custodial'
    };
  },
  computed: {},
  components: {
    Search, DocumentCopy, Warning
  },
  methods: {
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
    async onSubmit (type) {
      that.loadTotaling = true
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let baseUrl = `${process.env.VUE_APP_API_HOST}${type === 'non' ? '/api/pocket/v1/noncustodial' : '/api/pocket/v1/custodial'}`
      const dataResponse = await that.system.$commonFun.sendRequest(baseUrl, 'post', that.form, config)
      if (!dataResponse || dataResponse.status !== 'success') {
        that.tipMessage(dataResponse ? dataResponse.data.Result : 'Failed', 0)
        that.loadTotaling = false
        return false
      }
      that.tipMessage(dataResponse.data.Result, 1)
      that.loadTotaling = false
    },
    labelChange (val) {
      that.$refs.ruleFormRef.resetFields()
    }
  },
  mounted () { },
  activated () {
    that = this
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
    :deep(.title_label) {
      width: 100%;
      padding: 0 0 0 160px;
    }
    :deep(.el-form) {
      padding: 0.5rem 0 0.3rem;
      .el-form-item {
        .el-checkbox-group {
          text-align: left;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>


<i18n>
{
  "en": {
  },
  "zh": {

  }
}
</i18n>
