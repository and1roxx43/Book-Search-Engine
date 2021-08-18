const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        async me(parent, args, context) {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                // .select("-__v -password")
                return userData;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    },

    Mutation: {
        async addUser(parent, args) {
            const user = await User.Create(args);
            const token = signToken(user);

            return { token, user };
        },

        async login(parent, { email, passord }) {
            const user = await User.findOne( { email });

            if(!user) {
                throw new AuthenticationError("Incorrect credentials")
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials")
            }
            const token = signToken(user);
            return { token, user };
        },
        async saveBook(parent, { book }, context) {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: {savedBooks: book }},
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        async removeBook(parent, { bookId }, context) {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedBooks: { bookId: bookId }}},
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;