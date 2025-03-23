import { type SchemaTypeDefinition } from 'sanity'
import meta from './meta'
import course from './course'
import chapter from './chapter'
import lesson from './lesson'

import {blockContentType} from './blockContentType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, course, chapter, lesson, meta],
}
