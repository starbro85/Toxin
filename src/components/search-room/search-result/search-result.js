import './search-result.css';

import '../../room-card/room-card.js';
import '../../pagination/pagination.js';

import { renderRoomCard } from '../../room-card/room-card.js';
import { renderPagination } from '../../pagination/pagination.js';

export class SearchResult {
    constructor(node) {
        this.root = node;

        this.init();
    }

    init() {
        renderPagination(this.root);
        renderRoomCard(this.root);
    }
}