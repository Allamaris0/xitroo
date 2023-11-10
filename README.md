# xitroo
JS wrapper for Xitroo API. Inspirated by a python library xitroo-api


## Installation

```
npm install xitroo
```

## Usage

**getBodyHtmlStrict()**
**getBodyHtml()**
**getBodyHtmlStrict**
**getBodyText**
**getSubject**

of the lastest email

Parameters of Xitroo class constructor:
xitrooEmail->string, refreshCounter->number (default 5s), refreshWait(default 5s)->number, httpTimeout(default 15s)->number


## Simple example

```
const Xitroo = require('xitroo');

async function main() {
    const xitrooInstance = new Xitroo('anything@xitroo.com');
    const subject = await xitrooInstance.getSubject();
    console.log(subject);
}

main();
```
