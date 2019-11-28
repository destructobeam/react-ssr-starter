const log_compiler_errors = (error, stats) => {
  if (error) {
    console.error(error.stack || error);

    if (error.details) {
      console.error(error.details);
    }

    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
};

module.exports = log_compiler_errors;
