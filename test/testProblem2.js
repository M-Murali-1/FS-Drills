const fs = require("fs");
function readData(location, callback) {
    fs.readFile(location, "utf-8", (err, data) => {
        if (err) {
            console.log("Error While reading the file..!");
        }
        else {
            callback(data);
        }
    })
}
function caseConversion(data, type, callback) {
    if (type == "upper") {
        callback(data.toUpperCase());
    }
    else {
        callback(data.toLowerCase());
    }
}
function writeData(location, data, callback) {
    fs.writeFile(location, data, (err) => {
        if (err) {
            console.log("Error Occured while writing the file..!");
        }
        else {
            callback();
        }
    })
}
function appendData(data, filename, callback) {
    fs.appendFile(filename, "\n" + data, (err) => {
        if (err) {
            console.log("Error Occured while appending the file..!");
        }
        else {
            callback();
        }
    })
}

function removeFiles(fileData) {
    fileData.split("\n").forEach((element) => {
        fs.unlink(element, (err) => {
            if (err) {
                console.log("Error while deleting the files..!");
            }
        })
    })
}
function resultLog() {
    console.log("All the files had been deleted succesfully..!");

}

readData("lipsum.txt", (data) => {
    caseConversion(data, "upper", (result1) => {
        writeData("uppercase.txt", result1, () => {
            writeData("filenames.txt", "uppercase.txt", () => {
                readData("uppercase.txt", (data) => {
                    caseConversion(data, "lower", (result) => {
                        let converted = result.split(".").join("\n");
                        writeData("lowercase.txt",converted, () => {
                            appendData("lowercase.txt", "filenames.txt", () => {
                                readData("lowercase.txt", (content) => {
                                    let required = content.split("\n").sort().join("\n");
                                    writeData("sorted.txt",required, () => {
                                        appendData("sorted.txt\nfilenames.txt", "filenames.txt", () => {
                                            readData("filenames.txt", (data) => {
                                                removeFiles(data);
                                                console.log("All the Steps completed successfully..!");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});