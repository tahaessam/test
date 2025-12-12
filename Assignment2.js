const path = require("path");

// Q1 – logPathInfo()
function logPathInfo() {
    const filePath = __filename;
    const dirPath = __dirname;

    console.log({
        File: path.resolve(filePath),
        Dir: path.resolve(dirPath)
    });
}

logPathInfo();


// Q2 – Return file extension
function fpath_to_fn() {
    const fileExt = path.extname("/user/files/report.pdf");
    console.log(fileExt);
}

fpath_to_fn();


// Q3 – Build Path from Object
function buildPath(obj) {
    return path.format({
        dir: obj.dir,
        name: obj.name,
        ext: obj.ext
    });
}

console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));


// Q4 – Get Extension from Path

function getExtension(filePath) {
    return path.extname(filePath);
}

console.log(getExtension("/docs/readme.md"));



// Q5 – Parse name + ext from file path

function parseFileInfo(filePath) {
    const parsed = path.parse(filePath);

    return {
        Name: parsed.name,
        Ext: parsed.ext
    };
}

console.log(parseFileInfo("/home/app/main.js"));
// Q6 
function ABSOLUTE(h) {

    const is_absolute = path.isAbsolute(h)

    return path.isAbsolute(h);
}
console.log(ABSOLUTE("/home/user/file.txt"));
// q 7 
function joins_multiple_segments() {


    const joined = path.join("src", "components", "App.js")

    console.log(joined);
}
joins_multiple_segments()
// q 8 
function resolvePath(relativePath) {
    return path.resolve(relativePath);
}

console.log(resolvePath("./index.js"));
//q 9 

function joinPaths(path1, path2) {
    return path.join(path1, path2);
}

console.log(joinPaths("/folder1", "folder2/file.txt"));

const fs = require("fs");
const EventEmitter = require("events");
const os = require("os");

// ض 10
function deleteFileAsync(p) {
    fs.unlink(p, () => {
        console.log(`The ${path.basename(p)} is deleted.`);
    });
}
deleteFileAsync("/path/to/file.txt");

//q 11
function createFolderSync(folder) {
    fs.mkdirSync(folder, { recursive: true });
    console.log("Success");
}
createFolderSync("testFolder");

//Q 12
const emitter = new EventEmitter();
emitter.on("start", () => {
    console.log("Welcome event triggered!");
});
emitter.emit("start");

//Qustion13
emitter.on("login", (user) => {
    console.log(`User logged in: ${user}`);
});
emitter.emit("login", "Ahmed");

// q14
function readFileSyncFn(p) {
    const data = fs.readFileSync(p, "utf-8");
    console.log("the file content =>", data);
}
readFileSyncFn("./notes.txt");

// q15
function writeAsync(p, c) {
    fs.writeFile(p, c, () => {
        console.log("File saved asynchronously");
    });
}
writeAsync("./async.txt", "Async save");

//16
function checkDirExist(p) {
    const exists = fs.existsSync(p);
    console.log(exists);
    return exists;
}
checkDirExist("./notes.txt");

//17
function getOSInfo() {
    const info = {
        Platform: os.platform(),
        Arch: os.arch()
    };
    console.log(info);
    return info;
}
getOSInfo();
