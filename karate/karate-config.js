function fn() {
  var config = {};
  // default to stub server
  config.baseUrl = karate.properties["baseUrl"] || "http://localhost:3001";
  return config;
}
