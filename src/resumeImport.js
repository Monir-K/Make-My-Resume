const normalizeText = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const headingAliases = {
  summary: /^(professional\s+)?(summary|profile|objective|about(?:\s+me)?|o\s+sobre\s+mim|sobre\s+mim|perfil(?:\s+profissional)?)$/,
  skills: /^(technical\s+)?(skills|habilidades|competencias|competencias\s+tecnicas|core competencies|key competencies)$/,
  education: /^(education|educacao|formacao(?:\s+academica)?|academic background|qualifications|training)$/,
  experience: /^(work experience|professional experience|employment history|experience|experiencia(?:\s+profissional)?|historico profissional|career history)$/,
}

const nonNameHeadings = new Set([
  'resume', 'curriculum vitae', 'cv', 'informacoes pessoais', 'informacoes pessoais e contato',
  'personal information', 'contact', 'contato', 'contact information', 'habilidades', 'skills',
  'idiomas', 'languages', 'hobbies', 'o sobre mim', 'sobre mim', 'about me', 'educacao', 'education',
  'experiencia', 'experience', 'experiencia profissional', 'formacao academica', 'summary',
  'professional summary', 'perfil profissional', 'objetivo',
])
const otherSectionHeadings = new Set([
  'informacoes pessoais', 'informacoes pessoais e contato', 'personal information', 'contact',
  'contato', 'contact information', 'idiomas', 'languages', 'hobbies', 'interesses',
])

const cleanLine = (line) => line.replace(/^[\s•*\-–—]+/, '').trim()
const isDateLine = (line) => /\b(?:19|20)\d{2}\b/.test(line) || /\b(present|current|atual)\b/i.test(line)

const splitEntryBlocks = (sectionText) => {
  const blocks = []
  let currentBlock = []

  for (const line of sectionText.split('\n').map(cleanLine)) {
    if (!line) {
      if (currentBlock.length) blocks.push(currentBlock)
      currentBlock = []
      continue
    }
    if (isDateLine(line) && currentBlock.length) {
      blocks.push(currentBlock)
      currentBlock = []
    }
    currentBlock.push(line)
  }
  if (currentBlock.length) blocks.push(currentBlock)
  return blocks
}

const parseEntries = (sectionText) => splitEntryBlocks(sectionText)
  .map((lines) => {
    const pipeLine = lines.find((line) => line.includes('|'))
    if (pipeLine) {
      const [year = '', title = '', ...description] = pipeLine.split('|').map(cleanLine)
      const followingLines = lines.filter((line) => line !== pipeLine)
      return { year, title, description: [description.join(' | '), ...followingLines].filter(Boolean).join(' ') }
    }

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
    const normalizedHeading = normalizeText(line.replace(/[:|]+$/, '').trim())
    if (otherSectionHeadings.has(normalizedHeading)) {
      currentSection = ''
      continue
    }
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
  const nameCandidates = lines.map((line, index) => ({ line, index, normalized: normalizeText(line.replace(/[:|]+$/, '').trim()) }))
    .filter(({ line, normalized }) => {
      const wordCount = line.split(/\s+/).length
      return !line.includes('@') &&
        !isDateLine(line) &&
        !Object.values(headingAliases).some((pattern) => pattern.test(normalized)) &&
        !nonNameHeadings.has(normalized) &&
        !/^\d/.test(line) &&
        !/[.!?;:@]/.test(line) &&
        /^[\p{L}][\p{L}'’-]*(?:\s+[\p{L}][\p{L}'’-]*){1,3}$/u.test(line) &&
        wordCount >= 2 && line.length <= 48
    })
  const nameCandidate = nameCandidates.find(({ line }) => line === line.toLocaleUpperCase()) || nameCandidates[0]
  const name = nameCandidate?.line || ''
  const title = nameCandidate ? lines.slice(nameCandidate.index + 1).find((line) => {
    const normalized = normalizeText(line)
    return line !== email && line !== phone && line !== website && !isDateLine(line) && line.length <= 90 &&
      !Object.values(headingAliases).some((pattern) => pattern.test(normalized)) &&
      !nonNameHeadings.has(normalized) && !line.includes('@')
  }) || '' : ''

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

const createOcrWorker = async (onProgress) => {
  const { createWorker } = await import('tesseract.js')
  return createWorker('eng', 1, {
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/worker.min.js',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@7.0.0',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    gzip: true,
    logger: ({ status, progress }) => onProgress?.({ status, progress }),
  })
}

const recognizeImage = async (file, onProgress) => {
  onProgress?.({ status: 'Loading English OCR data (first use may take a moment)', progress: 0 })
  const worker = await createOcrWorker(onProgress)
  try {
    const result = await worker.recognize(file)
    return result.data.text
  } finally {
    await worker.terminate()
  }
}

const renderPdfPage = async (page) => {
  const originalViewport = page.getViewport({ scale: 1 })
  const scale = Math.min(2, 1800 / originalViewport.width)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(viewport.width)
  canvas.height = Math.ceil(viewport.height)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('This PDF page could not be prepared for text recognition.')
  await page.render({ canvas, canvasContext: context, viewport }).promise
  return canvas
}

const extractPdfText = async (file, onProgress) => {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const workerUrl = (await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')).default
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise
  if (pdf.numPages > 25) throw new Error('PDF resumes can contain up to 25 pages.')

  const pages = []
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress?.({ status: `Reading PDF page ${pageNumber} of ${pdf.numPages}`, progress: pageNumber / pdf.numPages })
    const page = await pdf.getPage(pageNumber)
    const content = await page.getTextContent()
    const text = content.items.map((item) => `${item.str}${item.hasEOL ? '\n' : ' '}`).join('').trim()
    pages.push({ page, text })
  }

  const pagesNeedingOcr = pages.filter(({ text }) => text.length < 24)
  if (!pagesNeedingOcr.length) return pages.map(({ text }) => text).join('\n')
  if (pagesNeedingOcr.length > 5) throw new Error('Scanned PDFs can have up to 5 pages for OCR. Please use a smaller file or a text-based PDF.')

  onProgress?.({ status: 'This PDF is scanned. Preparing OCR for image pages…', progress: 0 })
  const worker = await createOcrWorker(onProgress)
  try {
    let recognizedPage = 0
    for (const entry of pages) {
      if (entry.text.length >= 24) continue
      recognizedPage += 1
      onProgress?.({ status: `Recognizing scanned PDF page ${recognizedPage} of ${pagesNeedingOcr.length}`, progress: recognizedPage / pagesNeedingOcr.length })
      entry.text = (await worker.recognize(await renderPdfPage(entry.page))).data.text
    }
  } finally {
    await worker.terminate()
  }

  return pages.map(({ text }) => text).join('\n')
}

export const extractResumeText = async (file, onProgress) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (file.size > 12 * 1024 * 1024) throw new Error('Choose a resume smaller than 12 MB.')

  if (extension === 'txt') return file.text()

  if (extension === 'docx') {
    const mammoth = await import('mammoth/mammoth.browser')
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
    return result.value
  }

  if (extension === 'pdf') return extractPdfText(file, onProgress)

  if (['jpg', 'jpeg', 'png', 'webp', 'bmp', 'tif', 'tiff'].includes(extension)) {
    return recognizeImage(file, onProgress)
  }

  throw new Error('Choose a PDF, DOCX, TXT, JPG, PNG, WebP, BMP, or TIFF resume file.')
}