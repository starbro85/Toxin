import './search-result.css';

import '../../room-card/room-card.js';
import '../../pagination/pagination.js';

import { RoomCard } from '../../room-card/room-card.js';
import { Pagination } from '../../pagination/pagination.js';

export class SearchResult {
    constructor(node) {
        this.root = node;

        this._init();
    }

    _init() {
        new RoomCard().render(this.root);
        new Pagination().render(this.root);
    }
}