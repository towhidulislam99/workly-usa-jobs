# Workly SEO, Google PageSpeed & Mobile Usability Report

**Audit date:** October 2, 2026  
**Audience focus:** United States job seekers and employers  
**Audited preview:** https://8328-imqkntv1ahfb7k61bdig1-d3466311.us1.manus.computer/  
**Report scope:** Performance, Core Web Vitals, mobile usability, responsive rendering, crawlability, route metadata, Open Graph, Twitter Cards, and structured data.

> The Lighthouse results below use the built production bundle on a local production preview. The live preview was separately checked for route behavior, metadata, and responsive rendering. Google PageSpeed Insights can produce different scores because its test location, throttling profile, cache state, and third-party network conditions vary.

## Executive summary

Workly is in a strong launch-ready state for the current preview:

| Area | Result | Interpretation |
|---|---:|---|
| Lighthouse Performance | **99/100** | Excellent production-bundle performance |
| Lighthouse SEO | **100/100** | Core discoverability checks pass |
| Lighthouse Accessibility | **95/100** | Strong; contrast remediation is the main remaining opportunity |
| Lighthouse Best Practices | **93/100** | Strong; console errors and font-size audit need follow-up |
| Mobile route audit | **12/12 pass** | No horizontal overflow; metadata and structured data checks pass |
| Sitemap / robots | **HTTP 200** | Valid and reachable for browser and Googlebot user agents |
| Social cards | **12/12 pass** | Open Graph and Twitter Card fields present across audited routes |

## Production Lighthouse results

The production bundle was audited with Lighthouse using Performance, Accessibility, Best Practices, and SEO categories.

### Core Web Vitals and loading metrics

| Metric | Measured result | Assessment |
|---|---:|---|
| First Contentful Paint (FCP) | **1.7 s** | Good; below the 1.8 s “good” threshold |
| Largest Contentful Paint (LCP) | **1.7 s** | Good; below the recommended threshold |
| Speed Index | **1.7 s** | Fast visual completion |
| Total Blocking Time (TBT) | **40 ms** | Excellent; well below 200 ms |
| Cumulative Layout Shift (CLS) | **0.0001** | Excellent visual stability |
| Time to Interactive | **1.9 s** | Fast interaction readiness |
| Max Potential FID | **80 ms** | Good responsiveness signal |
| Root document response | **~4 ms local production preview** | Server response is not a bottleneck in the production preview |

### Category scores

- **Performance:** 99
- **SEO:** 100
- **Accessibility:** 95
- **Best Practices:** 93

## Bundle and payload profile

| Asset | Size |
|---|---:|
| Production HTML | 4.5 KB |
| Production JavaScript | 277.8 KB |
| Production CSS | 39.2 KB |
| Sitemap | 1.7 KB |
| Robots file | 168 B |

The production bundle is materially smaller and faster than the Vite development preview. A separate development-mode Lighthouse run produced misleadingly slow results because it included Vite HMR, React development modules, and development runtime assets. The **99/100 production score** is the relevant build-quality measurement.

## Mobile usability audit

### Viewports checked

- **Mobile:** 375 × 812
- **Tablet:** 768 × 1024
- **Desktop:** 1280 × 720

### Routes visually checked on mobile

- `/`
- `/jobs`
- `/jobs/partner/partner-14`
- `/create-profile`
- `/signin`

### Mobile findings

- No horizontal overflow detected in the live browser route audit.
- Homepage search fields stack vertically and remain within the viewport.
- Browse All filters collapse into a mobile filter control; job cards remain readable and tappable.
- Partner detail hero, salary summary, apply CTA, and content sections stack into a single-column layout.
- Create Profile and Sign In forms fit within a 375 px viewport with full-width inputs and buttons.
- Mobile navigation exposes a functional hamburger menu with accessible expanded state.
- CTA controls and form fields have usable touch sizing.
- The supplied profile portrait remains correctly styled on larger layouts; the decorative auth aside is intentionally hidden on narrow mobile screens to keep the form focused and usable.

## Live route and SEO metadata audit

A live browser script checked **12 routes**: the homepage, Browse All, eight partner detail pages, Create Profile, and Sign In.

