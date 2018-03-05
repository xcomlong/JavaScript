define('@weex-component/6fe11640e8d25f2f98176e9643c08687', function(require, exports, module) {

    ;

    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "div",
        "children": [{
            "type": "text",
            "style": {
                "fontSize": 40
            },
            "attr": {
                "value": "Hello world, I come from the network!"
            }
        }]
    }

    ;
})

// require module
bootstrap('@weex-component/6fe11640e8d25f2f98176e9643c08687', {
    "transformerVersion": "0.3.1"
})