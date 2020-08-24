import './search-room.css';

import './filter/filter.js';
import './search-result/search-result.js';

import { SearchResult } from './search-result/search-result.js';
import { Filter } from './filter/filter.js';

export class SearchRoom {
    constructor(node) {
        if (node) {
            this.root = node;
            this.filter = this.root.querySelector('.js-filter');
            this.searchResult = this.root.querySelector('.js-search-result');
        }
    }

    _init() {
        new SearchResult(this.searchResult);
        new Filter(this.filter);
    }

    render(parent) {
        const components = parent ? parent.querySelectorAll('.js-search-room') : document.querySelectorAll('.js-search-room');

        if (components.length > 0) {
            Array.from(components).map((node) => new SearchRoom(node)._init());
        };
    }
}