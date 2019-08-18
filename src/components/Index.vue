<template>
  <div class="index">
    <Header>
    </Header>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import LeftMenu from './LeftMenu'
  export default {
    props:[''],
    data () {
      return {

      };
    },

    methods: {},

    components: {
      Header,
      LeftMenu
    },

    computed: {},

    created() {},
  }

</script>
<style scoped>
.index{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.rightContainer{
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>