import { ComponentMeta, ComponentStory } from '@storybook/react';
import ImageCard, { IImageCard } from './ImageCard';
import { mockImageCardProps } from './ImageCard.mocks';

export default {
  title: 'templates/ImageCard',
  component: ImageCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ImageCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageCard> = (args) => (
  <ImageCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockImageCardProps.base,
} as IImageCard;