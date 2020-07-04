module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: (() => {
    if (process.env.NODE_ENV === 'test_integration') {
      return ['/**/__tests__/*integration.spec.js'];
    } else if (process.env.NODE_ENV === 'test_unit') {
      return ['/**/__tests__/*unit.spec.js'];
    } else {
      return [];
    }
  })(),
};
