import Vue from 'vue'

const filters = {
  truncated (value) {    
    return Math.trunc(value * 10000) / 10000;
  },
  truncated2 (value) {    
    return Math.trunc(value * 100) / 100;
  },
  truncated3 (value) {    
    return Math.trunc(value * 1000) / 1000;
  },
  truncated5 (value) {    
    return Math.trunc(value * 100000) / 100000;
  },
  truncated6 (value) {    
    return Math.trunc(value * 1000000) / 1000000;
  },

  date (value) {
    const date = new Date(value)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return day + '.' + (month < 10 ? '0' + month : month) + '.' + year
  }
}

for (const key of Object.keys(filters)) {
  Vue.filter(key, filters[key])
}
