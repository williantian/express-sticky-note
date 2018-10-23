require('less/toast.less');

//require后面要有分号

function toast(message, time){
    this.message=message
    this.dismissTime = time||1000 //ms
    this.createToast()
    this.showToast()
}
toast.prototype = {
    createToast: function(){
        var template = '<div class="toast">' + this.message + '</div>'
        this.$toast = $(template)
        $('body').append(this.$toast)
    },
    showToast: function(){
        var self = this
        this.$toast.fadeIn(300, function(){
            setTimeout(function(){
                self.$toast.fadeOut(300, function(){
                    self.$toast.remove()
                })
            }, self.dismissTime)
        })
    }
} 

function Toast (message, time){
  return new toast(message, time)
}
window.Toast = Toast
module.exports.Toast = Toast