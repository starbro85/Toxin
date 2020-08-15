import './search-room.css';

import './filter/filter.js';
import './search-result/search-result.js';

import { SearchResult } from './search-result/search-result.js';
import { Filter } from './filter/filter.js';

class SearchRoom {
    constructor(node) {
        this.root = node;
        this.filter = this.root.querySelector('.js-filter');
        this.searchResult = this.root.querySelector('.js-search-result');

        this.init();
    }

    init() {
        new SearchResult(this.searchResult);
        new Filter(this.filter);
    }
}

export function renderSearchRoom (parentNode) {
    const components = parentNode ? parentNode.querySelectorAll('.js-search-room') : document.querySelectorAll('.js-search-room');
    if (components.length > 0) {
        Array.from(components).map((node) => new SearchRoom(node));
    };
}