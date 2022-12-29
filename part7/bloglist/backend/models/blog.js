const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  url: String,
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: Number,
  comments: [{ content: String }],
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.comments) {
      // If comments array exists (the property doesn't exists when .populate() excludes comments)
      returnedObject.comments.forEach((comment) => {
        comment.id = comment._id.toString()
        delete comment._id
      })
    }
  },
})

module.exports = mongoose.model("Blog", blogSchema)
