# Md Footer CLI

[![CI][1]][2]
[![License: MIT][3]][4]

Generate markdown footer links.
This library is rewritten [md-footer][5] by typescript.

# Install

```sh
$ npm i md-footer-cli
```

# Usage

```sh
$ md-footer-cli --help

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  index.js input.md            generate footer links in input.md
  index.js input.md output.md  generate footer links of input.md to output.md

Copyright 2022 Riku Kanayama (k_kuroguro) All Rights Reserved.
```

Input
```markdown
[Link1](http://www.example.com/link1)
[Link2](http://www.example.com/link2)
[Link1-2](http://www.example.com/link1)
```

Output
```markdown
[Link1][1]
[Link2][2]
[Link1-2][1]


[1]:http://www.example.com/link1
[2]:http://www.example.com/link2
```

# Related

 - [md-footer][6] - API for this library.


[1]:https://github.com/k-kuroguro/md-footer-cli/actions/workflows/main.yaml/badge.svg
[2]:https://github.com/k-kuroguro/md-footer-cli/actions/workflows/main.yaml
[3]:https://img.shields.io/badge/License-MIT-yellow.svg
[4]:https://opensource.org/licenses/MIT
[5]:https://github.com/sayanarijit/md-footer
[6]:https://www.npmjs.com/package/md-footer
