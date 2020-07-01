function render(selector, Component) {
    const components = document.querySelectorAll(selector);
    if (components.length > 0) {
        Array.from(components).map((node) => new Component(node));
    };
};

module.exports = render;