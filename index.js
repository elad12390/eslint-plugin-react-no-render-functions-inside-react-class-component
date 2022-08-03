

const checkDeclaration = (context, node) => {
    try {
        const {
            superClass: {
                object: {
                    name: superClassObject
                },
                property: {
                    name: superClassProperty
                }
            }
        } = node.parent.parent

        const {key: {name: functionOrPropertyName}} = node


        const lowerCaseSuperClassObject = String(superClassObject).toLowerCase();
        const lowerCaseSuperClassProperty = String(superClassProperty).toLowerCase();
        if (
            lowerCaseSuperClassObject.includes('react') &&
            lowerCaseSuperClassProperty.includes('component') &&
            functionOrPropertyName.match(/render.+/g)
        ) {
            return context.report({
                node,
                message: 'Do not use render functions inside class components',
            });
        }
    } catch (e) {}
}

module.exports = {
    meta: {
        type: 'problem',
        hasSuggestions: true,
        fixable: false,
    },
    rules: {
        "react/no-render-functions-inside-react-class-component": {
            create: function (context) {
                return {
                    MethodDefinition: (node) => checkDeclaration(context, node),
                    ClassProperty: (node) => checkDeclaration(context, node),
                };
            }
        }
    }
};