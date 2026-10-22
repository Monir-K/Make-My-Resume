import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { parseResumeText } from '../src/resumeImport.js'

test('extracts contact details and common resume sections', () => {
  const parsed = parseResumeText(`
Alex Morgan
Product Designer
alex.morgan@example.com
+1 (555) 123-4567
alexmorgan.com

SUMMARY
Product designer focused on accessible digital products.

SKILLS
Figma, Prototyping, Accessibility

EXPERIENCE
2021 - Present
Senior Product Designer
Led design systems and customer research.

EDUCATION
2017 - 2021
Bachelor of Design
Northwest University
`)

  assert.deepEqual(parsed.profile, {
    name: 'Alex Morgan',
    title: 'Product Designer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 123-4567',
    website: 'alexmorgan.com',
    about: 'Product designer focused on accessible digital products.',
  })
  assert.deepEqual(parsed.skills, ['Figma', 'Prototyping', 'Accessibility'])
  assert.deepEqual(parsed.experience, [{ year: '2021 - Present', title: 'Senior Product Designer', description: 'Led design systems and customer research.' }])
  assert.deepEqual(parsed.education, [{ year: '2017 - 2021', title: 'Bachelor of Design', description: 'Northwest University' }])
})

test('leaves missing or unrecognized fields empty for review instead of inventing data', () => {
  const parsed = parseResumeText('Single line with no clear sections')

  assert.deepEqual(parsed.profile, { name: '', title: '', email: '', phone: '', website: '', about: '' })
  assert.deepEqual(parsed.skills, [])
  assert.deepEqual(parsed.education, [])
  assert.deepEqual(parsed.experience, [])
})

test('recognizes a realistic text resume fixture', async () => {
  const text = await readFile(new URL('./fixtures/sample-resume.txt', import.meta.url), 'utf8')
  const parsed = parseResumeText(text)

  assert.equal(parsed.profile.name, 'Jordan Lee')
  assert.equal(parsed.profile.email, 'jordan.lee@example.com')
  assert.deepEqual(parsed.skills, ['Research', 'Wireframing', 'Prototyping'])
  assert.equal(parsed.experience[0].title, 'UX Designer')
  assert.equal(parsed.education[0].title, 'Bachelor of Design')
})