#!/usr/bin/env node
/**
 * Main Installer for GoPablo
 * Check the node version if above 8 then run the app.
 *
 * Credits:
 * Ahmad Awais - https://twitter.com/MrAhmadAwais/
 * Luan Gjokaj - https://twitter.com/luangjokaj/
 */

'use strict';

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

const prompts = require('prompts');
const chalk = require('chalk');

const program = require('commander');
const version = require('../package.json').version;

program
	.version(version)
	.option('-v, --version', 'version')
	.parse(process.argv);

(async () => {
	const response = await prompts({
		type: 'confirm',
		name: 'value',
		message: `Do you want to install ${chalk.white.bgGreen(
			'🐺 GoPablo',
		)} in the current directory?\n${chalk.red(process.cwd())}`,
	});

	if (response.value) {
		// If below Node 8.
		if (8 > major) {
			console.error(
				chalk.red(
					'You are running Node ' +
						currentNodeVersion +
						'.\n' +
						'Install GoPablo requires Node 8 or higher. \n' +
						'Kindly, update your version of Node.',
				),
			);
			process.exit(1);
		}

		// Makes the script crash on unhandled rejections instead of silently
		// ignoring them. In the future, promise rejections that are not handled will
		// terminate the Node.js process with a non-zero exit code.
		process.on('unhandledRejection', err => {
			throw err;
		});

		/**
		 * Run the entire program.
		 *
		 * Runs all the functions with async/await.
		 */
		const run = require('./modules/run');
		run();
	}
})();
