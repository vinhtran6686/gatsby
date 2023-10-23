import { MdLocalPizza as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  // fields: [
  //   { name: 'street', type: 'string', title: 'Street name' },
  //   { name: 'streetNo', type: 'string', title: 'Street number' },
  //   { name: 'city', type: 'string', title: 'City' },
  // ],
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'string' }] }],
      // TODO: Add custom input component
    },
  ],
  // preview: {
  //   prepare() {
  //     return {
  //       title: `Custom pizza`,
  //       subtitle: `Custom pizza form`,
  //       media: icon,
  //     };
  //   },
  // },
};
