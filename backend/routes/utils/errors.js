const resourceNotFoundError = (resource, id) => {
  const err = new Error(`${resource} with an id of ${id} could not be found.`);
  err.title = `${resource} not found`;
  err.errors = [`${resource} with an id of ${id} could not be found.`];
  err.status = 404;
  return err;
};

module.exports = { resourceNotFoundError };