import './review.css';

import '../like/like.js';

import { Like } from '../like/like.js';

import TimeAgo from 'javascript-time-ago';

export class Review {
    constructor(node) {
        if (node) {
            this.root = node,
            this.pubdateContainer = this.root.querySelector('.js-review__pubdate');

            this.pubdate = this.pubdateContainer.getAttribute('datetime');
            this.lang = this.root.dataset.lang;
        }    
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

        new Like().render(this.root);
    }  

    render(parentNode) {
        const components = parentNode ? parentNode.querySelectorAll('.js-review') : document.querySelectorAll('.js-review');

        if (components.length > 0) {
            Array.from(components).map((node) => new Review(node)._init());
        };
    }
}