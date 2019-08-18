<template>
  <div class="home">
    <div class="container">
        <h1 class="title">亿柒在线</h1>
        <p class="lead">一起来更精彩</p>
    </div>
  </div>
</template>

<script>

  export default {
    props:[''],
    data () {
      return {

      };
    },

    methods: {},

    components: {},

    computed: {},

    created() {},
  }

</script>
<style scoped>
.home{
    width: 100%;
    height: 100%;
    background-image: url('../assets/scenery3.jpg');
    background-size: 100% 100%;
}
.container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    color: white;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
}
.title{
    font-size: 35px;
}
.lead{
    margin-top: 50px;
    font-size: 22px;
}
</style>