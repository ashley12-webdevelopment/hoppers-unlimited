export default {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    {
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventAddress',
      title: 'Event Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headCount',
      title: 'Head Count',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    },
  ],
}
