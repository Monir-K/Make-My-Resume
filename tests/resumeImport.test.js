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

test('parses pipe-separated work details commonly returned by OCR', () => {
  const parsed = parseResumeText(`
Casey Taylor
casey@example.com

EXPERIENCE
2021 - Present | UX Designer
Improved onboarding and design systems.
`)

  assert.deepEqual(parsed.experience, [{
    year: '2021 - Present',
    title: 'UX Designer',
    description: 'Improved onboarding and design systems.',
  }])
})

test('recognizes Portuguese CV headings and prioritizes the uppercase candidate name', () => {
  const parsed = parseResumeText(`
O SOBRE MIM
Kamjo é um engenheiro técnico com mais de dez anos de experiência em soluções técnicas.
EDUCAÇÃO
2010-2012
Bacharelado em Economia - Kabul Institute of Business and Accounting
Administração de Empresas e Contabilidade.
2015-2017
Ciência da Computação - ATV Institute
Redes, hardware, troubleshooting e reparo.
EXPERIÊNCIA
2024-2026
ABC Technology group - Brazil (Hybrid)
Suporte Técnico, Suporte Windows e Analista de Sistemas.
2013-2012
Engenheiro Técnico - Afeganistão (fulltime)
Administração Técnica do Governo.
HABILIDADES
Pacote Office, HTML, Banco de dados
INFORMAÇÕES PESSOAIS
AHMAD MONIR KAMJO
DESENVOLVEDOR
CONTATO
Moner.kamju@gmail.com
07176-660
`)

  assert.equal(parsed.profile.name, 'AHMAD MONIR KAMJO')
  assert.equal(parsed.profile.title, 'DESENVOLVEDOR')
  assert.equal(parsed.profile.email, 'Moner.kamju@gmail.com')
  assert.equal(parsed.profile.about, 'Kamjo é um engenheiro técnico com mais de dez anos de experiência em soluções técnicas.')
  assert.deepEqual(parsed.skills, ['Pacote Office', 'HTML', 'Banco de dados'])
  assert.equal(parsed.education.length, 2)
  assert.equal(parsed.education[0].title, 'Bacharelado em Economia - Kabul Institute of Business and Accounting')
  assert.equal(parsed.experience.length, 2)
  assert.equal(parsed.experience[0].title, 'ABC Technology group - Brazil (Hybrid)')
})