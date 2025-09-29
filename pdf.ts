// Save the presentation as a PDF. Based on https://revealjs.com/pdf-export/
import puppeteer from 'puppeteer'

// Sandboxing is not supported on GitHub Actions runners for Ubuntu.
const args = process.env.CI ? ['--no-sandbox'] : undefined
const browser = await puppeteer.launch({args})
const page = await browser.newPage()
const url = import.meta.resolve('./index.html')
await page.goto(`${url}?print-pdf`, {waitUntil: 'networkidle0'})
await page.pdf({path: 'index.pdf', printBackground: true, preferCSSPageSize: true, waitForFonts: true})
await browser.close()
