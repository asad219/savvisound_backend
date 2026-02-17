const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const modelsDir = path.join(__dirname, "..", "models");
const outputPath = path.join(__dirname, "..", "docs", "db-schema.json");

const toPlainDefault = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "function") {
    return "[Function]";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
};

const normalizeField = (pathDef) => {
  const info = {
    type: pathDef.instance,
    required: Boolean(pathDef.isRequired),
  };

  if (pathDef.instance === "Array" && pathDef.caster) {
    info.arrayOf = pathDef.caster.instance;
    if (pathDef.caster.options && pathDef.caster.options.ref) {
      info.ref = pathDef.caster.options.ref;
    }
  }

  if (pathDef.options) {
    if (pathDef.options.ref) {
      info.ref = pathDef.options.ref;
    }

    if (Array.isArray(pathDef.options.enum) && pathDef.options.enum.length > 0) {
      info.enum = pathDef.options.enum;
    }

    if (pathDef.options.default !== undefined) {
      info.default = toPlainDefault(pathDef.options.default);
    }

    if (pathDef.options.unique === true) {
      info.unique = true;
    }

    if (pathDef.options.index === true) {
      info.index = true;
    }
  }

  return info;
};

const extractSchema = (schema) => {
  const fields = {};

  schema.eachPath((fieldName, pathDef) => {
    fields[fieldName] = normalizeField(pathDef);
  });

  const virtuals = {};
  Object.keys(schema.virtuals).forEach((virtualName) => {
    const virtual = schema.virtuals[virtualName];
    const options = virtual && virtual.options ? virtual.options : {};

    virtuals[virtualName] = {
      ref: options.ref,
      localField: options.localField,
      foreignField: options.foreignField,
      justOne: options.justOne,
    };
  });

  return {
    timestamps: Boolean(schema.options && schema.options.timestamps),
    fields,
    virtuals,
  };
};

const loadModels = () => {
  const files = fs.readdirSync(modelsDir);

  files
    .filter((fileName) => fileName.endsWith(".js"))
    .forEach((fileName) => {
      const fullPath = path.join(modelsDir, fileName);
      require(fullPath);
    });
};

const generateSchema = () => {
  loadModels();

  const models = {};
  mongoose.modelNames().forEach((modelName) => {
    const model = mongoose.model(modelName);

    models[modelName] = {
      collection: model.collection ? model.collection.name : undefined,
      ...extractSchema(model.schema),
    };
  });

  const output = {
    generatedAt: new Date().toISOString(),
    models,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  // eslint-disable-next-line no-console
  console.log(`DB schema written to ${outputPath}`);
};

generateSchema();
