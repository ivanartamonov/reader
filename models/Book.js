const Book = {
    extractIdFromSlug(slug) {
        return slug.match(/-b(\d+)$/)?.[1];
    }
}

export default Book;