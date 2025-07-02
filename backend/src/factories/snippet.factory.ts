import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { Snippet, CreateSnippetRequest } from '../types/snippet';

export const snippetFactory = Factory.define<Snippet>(() => ({
  id: faker.string.uuid(),
  text: faker.lorem.paragraphs(2),
  summary: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

export const createSnippetRequestFactory = Factory.define<CreateSnippetRequest>(() => ({
  text: faker.lorem.paragraphs(1),
}));

// Factory for creating snippets with specific text
export const snippetWithTextFactory = (text: string) =>
  snippetFactory.build({
    text,
    summary: faker.lorem.sentence(),
  });

// Factory for creating snippets with short text (for validation testing)
export const snippetWithShortTextFactory = Factory.define<Snippet>(() => ({
  id: faker.string.uuid(),
  text: faker.lorem.words(2), // Very short text
  summary: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

// Factory for creating snippets with empty text (for validation testing)
export const snippetWithEmptyTextFactory = Factory.define<Snippet>(() => ({
  id: faker.string.uuid(),
  text: '',
  summary: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

// Factory for creating snippets with whitespace-only text (for validation testing)
export const snippetWithWhitespaceTextFactory = Factory.define<Snippet>(() => ({
  id: faker.string.uuid(),
  text: '   ',
  summary: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));
