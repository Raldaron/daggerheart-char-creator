# Agents.md
> Operating Manual for AI Agents working on the **Daggerheart Digital Character Creator**

---

## 1  Mission

Generate clean, idiomatic **TypeScript + React 18** code that turns the official Daggerheart SRD and the accompanying JSON data sets into a fully functional, browser-based character–creation wizard.

---

## 2  Tech Stack Rules

| Layer            | Decision | Notes |
|------------------|----------|-------|
| Runtime          | React 18 | No class components; use Hooks. |
| Routing          | React-Router v6 | File-based routing not in scope. |
| State            | **CharacterContext** & **PartyContext** (custom, already bootstrapped) | Expose `useCharacter()` and `useParty()`. |
| Styling          | Plain CSS / CSS Modules | Keep it minimal, accessible, and framework-free. |
| Build            | Vite (TypeScript template) | `src/` is the project root. |
| Path Aliases     | `@/data/*`, `@/components/*`, etc. | Configured in `tsconfig.json` & `vite.config.ts`. |
| Testing          | Vitest + React Testing Library | Only if explicitly asked. |

**Never** introduce: class-based React, jQuery, heavy UI kits, or runtime data hard-coded in JSX.

---

## 3  Authoritative Data

All game-specific values live in JSON under `src/data/` and *must* be imported, not duplicated:

| File                      | Sample shape |
|---------------------------|--------------|
| `ancestries.json`         | `{ id, name, topFeature, bottomFeature, ... }[]` |
| `armor.json`              | `{ id, tier, name, evasion, physDT, magDT, armorScore }[]` |
| `weapons.json`            | `{ id, tier, name, hands, primary, damageDie, tags }[]` |
| `equipment.json`          | `{ weapons:[], armor:[], startingKit:[] }` |
| `classes.json`            | `{ id, name, domains: ["Blade","Valor"], classItems:[...] }[]` |
| `subclasses.json`         | `{ id, classId, spellcastTrait, ... }[]` |
| `communities.json`        | `{ id, name, feature }[]` |
| `domains.json`            | `{ id, name, blurb }[]` |
| `domainCards.json`        | `{ id, domainId, level, name, description, cost }[]` |
| `gear.json`               | Starter & misc gear |
| `experienceBlacklist.json`| `["Lucky","Strong","Smart","Good"]` |

Agents must **never** invent IDs or text that could be fetched from these files.

---

## 4  Folder / File Conventions

```
src/
 ├─ data/                ← JSON above
 ├─ steps/               ← one file per wizard step
 │   ├─ EquipmentStep.tsx
 │   ├─ BackgroundStep.tsx
 │   ├─ ExperiencesStep.tsx
 │   ├─ DomainsStep.tsx
 │   └─ ConnectionsStep.tsx
 ├─ context/
 │   ├─ CharacterContext.tsx   (provides useCharacter)
 │   └─ PartyContext.tsx       (provides useParty)
 └─ App.tsx / main.tsx         (router, layout shell)
```

Each `*Step.tsx` should default-export a **functional** component named after the file.

---

## 5  Shared Coding Guidelines

1. **Type-safety first** – declare interfaces/types for every shape you touch.
2. **Pure data → UI** – derive all options from JSON at runtime.
3. **Side-effects**  
   * Read from context on mount.  
   * Push updates via the context’s `updateSheet` or `updateCharacter` helper.  
4. **Navigation** – Use `useNavigate()`; wizard order is linear.  
5. **Validation** – Disable the **Next** button until required choices are made.  
6. **Accessibility** – Label every control (`<label htmlFor>`), use semantic elements, keep color contrast legible.  
7. **Styling** – Flexbox or CSS Grid; never inline large style blobs.

---

## 6  Step Specifications

Below are the functional specs that every Step component must satisfy.

| # | Component            | Key Responsibilities |
|---|----------------------|----------------------|
| 5 | `EquipmentStep`      | - Load tier-1 weapons & armor from JSON.<br>- Allow one primary (radio) & if one-handed then a secondary dropdown.<br>- Allow one armor set.<br>- Compute `damageRoll` (`1${die}+level`) & `armorScore`.<br>- Auto-append `equipment.json.startingKit` to inventory once. |
| 6 | `BackgroundStep`     | - Generate three flavour questions using the selected class’s `name` & `classItems` from `classes.json`.<br>- Persist answers + free-form notes under `sheet.background`. |
| 7 | `ExperiencesStep`    | - Exactly two `<input>` fields.<br>- Validate: non-empty, ≤30 chars, distinct, not in `experienceBlacklist.json`.<br>- Persist as `sheet.experiences`. |
| 8 | `DomainsStep`        | - List **level-1** cards where `domainId` ∈ the current class’s `domains`.<br>- Let the user pick exactly two; if a third is chosen, drop the oldest.<br>- Persist array of card IDs. |
| 9 | `ConnectionsStep`    | - For every *other* character in `useParty().party`, show a textarea to capture a connection.<br>- Must record at least one non-empty link.<br>- Store in `sheet.connections` keyed by `targetId`. |

---

## 7  Prompt Template for New Code

When an agent needs to generate a new file, follow this skeleton:

```
/***  Codex prompt: create src/<path>/<FileName>.tsx  ***

Goal: <single sentence>

Data Sources
  import <symbols> from '@/data/<file>.json';

Requirements
1. ...
2. ...
(ordered, testable bullet list)

Styling: <brief note>

Export default <ComponentName>.

***/
```

*Keep the bullet list exhaustive but no longer than 15 items.*

---

## 8  Testing Checklist

After generation, each new component must:

- ✅ Type-check with `pnpm run typecheck` (or `npm/yarn` equivalent).  
- ✅ Pass ESLint (`pnpm run lint`).  
- ✅ Integrate into the router and render without runtime errors.  
- ✅ Persist and recall data seamlessly via `CharacterContext`.  

Agents may emit Vitest specs if requested; otherwise unit tests are optional.

---

## 9  Extensibility Notes

- Future steps (e.g., Spell selection, Sheet export) should follow the same JSON-first and context-driven approach.
- To add tiers 2-5 items, extend the JSON and reuse existing components with minimal tweaks.
- Keep UI library-agnostic so a design system can be layered on later.

---

**Remember:** *Do not hard-code domain rules, equipment tables, or numbers from the SRD.*  
Always fetch from the JSON single-source-of-truth so designers can update the game without touching code.
