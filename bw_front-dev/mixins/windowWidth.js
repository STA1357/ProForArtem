export default {
  data () {
    return {
      windowWidth: 0
    }
  },
  methods: {
    isMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    updateWidth () {
      this.windowWidth = window.innerWidth
    }
  },
  mounted () {
    this.updateWidth()
    window.addEventListener('resize', this.$_.throttle(this.updateWidth, 100))
  }
}
