import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image of the restaurant',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of the restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of the restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Enter rating for the restaurant(1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).error("please enter a value from 1 to 5"),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'category'}],
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type:"reference", to: [{ type: "dish"}] }],
    }),
  ],
})
