import fs from "fs";

class Config {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.dataConfig = {};
  }

  getParam(key) {
    if (fs.existsSync(this.pathToFile)) {
      const dataFromFile = fs.readFileSync(
        this.pathToFile,
        { encoding: "utf-8", flag: "r" },
        (err) => {
          if (err) {
            throw new Error("Ошибка с чтением config");
          }
        }
      );

      this.dataConfig = JSON.parse(dataFromFile);

      const segments = key.split(".");
      let currentSegment = this.dataConfig;

      for (let segment of segments) {
        if (currentSegment[segment]) {
          currentSegment = currentSegment[segment];
        } else {
          throw new Error("No such section");
        }
      }

      return currentSegment;
    }
  }
}

export default Config;
