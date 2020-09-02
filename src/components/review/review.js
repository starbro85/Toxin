import TimeAgo from 'javascript-time-ago';

class Review {
    constructor(node) {
        this.root = node,
        this.pubdateContainer = this.root.querySelector('.js-review__pubdate');
        this.pubdate = this.pubdateContainer.getAttribute('datetime');
        this.lang = this.root.dataset.lang;

        this._init();
    }

    _formatElapsedTime(pubdateTimestamp) {
        const locale =  require(`javascript-time-ago/locale/${this.lang}`);

        TimeAgo.addLocale(locale);

        const timeAgo = new TimeAgo(this.lang);

        return timeAgo.format(pubdateTimestamp);
    }

    _showElapsedTime() {
        const pubdateTimestamp = new Date(this.pubdate).getTime();

        const elapsedTimeFormatted = this._formatElapsedTime(pubdateTimestamp)

        this.pubdateContainer.innerHTML = elapsedTimeFormatted;
    }

    _init() {
        this._showElapsedTime();
    }
}

export default function render () {
    const components = document.querySelectorAll('.js-review');

    if (components.length > 0) {
        Array.from(components).map((node) => new Review(node));
    };
}