### Route-level checks

Every checked route passed:

- Title present and within the 30–60 character SEO-panel range.
- Meta description present and within the 50–160 character range.
- Canonical URL matches the route.
- Open Graph title, description, URL, and image present.
- Twitter Card, title, description, and image present.
- Organization, WebSite, and WebPage JSON-LD retained after client-side route updates.
- No horizontal overflow in the live DOM audit.

Authentication routes correctly use `noindex, follow`:

- `/create-profile`
- `/signin`

Public job routes use `index, follow` and route-specific metadata.

## Open Graph and Twitter Card coverage

The live preview contains the following social-sharing fields across all audited routes:

- `og:type`
- `og:site_name`
- `og:locale` set to `en_US`
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:alt`
- `twitter:card` set to `summary_large_image`
- `twitter:title`
- `twitter:description`
- `twitter:image`

The social image uses the professional Workly job-search banner and is served from a public HTTPS URL.

## Sitemap and robots verification

### `robots.txt`

- Browser request: **HTTP 200**
- Googlebot request: **HTTP 200**
- Allows public routes.
- Disallows `/signin`, `/create-profile`, and `/api/`.
- References the XML sitemap.

### `sitemap.xml`

- Browser request: **HTTP 200**
- Googlebot request: **HTTP 200**
- XML parsed successfully.
- Contains **10 public URLs**: homepage, Browse All, and eight public partner detail pages.
- Every sitemap URL returned **HTTP 200** to a Googlebot user agent.

## Structured data status

Eligible partner employment pages include Google Jobs-compatible `JobPosting` JSON-LD with:

- Job title
- Description, responsibilities, and qualifications
- Date posted
- Employment type
- Hiring organization
- US job location
- Salary range where supplied
- Stable job identifier
- Canonical job URL
- `directApply: false` because application proceeds through the external partner destination
- BreadcrumbList markup

The Product Testers / AirPods offer is intentionally not marked as `JobPosting` because it is a product-reward offer rather than a conventional employment listing.

## Remaining Lighthouse opportunities

### 1. Accessibility contrast

Lighthouse identified a color-contrast audit issue. Recommended follow-up:

- Check muted gray text on cream and white backgrounds.
- Increase contrast for small uppercase labels and low-emphasis metadata.
- Re-run Lighthouse Accessibility after adjusting the affected tokens.

### 2. Best-practice console errors

The production audit reported browser console errors. Recommended follow-up:

- Inspect the browser console on the deployed/published origin.
- Separate platform preview warnings from application errors.
- Resolve any application-originated errors before publishing.

### 3. Font-size audit

Lighthouse reported a legible-text audit warning for a portion of the page. Recommended follow-up:

- Review 9–11 px uppercase labels and footer metadata.
- Keep supporting text readable without zoom, especially on mobile.
- Preserve visual hierarchy while increasing the smallest text where practical.

### 4. Preview-versus-production validation

The preview URL is a Manus preview origin. Before public launch:

- Run PageSpeed Insights against the final custom domain.
- Replace preview-origin canonical, Open Graph, Twitter, and sitemap URLs with the final domain.
- Submit the final sitemap in Google Search Console.
- Re-test external CPA redirects and social previews from the final origin.

## Recommended launch checklist

1. Publish the final build on the intended USA-facing domain.
2. Update `SEO_ORIGIN`, canonical URLs, social URLs, sitemap URLs, and `robots.txt`.
3. Run PageSpeed Insights on `/`, `/jobs`, and representative partner detail pages.
4. Validate JobPosting markup with Google’s Rich Results Test.
5. Submit the sitemap in Google Search Console.
6. Resolve the contrast and console-error findings.
7. Monitor Search Console indexing, Core Web Vitals, and crawl errors after launch.

## Conclusion

Workly’s production build is fast and stable, with a **99 Performance score**, **100 SEO score**, strong Core Web Vitals, complete USA-focused metadata, social sharing tags, crawlable public routes, and responsive mobile layouts. The remaining work is primarily launch-domain configuration and polish for accessibility contrast, console cleanliness, and small-text readability.
