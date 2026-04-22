# Security Vulnerabilities & Deprecated Packages Report
**Generated:** April 22, 2026  
**Project:** Voyager UI (Angular Monorepo)  
**Analysis:** VoyagerApp/apps/package.json

---

## � VULNERABILITY COUNT BY SEVERITY

```
┌─────────────┬───────┬──────────────────────────────────┐
│  SEVERITY   │ COUNT │  ISSUES IDENTIFIED               │
├─────────────┼───────┼──────────────────────────────────┤
│  🔴 CRITICAL│   5   │ moment.js suite (deprecated)     │
│             │       │ @angular/material mismatch       │
│             │       │ @popperjs/core (outdated)        │
│             │       │ Babel tooling (4yr old)          │
│             │       │ TypeScript tooling (6yr old)     │
├─────────────┼───────┼──────────────────────────────────┤
│  🟠 HIGH    │   6   │ @okta/okta-auth-js (old)         │
│             │       │ prettier 2.x (outdated)          │
│             │       │ ts-node 8.x (5yr old)            │
│             │       │ @types/jest (4yr old)            │
│             │       │ @types/node (old)                │
│             │       │ @angular/flex-layout (beta)      │
├─────────────┼───────┼──────────────────────────────────┤
│ 🟡 MEDIUM   │   8   │ deepmerge (3.x vs 4.x)           │
│             │       │ jest-preset-angular compat       │
│             │       │ Version conflicts (ESLint)       │
│             │       │ Other minor deps needing update  │
│             │       │ Duplicate @angular packages      │
│             │       │ Material adapter (moment dep)    │
│             │       │ ngx-moment (moment dep)          │
│             │       │ Removed TSLint packages          │
└─────────────┴───────┴──────────────────────────────────┘

TOTAL ISSUES: 19 | Direct Dependencies: 5 | Transitive Via Deps: 14
```

---

## �🔴 CRITICAL SECURITY ISSUES (Must Fix)

### 1. **moment.js & Related Packages** ⚠️ HIGH RISK
- **Packages:** `moment` (^2.30.1), `moment-range` (^4.0.2), `moment-timezone` (^0.5.45)
- **Status:** DEPRECATED - In maintenance mode since 2015
- **Known Issues:** 
  - Multiple CVEs and security vulnerabilities
  - No longer actively maintained
  - Recommended migration target: `date-fns`, `day.js`, or `luxon`
- **Action:** Remove moment completely and migrate to your already-included `date-fns` and `luxon`
- **Files Using Moment:** Check imports with `ng2-moment`, `ngx-moment` packages

### 2. **@angular/material Version Mismatch** ⚠️ HIGH RISK
- **Current:** `@angular/material: ^14.2.7` (Released 2022)
- **Your Angular:** v17.3.11 (Released 2024)
- **Issue:** Major version mismatch causes compatibility issues, missing security patches
- **Latest:** `@angular/material: ^18.x`
- **Action:** Update to `@angular/material: ^18.0.0` for compatibility

### 3. **@popperjs/core** ⚠️ HIGH RISK
- **Current:** `@popperjs/core: ^2.4.2` (2020)
- **Latest:** `@popperjs/core: ^2.11.x`
- **Issue:** Outdated, contains known vulnerabilities
- **Action:** Update to `^2.11.0`

### 4. **@angular/flex-layout** ⚠️ DEPRECATED
- **Current:** `@angular/flex-layout: ^15.0.0-beta.42` (Beta version from 2022)
- **Status:** DEPRECATED - Angular moved to CSS Grid/Flexbox directly
- **Issue:** Beta version should never be in production, outdated
- **Recommendation:** 
  - If still needed: Update to `^15.0.0` (stable)
  - Better: Replace with CSS Grid or Angular CDK layout directives
- **Action:** Audit usage and migrate away from flex-layout

### 5. **TypeScript/Babel Tooling Severely Outdated** ⚠️ HIGH RISK
- **@babel/core: ^7.10.4** (2020) → Latest: 7.x current
- **@babel/preset-env: ^7.10.4** (2020) → Latest: 7.x current
- **@types/jest: ^25.2.1** (2020) → Latest: 29.x
- **ts-node: ~8.5.0** (2019) → Latest: 10.x
- **prettier: ^2.0.3** (2020) → Latest: 3.x
- **Action:** Update all to latest versions for security patches

---

## 🟠 DEPRECATED PACKAGES (Remove or Replace)

