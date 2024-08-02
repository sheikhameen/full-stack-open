const DataLoader = require("dataloader");
const Book = require("./models/book");

const createBookCountLoader = () => {
  return new DataLoader(async (authorIds) => {
    /**
     * Aggregate and get in the form of
     * [{ "_id": 1, "count": 2 }, { "_id": 2, "count": 1 }, ...]
     * Author 1 has 2 books. Author 2 has 1 book. etc.
     */
    const books = await Book.aggregate([
      { $match: { author: { $in: authorIds } } },
      { $group: { _id: "$author", count: { $sum: 1 } } },
    ]);

    /**
     * Get a Map of counts in the form of
     * { 1:2 , 2:1 , ...}
     * Key as the id of author, and value is the count of books for that author
     */
    const countMap = books.reduce((acc, book) => {
      acc[book._id] = book.count;
      return acc;
    }, {});

    /**
     * For each author id from the array we received as param
     * Return an array of counts only.
     * If the id not in the map, the 0 books for that author (just in case)
     */
    return authorIds.map((id) => countMap[id] || 0);
  });
};

module.exports = { createBookCountLoader };
