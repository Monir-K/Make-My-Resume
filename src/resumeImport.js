const headingAliases = {
  summary: /^(professional\s+)?(summary|profile|objective|about(?:\s+me)?)$/i,
  skills: /^(technical\s+)?skills|core competencies|key competencies$/i,
  education: /^(education|academic background|qualifications|training)$/i,
  experience: /^(work experience|professional experience|employment history|experience|career history)$/i,
}

const cleanLine = (line) => line.replace(/^[\s•*\-–—]+/, '').trim()
const isDateLine = (line) => /\b(?:19|20)\d{2}\b/.test(line) || /\b(present|current)\b/i.test(line)

const parseEntries = (sectionText) => sectionText
  .split(/\n\s*\n/)
  .map((block) => block.split('\n').map(cleanLine).filter(Boolean))
  .filter((lines) => lines.length)
  .map((lines) => {
    const dateIndex = lines.findIndex(isDateLine)
    const year = dateIndex >= 0 ? lines[dateIndex] : ''
    const titleIndex = dateIndex === 0 && lines.length > 1 ? 1 : 0
    const title = lines[titleIndex] || ''
    const description = lines.filter((_, index) => index !== dateIndex && index !== titleIndex).join(' ')
    return { year, title, description }
  })
  .filter((entry) => entry.title)

export const parseResumeText = (sourceText) => {
  const text = sourceText.replace(/\r/g, '').replace(/[\t ]+/g, ' ')
  const sourceLines = text.split('\n').map((line) => line.trim())
  const lines = sourceLines.filter(Boolean)
  const sections = { summary: [], skills: [], education: [], experience: [] }
  let currentSection = ''

  for (const line of sourceLines) {
    if (!line) {
      if (currentSection && sections[currentSection].at(-1) !== '') sections[currentSection].push('')
      continue
    }
    const normalizedHeading = line.replace(/[:|]+$/, '').trim()
    const matchedSection = Object.entries(headingAliases).find(([, pattern]) => pattern.test(normalizedHeading))?.[0]
    if (matchedSection) {
      currentSection = matchedSection
      continue
    }
    if (currentSection) sections[currentSection].push(cleanLine(line))
  }

  const email = text.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] || ''
  const phone = text.match(/(?:\+?\d[\d().\s-]{6,}\d)/)?.[0]?.trim() || ''
  const websitePattern = /(?:https?:\/\/|www\.)[^\s]+|\b[A-Za-z0-9-]+\.(?:com|net|org|io|co|dev|me)\b(?:\/[\w./-]*)?/i
  const website = lines.find((line) => !line.includes('@') && websitePattern.test(line))?.match(websitePattern)?.[0] || ''
  const name = lines.find((line) =>
    !line.includes('@') &&
    !isDateLine(line) &&
    !Object.values(headingAliases).some((pattern) => pattern.test(line.replace(/[:|]+$/, '').trim())) &&
    !/^(resume|curriculum vitae|cv)$/i.test(line) &&
    line.split(/\s+/).length >= 2 &&
    line.length <= 60 &&
    (email || phone || website || sections.summary.length || sections.skills.length || sections.education.length || sections.experience.length || lines.length > 1),
  ) || ''
  const title = name ? lines.slice(lines.indexOf(name) + 1).find((line) =>
    line !== email && line !== phone && line !== website && !isDateLine(line) && line.length <= 90,
  ) || '' : ''

  return {
    profile: {
      name,
      title,
      email,
      phone,
      website,
      about: sections.summary.join(' ').trim(),
    },
    skills: sections.skills.flatMap((line) => line.split(/[,;|•]/).map(cleanLine)).filter(Boolean),
    education: parseEntries(sections.education.join('\n')),
    experience: parseEntries(sections.experience.join('\n')),
  }
}

export const extractResumeText = async (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (file.size > 12 * 1024 * 1024) throw new Error('Choose a resume smaller than 12 MB.')

  if (extension === 'txt') return file.text()

  if (extension === 'docx') {
    const mammoth = await import('mammoth/mammoth.browser')
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
    return result.value
  }

  if (extension === 'pdf') {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const workerUrl = (await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')).default
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise
    if (pdf.numPages > 25) throw new Error('PDF resumes can contain up to 25 pages.')
    const pages = []
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()
      pages.push(content.items.map((item) => `${item.str}${item.hasEOL ? '\n' : ' '}`).join(''))
    }
    return pages.join('\n')
  }

  throw new Error('Choose a PDF, DOCX, or TXT resume file.')
}