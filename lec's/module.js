// /********************************************
//  * ==============  PATH MODULE  =============
//  ********************************************/
// const path = require("path");

// // دمج مسارات
// const joinedPath = path.join(__dirname, "folder", "file.txt");

// // الحصول على مسار مطلق كامل
// const absolutePath = path.resolve("folder", "file.txt");

// // اسم الملف
// const fileName = path.basename("/user/data/info.json");

// // الفولدر اللي فيه الملف
// const dirName = path.dirname("/user/data/info.json");

// // امتداد الملف
// const fileExt = path.extname("/user/data/info.json");

// // طباعة النتائج
// console.log("PATH JOIN:", joinedPath);
// console.log("ABSOLUTE:", absolutePath);
// console.log("FILENAME:", fileName);
// console.log("DIRNAME:", dirName);
// console.log("EXTENSION:", fileExt);

// console.log("===========================================================================")
// /********************************************
//  * ===============  OS MODULE  ==============
//  ********************************************/
// const os = require("os");

// // نوع نظام التشغيل
// console.log("OS PLATFORM:", os.platform());

// // إجمالي الرام
// console.log("TOTAL RAM:", os.totalmem());

// // الرام الفاضية
// console.log("FREE RAM:", os.freemem());

// // عدد وأنواع الـ CPU
// console.log("CPUs:", os.cpus());

// // فولدر Home
// console.log("HOME DIR:", os.homedir());
// console.log("===========================================================================")


// /********************************************
//  * =============  EVENTS MODULE  ============
//  ********************************************/
// const EventEmitter = require("events");

// // إنشاء Emitter
// const emitter = new EventEmitter();

// // مستمع لحدث login
// emitter.on("login", (user) => {
//   console.log("User Logged In:", user);
// });

// // إطلاق الحدث
// emitter.emit("login", { id: 1, name: "Taha Essam" });

// // مستمع بمره واحدة فقط
// emitter.once("start", () => {
//   console.log("START event triggered once");
// });
// emitter.emit("start");
// emitter.emit("start"); // لن تعمل عشان once

// console.log("===========================================================================")

// emitter.on("start", () => {
//     console.log("System started");
// });

// emitter.on("login", (user) => {
//     console.log(`Welcome ${user}`);
// });

// emitter.emit("start");
// emitter.emit("login", "Ahmed");

// console.log("===========================================================================")

// /********************************************
//  * ================  FS MODULE  =============
//  ********************************************/
// const fs = require("fs");

// // كتابة ملف
// fs.writeFileSync("sample.txt", "Hello from FS Module");

// // قراءة ملف
// const data = fs.readFileSync("sample.txt", "utf-8");
// console.log("FILE CONTENT:", data);

// // إضافة محتوى لملف
// fs.appendFileSync("sample.txt", "\nThis is new line!");

// // إنشاء مجلد
// if (!fs.existsSync("test-folder")) {
//   fs.mkdirSync("test-folder");
// }

// // حذف ملف
// fs.unlinkSync("sample.txt");  
// // استخدمها لو عايز تمسح

// // قراءة محتوى مجلد
// const folderFiles = fs.readdirSync("lec's");
// console.log("FILES:", folderFiles);
// console.log("======================= http====================================================")


// /********************************************
//  * ===============  HTTP MODULE  ============
//  ********************************************/
// const http = require("http");

// // إنشاء سيرفر HTTP بسيط
// const httpServer = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.write("Hello from HTTP Server");
//   res.end();
// });

// httpServer.listen(3000, () => {
//   console.log("HTTP server running on port 3000");
// });
// console.log("===========================================================================")


// /********************************************
//  * ===============  HTTPS MODULE ============
//  ********************************************/
// // لازم ملفات شهادة SSL (key.pem, cert.pem)
// const https = require("https");
// const { log } = require("console");

// try {
//   const options = {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   };

//   // إنشاء سيرفر HTTPS
//   const httpsServer = https.createServer(options, (req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Hello from HTTPS Server");
//     res.end();
//   });

//   httpsServer.listen(3443, () => {
//     console.log("HTTPS server running on port 3443");
//   });
// } catch (err) {
//   console.log("HTTPS server skipped (missing SSL files)");
// }
// const http =require("node:http")
// const server =http.http.createServer((req,res)=>{})
// server.listen(3000,"127.0.0.0",511,()=>{
//   console.log("server run on port 3000")})/
const http = require("node:http");
const { writeFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { parse } = require("node:querystring");
const { createReadStream } = require("node:fs");

let users = [];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the homepage!");


  } else if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));


  } else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User added", users }));
    });

  } else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
    const emailToDelete = req.url.split("/")[2];
    const index = users.findIndex(u => u.email === emailToDelete);
    if (index !== -1) {
      users.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User deleted", users }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    }
  } else if (req.method === "GET" && req.url === "/html") {
    const readFileStream = createReadStream(resolve("./index.html"));
    res.writeHead(200, { "content-type": "text/html" });
    readFileStream.on("data", (chunk) => res.write(chunk));
    readFileStream.on("end", () => res.end());
    readFileStream.on("error", () => {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

server.on("close", () => {
  console.log("Server is closed");
  writeFileSync(resolve("./log.txt"), `\nServer closed at ${new Date().toISOString()}`, { flag: "a" });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Port 3000 is already in use");
    process.exit(1);
  } else {
    console.error("Server error:", error);
  }
});

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  server.close(() => process.exit(0));
});

//! api consist of ( method and url

//?newuser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//? id increment 