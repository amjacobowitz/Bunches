export default function LiveChannel() {
  this.subscriptionResponses = [];

  App.cable.subscriptions.create('LiveChannel', {
    connected: () => {},
    received: ({ body: data }) => {
      this.subscriptionResponses.forEach((cb) => {
        cb(data);
      })
    }
  });
}

LiveChannel.prototype.subscribe = function(cb) {
  this.subscriptionResponses.push(cb)
};
