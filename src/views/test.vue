<template>
   <div>
      <p>我是弹框体. </p>
      {{data.msg}}    
       
   </div>
</template>
<script>
export default {
  data(){
      return {
          val1:''
      }
  },
  props:["data"],
  methods:{

  },
  mounted(){

  }
}
</script>

