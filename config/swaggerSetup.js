const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const jsYaml = require('js-yaml');

const setupSwagger = (app) => {
    const swaggerYAMLPath = './src/swagger.yaml';
    const swaggerDocument = jsYaml.load(fs.readFileSync(swaggerYAMLPath, 'utf8'));

    app.use('/api-docs', (req, res, next) => {
        const swaggerDocCopy = JSON.parse(JSON.stringify(swaggerDocument));
        swaggerDocCopy.host = req.get('host');
        req.swaggerDoc = swaggerDocCopy;
        next();
    }, swaggerUi.serve, (req, res) => {
        swaggerUi.setup(req.swaggerDoc)(req, res);
    });
};

module.exports = setupSwagger;