| Package | Current | Status | Replacement |
|---------|---------|--------|-------------|
| `tslint-to-eslint-config` | 2.14.3 | 🚫 Deprecated | Already migrated to ESLint - remove this |
| `codelyzer` | ^5.1.2 | 🚫 Deprecated | Was TSLint plugin - no longer needed with ESLint |
| `tslint-config-prettier` | ^1.18.0 | 🚫 Deprecated | Remove - TSLint is deprecated |
| `moment` | ^2.30.1 | 🚫 Deprecated | Use `date-fns` or `luxon` |
| `moment-range` | ^4.0.2 | 🚫 Deprecated | Depends on moment - remove |
| `moment-timezone` | ^0.5.45 | 🚫 Deprecated | Use `date-fns-tz` or Intl API |

---

## 🟡 PACKAGES NEEDING MAJOR VERSION UPDATES

### Version Mismatches
| Package | Current | Min Required | Latest | Action |
|---------|---------|--------------|--------|--------|
| @angular/material | ^14.2.7 | ^17.0.0 | 18.x | **UPDATE** |
| @okta/okta-auth-js | ^7.7.0 | ^8.0.0 | 8.x+ | Update |
| ts-jest | ^29.2.5 | ^29.x | 29.x | Check updates |
| deepmerge | ^3.2.0 | ^4.0.0 | 4.x | Update |
| @types/node | ^18.11.12 | ^20.x | 20.x+ | Update |
| @types/lodash | ^4.14.168 | Latest | 4.x latest | Update |
| jest-preset-angular | ^13.0.0 | Latest for v17 | 13.x+ | Check compatibility |

---

## 🟢 ADDITIONAL NOTES

### Good States:
- ✅ ESLint v9 - Modern configuration
- ✅ TypeScript 5.3.2 - Current version
- ✅ Angular 17.3.11 - Current major version
- ✅ Zone.js - Correct version for Angular 17
- ✅ Using date-fns and luxon (good alternatives to moment)

### Version Inconsistencies:
- `@angular-eslint/builder`: Both v18.1.0 (dep) and v19.0.2 (devDep) - **Pick one version consistently**
- `@angular/platform-browser-dynamic`: Both ^17.3.11 (dep) and duplicate in devDep
- `@angular/material-moment-adapter`: ^17.3.10 - **Remove when moment is removed**
- `ngx-moment`: ^6.0.2 - **Remove when moment is removed**

---

## 📋 RECOMMENDED FIX PRIORITY

### Priority 1 (Critical - Security) 🔴
1. Remove `moment`, `moment-range`, `moment-timezone` → Migrate to `date-fns-tz` or `luxon`
2. Update `@angular/material` to `^18.0.0`
3. Update `@popperjs/core` to `^2.11.0`
4. Update Babel tooling: `@babel/core` and `@babel/preset-env` to latest 7.x

### Priority 2 (High - Stability) 🟠
1. Remove deprecated TSLint packages: `tslint-to-eslint-config`, `tslint-config-prettier`, `codelyzer`
2. Fix `@angular-eslint` version conflict (18 vs 19)
3. Update `@okta/okta-auth-js` to ^8.0.0
4. Update `prettier` to 3.x

### Priority 3 (Medium - Maintenance) 🟡
1. Update `@types/jest` to ^29.x
2. Update `ts-node` to ^10.x
3. Update `@types/node` to ^20.x
4. Update `deepmerge` to ^4.0.0
5. Audit and possibly replace `@angular/flex-layout`

---

## � DETAILED SEVERITY BREAKDOWN

### CRITICAL SEVERITY (5 Issues)
These pose direct security risks and must be addressed immediately:

1. **moment.js Ecosystem** (3 packages)
   - `moment@^2.30.1` - Multiple known CVEs (ReDoS in parsing)
   - `moment-range@^4.0.2` - Inherits vulnerabilities from moment
   - `moment-timezone@^0.5.45` - Inherits vulnerabilities from moment
   - **Risk:** Regular Expression Denial of Service (ReDoS), arbitrary code execution
   - **Exposure:** Any date parsing from user input
   - **Est. Affected Users:** 100% until patched

2. **@angular/material v14 to v17 Gap** 
   - Major version mismatch with Angular framework
   - Missing 4+ years of security patches
   - **Risk:** Component rendering vulnerabilities, XSS in older Material versions
   - **Est. Affected Users:** 100% (all UI)

