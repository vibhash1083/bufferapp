// Global constants

if (process.env.NODE_ENV === 'production') {
  var BASE_URL = 'http://share.apcelent/'
} else {
  var BASE_URL = 'http://localhost:8000/'
}
export {BASE_URL}