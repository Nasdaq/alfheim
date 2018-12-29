function makeFile(parent_dir, component_name) {
  return `import ${component_name} from './${component_name}';

export default ${component_name};
export * from './${component_name}';
`;
}

function makeFilename(component_name) {
  return "index.ts";
}

module.exports = { makeFile, makeFilename };
