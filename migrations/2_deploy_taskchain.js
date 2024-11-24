const TaskChain = artifacts.require("TaskChain");

module.exports = function (deployer) {
  deployer.deploy(TaskChain);
};
