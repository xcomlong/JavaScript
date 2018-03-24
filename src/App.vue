<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="open1">主要按钮   1.只打开弹框，无需执行回调</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    
    <div id="test"></div>
  </div>
</template>

<script>
import content1 from "./views/test";
$(function(){
             $("#test").html('this is my first application.');
        });
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    open1() {
      //title：弹框的标题，
      //compnent：弹框体。如果是对象类型表示传入当前引入的局部组件。如果是字符串表示全局组件。
      //data：往弹框体内传值
      //_size_:'弹框规则'
      let option = {
        title: "只打开弹框，无需执行回调",
        component: content1,
        size: "small",
        data: { msg: "hello：我是父组件传入过来的值。" }
      };
      this.dialog.show(option);
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
