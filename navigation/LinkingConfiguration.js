import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'Root',
      screens: {
        Home: 'HomeScreen',
        Porfolio: 'Portfolio',
        Expenses: 'ExpenseScreen'
      },
    },
  },
};
