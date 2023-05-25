const organizationStatuses = Object.freeze({
  ACTIVE: 0,
  BLOCKED: 1,
});

const toString = (value) => {
  switch (value) {
    case organizationStatuses.ACTIVE:
      return "Active";
    case organizationStatuses.BLOCKED:
      return "Blocked";
    default:
      return "Unknown";
  }
};

module.exports = {
  ...organizationStatuses,
  toString,
};
