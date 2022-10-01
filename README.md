# Pinta Export

Exports ipfs images from Pinata account to a local directory.

## Setup

Ensure your system has node installed, and then run `npm install` from the root of the project. Next run `npm link`.

Copy `.env.dist` to a file named `.env` in the root of the project. Provide values for variables specified.

## Usage

To download all files from the specified Pinata account to a local directory ...

`pinata-export [local download directory]`

If the directory does not exist, it will be created.
