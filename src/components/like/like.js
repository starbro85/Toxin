class Like {
    constructor(node) {
        this.root = node;
        this.icon = this.root.querySelector('.js-like__icon');
        this.isActive = this.root.hasAttribute('data-active');

        this._init();
    }

    _toggle = () => {
        this.root.classList.toggle('like_active');

        this.isActive = !this.isActive;

        this.isActive ? this.icon.innerHTML = 'favorite' : this.icon.innerHTML = 'favorite_border';
    }

    _init() {
        this.root.addEventListener('click', this._toggle)
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-like');

    if (components.length > 0) {
        Array.from(components).map((node) => new Like(node));
    };
}