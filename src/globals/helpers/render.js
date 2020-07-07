function render(selector, Component, ...Handlers) {
    const components = document.querySelectorAll(selector);
    if (components.length > 0) {
        Array.from(components).map((node) => new Component(node, ...Handlers));
    };
};

module.exports = render;