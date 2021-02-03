<template>
<div>
  <nav-cards
    :text="[
        { title: 'EVENT LIST', path: '/event_page/live' },
        { title: 'HISTORY', path: '/event_page' }
      ]"
  />
  <p style="font-size: 9px">03.12.2020</p>
  <div v-for="(item, idx) in show" :key="idx">
    <div @click="shotList(item.id)">
      <div class="d-flex flex-row top-row justify-content-center mt-2" style="  z-index: 111 !important;
">
        <div :class="'flex-row d-flex top-size-dark ' + item.winner" >
          <span class="col text-left" style="margin-top: -2px">{{item.edit}}</span>
          <span class="col-9 text-right" style="margin-top: -2px">{{item.winner}}</span>
        </div>
      </div>

      <div class="d-flex flex-row justify-content-center" style="  z-index: 111 !important;
">
        <div class="flex-row d-flex bottom-size">
          <span class="col-5 bottom-size-black-l">Habib</span>
          <span class="col-2 bottom-size-green-dark">5%
          <p class="bottom-p">Volatility</p>
</span>
          <span class="col-5 bottom-size-black-r">Connor</span>
        </div>
      </div>
    </div>
    <div v-if="item.edit">
      <ListEvents
        :key="idx"
        :title="[

        {
          text: `3`,
          value: `2`
        }
      ]"
      />
    </div>
  </div>

</div>
</template>

<script>
  export default {
    name: "history",
    data(){
      return {
        show: [{id:0, winner:'white'},{id:1, winner: 'black'},{id:2}]
      }
    },
    methods: {
      shotList(index) {

        this.show[index].edit = !this.show[index].edit
        this.$forceUpdate()
        this.$emit("openList");
        this.$forceUpdate()

      }
    }
  }
</script>

<style scoped>
  .top-size-dark {
  @font-family: Montserrat;
    font-size: 9px;
    width: 314px;
    height: 11px;

    background: #0F2F31;
    border: 0.1px solid lightgray;
    box-sizing: border-box;
    border-radius: 40px 40px 0px 0px;
    margin-bottom: 5px;
    color: white;
  }
  .top-size-light {
  @font-family: Montserrat;
    font-size: 9px;
    width: 314px;
    height: 11px;

    background: white;
    border: 0.1px solid lightgray;
    box-sizing: border-box;
    border-radius: 40px 40px 0px 0px;
    margin-bottom: 5px;
  }

  .bottom-size-black-l {
  @font-family: Montserrat;
    color: white;
    width: 137px;
    height: 34px;

    background: #0F2F31;
    border-radius: 0px 0px 0px 15px;
    border: 0.1px solid lightgray;
    border-right: none;

  }

  .bottom-size-black-r {
  @font-family: Montserrat;
    width: 137px;
    height: 34px;

    background: #0F2F31;
    border-radius: 0px 0px 15px 0px;
    color: #f2f2f2;
    border: 0.1px solid lightgray;
  }

  .bottom-size-green-dark {
    width: 40px;

  @font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
background: #144346;
    color: #23B14C;
    border-top: 0.1px solid lightgray;
    border-bottom: 0.1px solid lightgray;
  }

  .bottom-size-green-light {
    width: 40px;
    background: #E5E5E5;

  @font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    color: #23B14C;
    border-top: 0.1px solid lightgray;
    border-bottom: 0.1px solid lightgray;
  }

  .bottom-p {
    font-size: 5px;
    margin-bottom: -10px;
  }

  .bottom-size-white-l {
  @font-family: Montserrat;
    width: 137px;
    height: 34px;

    background: #FFFFFF;
    border-radius: 0px 0px 0px 15px;
    border: 0.1px solid lightgray;
    border-right: none;

  }

  .bottom-size-white-r {
  @font-family: Montserrat;
    width: 137px;
    height: 34px;

    background: white;
    border-radius: 0px 0px 15px 0px;
    border: 0.1px solid lightgray;
  }
  .black{
    background: red!important;
  }
  .white {
    background: greenyellow!important;
  }

</style>