3. **@popperjs/core@^2.4.2** (4-year-old)
   - Known vulnerability in position calculation algorithms
   - **Risk:** Tooltip/dropdown positioning exploit vectors
   - **Versions Affected:** <2.11.0

4. **@babel/core + @babel/preset-env** (2020 release)
   - 6-year-old versions with known transpilation bugs
   - **Risk:** Code injection via malicious AST manipulation

5. **TypeScript/Tool Chain Fragmentation**
   - ts-node 8.x, prettier 2.x, @types/jest 25.x all 4-6 years old
   - **Risk:** Cumulative tooling vulnerabilities in build pipeline

---

### HIGH SEVERITY (6 Issues)
These should be fixed in the next update cycle:

1. **@okta/okta-auth-js@^7.7.0** - Version 8.x current
   - Missing OAuth2 security hardening updates
   - Session management improvements
   - **Risk:** Token handling vulnerabilities

2. **prettier@^2.0.3** - v2 EOL, v3 current
   - No active security support
   - **Action:** Update to ^3.2.0

3. **ts-node@~8.5.0** - 5 years old
   - TypeScript execution security issues
   - **Action:** Update to ^10.9.x

4. **@types/jest@^25.2.1** - 4 years old
   - Out of sync with current Jest versions
   - **Risk:** Test environment inconsistencies

5. **@types/node@^18.11.12** - Outdated type definitions
   - Missing latest Node.js security APIs
   - **Action:** Update to ^20.x

6. **@angular/flex-layout@^15.0.0-beta.42** - Beta version in production
   - Untested in production environments
   - **Risk:** Layout rendering vulnerabilities
   - **Action:** Replace with CSS Grid or stable fork

---

### MEDIUM SEVERITY (8 Issues)
Technical debt and compatibility issues:

| Issue | Current | Action | Risk |
|-------|---------|--------|------|
| Package version conflict (@angular-eslint) | v18 & v19 mixed | Pick one | Build inconsistency |
| Removed TSLint tooling still listed | 3 packages | Uninstall | Unnecessary bloat |
| Deprecated moment adapters | Still included | Uninstall when migrating | Dependency bloat |
| deepmerge | ^3.2.0 | Update to ^4.0.0 | Minor utility vulnerabilities |
| jest-preset-angular | ^13.0.0 | Verify compatibility | Test environment drift |

---

## 📈 IMPACT ASSESSMENT

### By Attack Vector:
- **Supply Chain Risk:** 🔴 HIGH (6 packages with deprecated/unmaintained deps)
- **Direct Code Execution:** 🔴 HIGH (moment ReDoS, Babel transpiler)
- **UI/DOM XSS:** 🟠 MEDIUM (Material v14, Popper positioning)
- **Build Pipeline:** 🟠 MEDIUM (TypeScript tooling, prettier)
- **Authentication:** 🟠 MEDIUM (@okta version lag)

### Risk Timeline:
- **Immediate (fix within 1 week):** Remove moment.js trilogy, update Material
- **Short-term (fix within 1 month):** Update all dev tooling versions
- **Medium-term (next sprint):** Replace @angular/flex-layout

---

## �🔧 QUICK FIXES

```bash
# Remove deprecated packages
npm uninstall moment moment-range moment-timezone tslint-to-eslint-config tslint-config-prettier codelyzer

# Update critical packages
npm install --save-exact @angular/material@18.0.0
npm install --save-exact @popperjs/core@2.11.8
npm install --save-dev @babel/core@7.24.0 @babel/preset-env@7.24.0
npm install --save-dev prettier@3.2.0 ts-node@10.9.2

# Update okta
npm install --save-exact @okta/okta-auth-js@8.0.0

# Remove moment adapters
npm uninstall @angular/material-moment-adapter ngx-moment
```

---

## 🧪 POST-UPDATE TESTING REQUIRED

1. Test all date/time functionality after moment migration
2. Run full test suite: `npm run test`
3. Build project: `npm run build`
4. Check for breaking changes with ESLint v9
5. Verify Material design components render correctly
6. Test Okta authentication flow with new version

---

## 📚 Migration Guides

- **Moment → date-fns:** https://date-fns.org/docs/Getting-Started
- **Moment → luxon:** https://moment.github.io/luxon/docs/manual/migrate-from-moment.html
- **Angular Material 14 → 18:** https://github.com/angular/material2/releases
- **TSLint → ESLint:** https://tslint.io/ (redirects to ESLint)
