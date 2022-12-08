const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce(
    (previous, current) => previous + current.likes,
    0)

  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const mostLiked = blogs.reduce(
    (previous, current) => (previous.likes > current.likes) ? previous : current
  )

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogsCount = _.countBy(blogs, 'author')
  const mostBloggedAuthor = Object
    .keys(authorBlogsCount)
    .reduce((previous, current) =>
      authorBlogsCount[previous] > authorBlogsCount[current]
        ? previous
        : current
    )

  return { author: mostBloggedAuthor, blogs: authorBlogsCount[mostBloggedAuthor] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorTotalLikesCount = {}
  for (const blog of blogs) {
    authorTotalLikesCount[blog.author] = (typeof (authorTotalLikesCount[blog.author]) !== 'undefined')
      ? authorTotalLikesCount[blog.author] + blog.likes
      : blog.likes
  }
  const mostLikedAuthor = Object
    .keys(authorTotalLikesCount)
    .reduce((previous, current) =>
      authorTotalLikesCount[previous] > authorTotalLikesCount[current]
        ? previous
        : current
    )

  return {
    author: mostLikedAuthor,
    likes: authorTotalLikesCount[mostLikedAuthor]
  }

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}