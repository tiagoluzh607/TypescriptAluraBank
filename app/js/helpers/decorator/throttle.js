System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function throttle(milisegundos = 500) {
        let timer = 0;
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                if (event)
                    event.preventDefault();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const retorno = metodoOriginal.apply(this, args);
                    return retorno;
                }, milisegundos);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});
