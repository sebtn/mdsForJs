// bad
_ src
├── actions
|   └── index.js
├── components
|   └── apple.js
|   └── microsoft.js
├── containers
|   └── apple.js
|   └── microsoft.js
├── reducers
|   └── apple.js
|   └── microsoft.js
├── sagas
|   └── apple.js
|   └── microsoft.js
└── index.html

// good
_ src
├── apple
|   └── apple.action.js
|   └── apple.component.js
|   └── apple.container.js
|   └── apple.saga.js
|   └── apple.gtm.js
├── microsoft
|   └── microsoft.action.js
|   └── microsoft.component.js
|   └── microsoft.container.js
|   └── microsoft.saga.js
|   └── microsoft.gtm.js
└── index.html
