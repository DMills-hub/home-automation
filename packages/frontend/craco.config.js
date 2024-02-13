const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@styled': path.resolve(__dirname, 'src/styled'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@util': path.resolve(__dirname, 'src/util')
    }
  }
}
