import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const resolvers = {
  Query: {

    getUsers: async () => {
      try {
        const result = await prisma.User.findMany();
        return result;
      } catch (error) {
        console.error(error.message);
      }
    }
  },

  Mutation: {
  
    createUser: async (_, args) => {
      const { name, email } = args;
      try {
        const newUser = await prisma.User.create({
          data: {
            name,
            email,
          },
        });
        return 'User created successfully!';
      } catch (error) {
        console.error(error.message); // or throw Error("error ocurred...")
      }
    },

    updateUser: async (_, args) => {
      const { id } = args;
      const { name, email } = args;
      try {
        const result = await prisma.User.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            email,
          },
        });
        return 'User updated successfully!';
      } catch (error) {
        console.error(error.message);
      }
    },

    deleteUser: async (_, args) => {
      const { id } = args;
      try {
        const result = await prisma.User.delete({ 
          where: {
            id: Number(id),
          }
        });
        return 'User deleted successfully!';
      } catch (error) {
        console.error(error.message);
      }
    }

}}

export default resolvers;
