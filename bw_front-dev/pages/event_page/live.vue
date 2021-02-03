<template>
  <div>
    <nav-cards
      :text="[
        { title: 'EVENT LIST', path: '/event_page' },
        { title: 'HISTORY', path: '/event_page/history' }
      ]"
    />
    <div v-for="(item, idx) in show" :key="idx"
    >
      <div class="match" @click="shotList(item.id)">
        <div class="d-flex flex-row top-row justify-content-center  mt-2">
          <div class="flex-row d-flex top-size">
            <span class="col text-left" style="margin-top: -2px">{{item.edit}}</span>
            <span class="col-9 text-right" style="margin-top: -2px">UFC 256 MMA</span>
          </div>
        </div>

        <div class="d-flex flex-row justify-content-center ">
          <div class="flex-row d-flex bottom-size">
            <span class="col-5 bottom-size-white pt-2">Habib</span>
            <span class="col-2 bottom-size-green">5%
          <p class="bottom-p">Volatility</p></span>
            <span class="col-5 bottom-size-black pt-2">Connor</span>
          </div>
        </div>
      </div>
        <ListEvents
          style="z-index: -111111111"
          :show='item.edit'
        />
    </div>


  </div>
</template>

<script>
  export default {
    name: "take",
    data() {
      return {
        show: [{id: 0}, {id: 1}, {id: 2}]
      }
    },
    methods: {
      shotList(index) {

        this.show[index].edit = !this.show[index].edit
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped lang="scss">
  .top-size {
  @font-family: Montserrat;
    font-size: 9px;
    width: 314px;
    height: 11px;

    background: #FFFFFF;
    border: 0.1px solid lightgray;
    box-sizing: border-box;
    border-radius: 40px 40px 0px 0px;
    margin-bottom: 5px;
  }

  .bottom-size-white {
    display: flex;
    justify-content: center;

  @font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;

    color: #0F2F31;
    width: 137px;
    height: 34px;

    background: #FFFFFF;
    border-radius: 0px 0px 0px 15px;
    border: 0.1px solid lightgray;
    border-right: none;
  }

  .bottom-size-black {
  @font-family: Montserrat;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    width: 137px;
    height: 34px;

    background: #0F2F31;
    border-radius: 0px 0px 15px 0px;
    color: #f2f2f2;
    border: 0.1px solid lightgray;
  }

  .bottom-size-green {
    width: 40px;
    background: #E5E5E5;

  @font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;

    color: #23B14C;
    border-top: 0.1px solid lightgray;
    border-bottom: 0.1px solid lightgray;
  }

  .bottom-p {
    font-size: 5px;
    margin-bottom: -10px;
  }


</style>
