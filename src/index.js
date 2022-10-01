#! /usr/bin/env node

import path from 'path';
import { program } from 'commander';
import pinata from './pinata-api.js';
import ora from 'ora';
import Downloader from 'nodejs-file-downloader';
import { IPFS_GATEWAY } from './config.js';

program
  .name('pinata-export')
  .description('Export IPFS files from pinata account')
  .argument('<output-folder>', 'The folder to export the IPFS images to')
  .action(exportFiles)
  .parse();

async function exportFiles(outputFolder) {
  const progress = ora();

  try {
    const dirPath = path.resolve(process.cwd(), outputFolder);
    progress.start('Searching for Pinata files');

    let files = [];
    let response;
    let pageOffset = 0;
    const pageLimit = 100;
    do {
      response = await pinata.pinList({
        status: 'all',
        pageLimit,
        pageOffset,
      });

      files = [...files, ...response.rows];
      pageOffset += pageLimit;
    } while (response.rows.length != 0);

    progress.succeed(`Found ${files.length} files in Pinata account`);

    for (let i = 0; i < files.length; i++) {
      const data = files[i];
      const filePath = path.resolve(dirPath, data.metadata.name);

      progress.start(
        `Downloading (${i + 1} of ${files.length}): ${data.metadata.name}`
      );

      const downloader = new Downloader({
        url: IPFS_GATEWAY + '/' + data.ipfs_pin_hash,
        directory: dirPath,
        fileName: data.metadata.name,
        maxAttempts: 3,
      });

      await downloader.download();

      progress.succeed();
    }

    console.log(`${files.length} files downloaded`);
  } catch (err) {
    progress.stop();
    console.log(err);
  }
}
