var os = require('os');
module.exports = {
  /**
   * 判断当前系统是否是Mac
   */
  isMac: function() {
    return os.platform() === 'darwin';
  },
  
  /**
   * 获取当前机器的ipv4
   * @returns IPv4
   */
  getIpV4: function() {
    if (!this.isMac()) {
      return '0.0.0.0';
    }
    var IPv4,hostName;
    hostName=os.hostname();
    if(os.networkInterfaces().en0) {
      for(var i=0;i<os.networkInterfaces().en0.length;i++){
        if(os.networkInterfaces().en0[i].family=='IPv4'){
          IPv4=os.networkInterfaces().en0[i].address;
        }
      }
    }else {
      IPv4 = '0.0.0.0'
    }
    return IPv4;
  }
}
