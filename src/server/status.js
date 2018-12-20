const status = async (context, next) => {
  console.log('Status called');
  await next();
};

export default status;
