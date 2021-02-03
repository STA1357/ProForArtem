<template>
  <transition name="list" v-if="show">
    <div class="list">
      <div class="list__title">
        <div class="list__item">
          <div class="event-card" style="margin: 0 auto">
            <span class="col-5 text-left">Event ID</span>
            <span class="col-5 text-right">#0003476</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ListEvents",
    props: {
      show: false
    }
  }
</script>

<style scoped lang="scss">
  .list {
    z-index: -111;
    width: 296px;
    height: auto;
    padding: 50px 18px 26px 18px;
    background: rgba(255, 255, 255, 0.68);
    border-radius: 15px;
    margin: -24px auto 0;
    transition: opacity 0.5s;
  }
  .list__title {
    margin-bottom: 32px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: -18px;
      width: calc(100% + 36px);
      background-color: $surface8;
    }
  }
  .list__item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  .list__text,.list__value {
    font-size: 10px;
    line-height: 12px;
    color: #000;
  }
  .list__item--info {
    .list__text,.list__value {
      font-size: 9px;
      line-height: 11px;
      color: $text1;
    }
  }



  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
