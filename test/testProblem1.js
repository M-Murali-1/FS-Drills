const fs = require("fs");
const path = require("path");

let filename = "file";
function makeDirectory(callback) {
    fs.mkdir(path.join(__dirname, "Test Folder"), { recursive: true }, (err) => {
        if (err) {
            console.log("Error While creating the Folder..!", err);
            return callback(err);
        }
        else {
            console.log("Folder Created Succesfully..!");
            callback();
        }
    })
}
let count = 0;
function createDeleteFiles(callback) {
    for (let itr = 0; itr < 5; itr++) {
        let data = {
            filename: `${filename}${itr}.json`,
            content: `My name is ${filename}${itr}.json`
        }
        fs.writeFile(`${filename}${itr}.json`, JSON.stringify(data), (err) => {
            if (err) {
                console.log("Error While Creating the file..!");
            }
            else {
                console.log(`File${itr} Created Succesfully..!`);
                callback(itr);
            }
            count += 1;
            if (count == 5) {
                fs.rmdir("Test Folder", (err) => {
                    if (err) {
                        console.log("Problem while deleting the file..!");
                    }
                    else {
                        console.log("Test Folder deleted..!");
                    }
                })
            }
        })
    }
}

function deleteFile(itr) {
    fs.unlink(`${filename}${itr}.json`, (err) => {
        if (err) {
            console.log("Error while deleting the file..!");
        }
        else {
            console.log(`File${itr} deleted Succesfully..!`);
        }
    })
}

makeDirectory(() => {
    createDeleteFiles((itr)=>{
        deleteFile(itr);
    });
})
