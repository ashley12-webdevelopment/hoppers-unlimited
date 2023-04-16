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
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'eventDate',
      title: 'Event Date and Time',
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
      name: 'eventCoordinates',
      type: 'geopoint',
      title: 'Event Coordinates',
      description:
        '(Admin Only) field. Shows the Latitude and Longitude values of the event location',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'kmsToDestination',
      title: 'Kms To Destination',
      description: '(Admin Only) field. Shows the kms to event destination',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'headCount',
      title: 'Head Count',
      type: 'number',
      validation: (Rule) => Rule.required().integer().error('a integer value required').positive(),
    },
    {
      name: 'additionalComments',
      title: 'Additional Comments',
      type: 'text',
    },
    {
      name: 'bookingApproved',
      title: 'Approve this Booking?',
      type: 'boolean',
      description: '(Admin Only) field. To manually approve a booking',
    },
  ],
}
