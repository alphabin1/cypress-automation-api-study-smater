const Ajv = require("ajv")
const ajv = new Ajv()

// Schema Validation
export function validateSchema(schema, data) {
     const valid = ajv.validate(schema, data)
     if (!valid) {
          getSchemaError(validate.errors).then((schemaError) => {
            throw new Error(schemaError)
          })
        } else {
          cy.log("Schema validated!");
     }
}
