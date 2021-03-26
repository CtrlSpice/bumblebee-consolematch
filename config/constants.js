export function Status(code, title, details){
    this.code = code;
    this.title = title;
    this.detais = details;
  }

const constants = {
    defaultPartOfSpeech: "unknown",
    defaultDefinition: "No definition available.",
};

export default Object.freeze(constants);