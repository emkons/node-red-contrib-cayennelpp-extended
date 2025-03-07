var decoder = require("./decode.js");

module.exports = function (RED) {
  function CayenneLPPDecoderNode(config) {
    RED.nodes.createNode(this, config);
    this.property = config.property || "payload";
    var node = this;

    node.on("input", function (msg) {
      var value = RED.util.getMessageProperty(msg, node.property);
      if (value !== undefined) {
        value = decoder.lppDecode(value);
        RED.util.setMessageProperty(msg, node.property, value);
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("cayennelpp-decoder", CayenneLPPDecoderNode);
};
