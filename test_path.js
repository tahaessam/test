const path = require("node:path")
console.log({ __dirname });
console.log({ __filename });
console.log(path.basename(__dirname));
console.log(path.basename(__filename, ".js")); // لو عايز  مان امتد
console.log(path.extname(__dirname));  // لو مش ملف المفروض هيرجع فاض
console.log(path.extname(__filename)); // امتداد بس 
console.log(path.dirname('C:/Users/connect/Desktop/test'));
console.log(path.dirname(__filename));
console.log(path.join(__dirname, "main.js"));
console.log(path.isAbsolute('./connect/Desktop/test/index.js'));
console.log(path.isAbsolute("main.js"));
console.log(path.resolve("config/.env"));
console.log(path.normalize("folder/user/../admin/index.js"));
console.log(path.parse(__dirname));
console.log(path.parse(__filename));
