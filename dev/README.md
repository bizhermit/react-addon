# Developer usage

A development environment for web & desktop application. Powered by [Next.js](https://nextjs.org/), [Express](https://expressjs.com/), [Electron](https://www.electronjs.org/) and others.  

The `./src/pages` directory is mapped **Page** URL.  
The `./src/pages/api` directory is mapped **API** URL.  

lean more: [Next.js](https://nextjs.org/)  

---

## Next.js Server

### Commands

#### dev

```bash
npm run dev
```

#### prod

##### build

```bash
npm run build
```

##### build & start

```bash
npm run next
```

#### export static

```bash
npm run export
```
---

## Web Server

### Commands

#### dev

```bash
npm run nexpress
```

#### prod

```bash
npm run start
```
---

## Desktop Application

### Commands

#### dev

```bash
npm run nextron
```

#### build executable file

```bash
npm run pack
```

#### build installer

```bash
# for current work OS
npm run dist

# for Linux
npm run dist:linux

# for Windows
npm run dist:win

# for Mac
npm run dist:mac
```
