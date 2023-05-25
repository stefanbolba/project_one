const agentStatuses = Object.freeze({
  ACTIVE: 0,
  BLOCKED: 1,
});

const toString = (value) => {
  switch (value) {
    case agentStatuses.ACTIVE:
      return "Active";
    case agentStatuses.BLOCKED:
      return "Blocked";
    default:
      return "Unknown";
  }
};

module.exports = {
  ...agentStatuses,
  toString,
};
