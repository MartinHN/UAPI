import * as fs from "fs"
import * as path from "path"

if (process.argv.length <= 2) {
    console.error("should provide json file as arg")
    process.exit(1)
}



const confFilePath = process.argv[2]
function toAbs(relP: string) {
    const confDir = path.dirname(confFilePath);
    const res = path.resolve(confDir, relP);
    // console.log("was", relP, "is", res)
    return res;
}

function mkDirIfNeeded(d: string) {
    if (!fs.existsSync(d))
        fs.mkdirSync(d)
}

const conf = JSON.parse(fs.readFileSync(confFilePath).toString())
const outFolder = toAbs(conf.outFolder)
const outJsFolder = toAbs(conf.outJsFolder)
console.log(outFolder)
mkDirIfNeeded(outFolder)
if (outJsFolder)
    mkDirIfNeeded(outJsFolder)

import { genXml } from "./genJSONSchema/genXml"
import { convertToJSON } from "./genJSONSchema/parseXml"
import { genAll } from "./cppGen/src/genAll"

let jsonFile = ""
if (conf.genJSON) {
    const jsonOutFolder = outFolder + "/json";
    mkDirIfNeeded(jsonOutFolder)
    const xmlPath = jsonOutFolder + "/RootAPI.xml"
    const originalPath = toAbs(conf.genJSON.baseFile);
    genXml(originalPath, xmlPath)
    jsonFile = jsonOutFolder + "/RootAPI.json";
    convertToJSON(xmlPath, originalPath, jsonFile)
}

const cppOutFolder = outFolder + "/cpp";
mkDirIfNeeded(cppOutFolder)
genAll(jsonFile, cppOutFolder, outJsFolder)
