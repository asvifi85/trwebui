# webui-component-webui-sse

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| webui-component-webui-sse |  | 0.1.0 |


## Overview


## Install
As this package is not available in Bower, it must be installed via GitHub

`bower install git@github.com:ThomsonReuters-IPS/webui-component-webui-sse.git --save`

### Vagrant

[Vagrant][] is a tool for building complete development environments, very easy to use and provides a consistent local
development environment for all users, regardless of host OS.

Using Vagrant is optional but recommended:

- Vagrant lowers development environment setup time
- it increases development/production parity
- it makes the "works on my machine" excuse a relic of the past

[Vagrant]: https://www.vagrantup.com/

## Usage
Usage details should go here.

## Development
- `gulp` - To display a list of available tasks (alias for `gulp help`)

### SSH Access
To properly contribute to this project, it's suggested that you [generate an SSH key][] and [add it to your GitHub account][]. This will simplify the authentication between your local machine and GitHub. 

NOTE: We recommend that when generating the SSH key that you _**do not**_ create a passphrase, as this causes authentication complications when attempting to connect to GitHub. 

[generate an SSH key]: https://help.github.com/articles/generating-an-ssh-key/
[add it to your GitHub account]: https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/

### Line Endings
Because of how line endings are handled across different OS platforms and how this may impact linting and style guide
checks, LF (line feed) will be enforced explicitly across the project.  This is set at the root of the repo using
`.gitattributes`

Additionally for Windows users, it is recommended you install [msysgit][] and use Git Bash only, and for configuring
line ending conversions, select _"Checkout as-is, commit as Unix style line endings"_.

You may need to refresh the repository for these settings to take effect.  For more information, please review this [guide][].

[guide]: https://help.github.com/articles/dealing-with-line-endings/#platform-all
[msysgit]: ﻿https://msysgit.github.io/
